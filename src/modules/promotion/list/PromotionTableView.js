import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { promotionPayload } from '../promotionPayload';
import { promotionService } from '../promotionService';
import { Search } from '../../../shares/Search';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { auditColumns, paginateOptions } from '../../../constants/config';
import { PaginatorRight } from '../../../shares/PaginatorRight';
import { Column } from 'primereact/column';
import { Status } from '../../../shares/Status';
import { paths } from '../../../constants/paths';
import { datetime } from '../../../helpers/datetime';
import { Paginator } from 'primereact/paginator';
import { setPaginate } from '../promotionSlice';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';
import { setDateFilter, setStatusFilter } from '../../../shares/shareSlice';
import { FilterByStatus } from '../../../shares/FilterByStatus';
import moment from 'moment';
import { FilterByDate } from '../../../shares/FilterByDate';
import { Card } from 'primereact/card';
import { NavigateId } from '../../../shares/NavigateId';

const PromotionTableView = () => {

    const dispatch = useDispatch();
    const { promotions, paginateParams } = useSelector(state => state.promotion);
    const { translate } = useSelector(state => state.setting);

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const first = useRef(0);
    const total = useRef(0);
    const promotionStatus = useRef(['ALL']);
    const columns = useRef(promotionPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));


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

    /**
   * On Change Filter
   * @param {*} e
   */
    const onFilter = (e) => {
        let updatePaginateParams = { ...paginateParams };

        if (e === "ALL") {
            updatePaginateParams.filter = "";
            updatePaginateParams.value = "";
        } else {
            updatePaginateParams.filter = "status";
            updatePaginateParams.value = e;
        }

        dispatch(setPaginate(updatePaginateParams));
        dispatch(setStatusFilter(e));
    };

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
     *  Loading Data
     */
    const loadingData = useCallback(async () => {
        setLoading(true);

        const result = await promotionService.index(dispatch, paginateParams);
        if (result.status === 200) {
            total.current = result?.data?.total;
        }

        setLoading(false);
    }, [dispatch, paginateParams]);

    /**
     * loading General Status
    */
    const loadingStatus = useCallback(async () => {
        const promotionStatusResponse = await getRequest(
            `${endpoints.status}?type=general`
        );

        if (promotionStatusResponse.status === 200) {
            promotionStatus.current = promotionStatus.current.concat(
                promotionStatusResponse.data.general
            );
        }
    }, []);

    useEffect(() => {
        loadingStatus();
    }, [loadingStatus]);

    useEffect(() => {
        loadingData();
    }, [loadingData])

    /**
     * Table Footer Render
     * **/
    const FooterRender = () => {
        return (
            <div className=' flex items-center justify-content-between'>
                <div>{translate.total} - <span style={{ color: "#4338CA" }}> {total.current > 0 ? total.current : 0}</span></div>
                <div className=' flex align-items-center gap-3'>
                    <Button
                        outlined
                        icon="pi pi-refresh"
                        size="small"
                        onClick={() => {
                            dispatch(setPaginate(promotionPayload.paginateParams));
                            dispatch(setStatusFilter("ALL"));
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
            <div className="w-full flex flex-column md:flex-row justify-content-between md:justify-content-start align-items-start md:align-items-center gap-3">
                <Search
                    tooltipLabel={"search promotion by id, title, status"}
                    placeholder={"Search promotion"}
                    onSearch={(e) => onSearchChange(e)}
                    label={translate.press_enter_key_to_search}
                />

                <FilterByStatus
                    status={promotionStatus.current}
                    onFilter={(e) => onFilter(e)}
                    label={translate.filter_by}
                />

                <FilterByDate 
                    onFilter={(e) => onFilterByDate(e)} 
                    label={translate.filter_by_date} 
                />
            </div>
        )
    }


    return (
        <Card
            title={translate.promotion_list}
        >

            <DataTable
                dataKey="id"
                size="normal"
                value={promotions}
                sortField={paginateParams.order}
                sortOrder={paginateParams.sort === 'DESC' ? 1 : paginateParams.sort === "ASC" ? -1 : 0}
                onSort={onSort}
                sortMode={paginateOptions.sortMode}
                loading={loading}
                emptyMessage="No promotion found."
                globalFilterFields={promotionPayload.columns}
                header={<HeaderRender />}
                footer={<FooterRender />}
            >
                {showColumns.current.map((col, index) => {
                    return (
                        <Column
                            key={`promotion_col_index_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => {
                                switch (col.field) {
                                    case "title":
                                      return (
                                        <NavigateId
                                          url={`${paths.promotion}/${value["id"]}`}
                                          value={value[col.field]}
                                        />
                                      );
                                    case "image":
                                        return(
                                            <img 
                                                src={value[col.field] ? `${endpoints.image}/${value[col.field].image}` : ""} 
                                                alt='' 
                                                title='' 
                                                width={"80px"}
                                                height={"80px"}
                                            />
                                        )
                                    case "start_date":
                                        return(
                                            <span> {moment(value[col.field]).format("MM-DD-YYYY")} </span>
                                        )
                                    case "end_date":
                                            return(
                                                <span> {moment(value[col.field]).format("MM-DD-YYYY")} </span>
                                            )
                                    case "status":
                                      return <Status status={value[col.field]} />;
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

export default PromotionTableView