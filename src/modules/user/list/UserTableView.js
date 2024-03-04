

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userPayload } from '../userPayload';
import { userService } from '../userService';
import { auditColumns, paginateOptions } from '../../../constants/config';
import { Search } from '../../../shares/Search';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { PaginatorRight } from '../../../shares/PaginatorRight';
import { Column } from 'primereact/column';
import { Status } from '../../../shares/Status';
import { dateAge, dateFormat, datetime } from '../../../helpers/datetime';
import { paths } from '../../../constants/paths';
import { Paginator } from 'primereact/paginator';
import { setPaginate } from '../userSlice';
import { FilterByStatus } from '../../../shares/FilterByStatus';
import { setDateFilter, setStatusFilter } from '../../../shares/shareSlice';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';
import moment from 'moment';
import { FilterByDate } from '../../../shares/FilterByDate';
import { Card } from 'primereact/card';
import { NavigateId } from '../../../shares/NavigateId';
import { ExportExcel } from "../../../shares/export";

export const UserTableView = () => {

    const dispatch = useDispatch();
    const { users, paginateParams } = useSelector(state => state.user);
    const { translate } = useSelector(state => state.setting);

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const first = useRef(0);
    const total = useRef(0);
    const userStatus = useRef(['ALL']);
    const columns = useRef(userPayload?.columns);
    const showColumns = useRef(columns?.current?.filter(col => col.show === true));


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
        const result = await userService.index(dispatch, paginateParams);
        if (result.status === 200) {
            total.current = result?.data?.total ? result.data.total : result.data.length;
        }

        setLoading(false);
    }, [dispatch, paginateParams]);

    /**
     * loading User Status
    */
    const loadingStatus = useCallback(async () => {
        const userStatusResponse = await getRequest(
            `${endpoints.status}?type=user`
        );

        if (userStatusResponse.status === 200) {
            userStatus.current = userStatus.current.concat(
                userStatusResponse.data.user
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
                            dispatch(setPaginate(userPayload.paginateParams));
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
                    tooltipLabel={userPayload.paginateParams.columns}
                    placeholder={translate.search}
                    onSearch={(e) => onSearchChange(e)}
                    label={translate.press_enter_key_to_search}
                />

                <div className=' flex flex-column md:flex-row align-items-start md:align-items-end justify-content-center gap-3'>
                    <FilterByStatus
                        status={userStatus.current}
                        onFilter={(e) => onFilter(e)}
                        label={translate.filter_by}
                    />

                    <FilterByDate
                        onFilter={(e) => onFilterByDate(e)}
                        label={translate.filter_by_date}
                    />

                    <ExportExcel
                        url={endpoints.exportUser}
                    />
                </div>
            </div>
        )
    }


    return (
        <Card
            title={translate.user_list}
        >
            <DataTable
                dataKey="id"
                size="normal"
                value={users}

                sortField={paginateParams.order}
                sortOrder={paginateParams.sort === 'DESC' ? 1 : paginateParams.sort === 'ASC' ? -1 : 0}
                onSort={onSort}
                sortMode={paginateOptions.sortMode}
                loading={loading}
                emptyMessage="No user accounts found."
                globalFilterFields={userPayload.columns}
                header={<HeaderRender />}
                footer={<FooterRender />}
            >
                {showColumns && showColumns.current?.map((col, index) => {
                    return (
                        <Column
                            key={`user_col_index_${index}`}
                            style={{ minWidth: col.with }}
                            field={col.field}
                            header={col.header}
                            sortable={col.sortable}
                            body={(value) => {

                                switch (col.field) {
                                    case "name":
                                        return (
                                            <NavigateId
                                                url={`${paths.user}/${value['id']}`}
                                                value={value[col.field]}
                                            />
                                        );
                                    case 'dob':
                                        return <span> {dateFormat(value[col.field], "DEFAULT")} </span>
                                    case 'age':
                                        const userAge = dateAge(value['dob']);
                                        return <span> {userAge.age} {userAge.unit} </span>
                                    case "status":
                                        return <Status status={value[col.field]} />;
                                    case "email_verified_at":
                                        return <span>{datetime.long(value[col.field])}</span>
                                    default:
                                        return value[col.field];
                                }
                            }}
                        />
                    )
                })}

                {showAuditColumn && auditColumns?.map((col, index) => {
                    return (
                        <Column
                            key={`audit_column_key_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => {
                                if (col.field === 'created_at' || col.field === 'updated_at' || col.field === 'deleted_at') {
                                    return <span> {datetime.long(value[col.field])} </span>
                                } else {
                                    return <span> {value[col.field] && value[col.field].name} </span>
                                }
                            }}
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