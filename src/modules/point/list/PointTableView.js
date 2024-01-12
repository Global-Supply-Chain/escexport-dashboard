

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { auditColumns, paginateOptions } from '../../../constants/config';
import { PaginatorRight } from '../../../shares/PaginatorRight';
import { Column } from 'primereact/column';
import { paths } from '../../../constants/paths';
import { datetime } from '../../../helpers/datetime';
import { Search } from '../../../shares/Search';
import { Calendar } from 'primereact/calendar';
import { pointPayload } from '../pointPayload';
import { pointService } from '../pointSerivce';
import { Dropdown } from 'primereact/dropdown';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { setPaginate } from '../pointSlice';
import { setDateFilter } from '../../../shares/shareSlice';
import moment from 'moment';
import { FilterByDate } from '../../../shares/FilterByDate';
import { Card } from 'primereact/card';
import { NavigateId } from '../../../shares/NavigateId';

const PointTableView = () => {

    const dispatch = useDispatch();
    const { points, paginateParams } = useSelector(state => state.point);
    const { translate } = useSelector(state => state.setting);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(pointPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));

    const dropdown = [
        {
            label: "Item",
            value: "T0001"
        },
        {
            label: "Item",
            value: "T0001"
        },
        {
            label: "Item",
            value: "T0001"
        }
    ];

    /**
     * Event - Paginate Page Change
     * @param {*} event 
     */
    const onPageChange = (event) => {
        first.current = event.page * paginateParams.per_page;
        dispatch(
            setPaginate({
                ...paginateParams,
                page: event?.page + 1,
                per_page: event?.rows,
            })
        );
    };

    /**
     * Event - Search
     * @param {*} event 
     */
    const onSearchChange = (event) => {
        dispatch(
            setPaginate({
                ...paginateParams,
                search: event,
            })
        );
    };

    /**
     * Event - Column sorting "DESC | ASC"
     * @param {*} event 
     */
    const onSort = (event) => {
        const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
        console.log(event);
        dispatch(
            setPaginate({
                ...paginateParams,
                sort: sortOrder,
                order: event.sortField
            })
        );
    }

    const onFilterByDate = (e) => {
        let updatePaginateParams = { ...paginateParams };

        if (e.startDate === "" || e.endDate === "") {
            delete updatePaginateParams.start_date;
            delete updatePaginateParams.end_date;
          } else {
            updatePaginateParams.start_date = moment(e.startDate).format("yy-MM-DD");
            updatePaginateParams.end_date = moment(e.endDate).format("yy-MM-DD");
          }

        dispatch(setDateFilter(e));
        dispatch(setPaginate(updatePaginateParams));
    };

    /**
     * Table Footer Render
     * **/
    const FooterRender = () => {
        return (
            <div className=' flex items-center justify-content-between'>
                <div>{translate.total} - <span style={{ color: "#4338CA" }}>{total ? total.current : 0}</span></div>
                <div className=' flex align-items-center gap-3'>
                    <Button
                        outlined
                        icon="pi pi-refresh"
                        size="small"
                        onClick={() => {
                            dispatch(setPaginate(pointPayload.paginateParams));
                            dispatch(setDateFilter({ startDate: "", endDate: "" }));
                        }}
                    />
                    <PaginatorRight
                        show={showAuditColumn}
                        onHandler={(e) => setShowAuditColumn(e)}
                        label={translate.audit_columns}
                    />
                </div>
            </div>
        )
    }

    /**
    * Table Header Render
    */
    const HeaderRender = () => {
        return (
            <div className='w-full flex flex-column md:flex-row justify-content-between md:justify-content-start align-items-start md:align-items-center gap-3'>

                <Search
                    tooltipLabel={"search by point id, label, point"}
                    placeholder={"Search point"}
                    onSearch={(e) => onSearchChange(e)}
                    label={translate.press_enter_key_to_search}
                />

                <FilterByDate onFilter={(e) => onFilterByDate(e)} label={translate.filter_by} />

            </div>
        )
    }


    /**
     *  Loading Data
     */
    const loadingData = useCallback(async () => {
        setLoading(true);

        const result = await pointService.index(dispatch, paginateParams);
        if (result.status === 200) {
            total.current = result?.data?.total;
        }

        setLoading(false);
    }, [dispatch, paginateParams]);

    useEffect(() => {
        loadingData();
    }, [loadingData])

    return (
        <Card
            title={translate.point_list}
        >
            <DataTable
                dataKey="id"
                size="normal"
                value={points}
                sortField={paginateParams.order}
                sortOrder={paginateParams.sort === 'DESC' ? 1 : paginateParams.sort === 'ASC' ? -1 : 0}
                onSort={onSort}
                sortMode={paginateOptions.sortMode}
                loading={loading}
                emptyMessage="No point found."
                globalFilterFields={pointPayload.columns}
                header={<HeaderRender />}
                footer={<FooterRender />}
            >
                {showColumns.current.map((col, index) => {
                    return (
                        <Column
                            key={`point_col_index_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => {
                                switch (col.field) {
                                    case "id":
                                      return (
                                        <NavigateId
                                          url={`${paths.point}/${value[col.field]}`}
                                          value={value[col.field]}
                                        />
                                      );
                                    default:
                                      return value[col.field];
                                  }

                            }}
                        />
                    )
                })}

                {showAuditColumn && auditColumns.map((col, index) => {
                    return (
                        <Column
                            key={`audit_column_key_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => <label> {datetime.long(value[col.field])} </label>}
                        />
                    )
                })}
            </DataTable>
            <Paginator
                first={first.current}
                rows={paginateParams.per_page}
                totalRecords={total?.current}
                rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                template={"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"}
                currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
                onPageChange={onPageChange}
            />
        </Card>
    )
}

export default PointTableView