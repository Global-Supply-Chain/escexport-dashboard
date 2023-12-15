

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auditColumns, paginateOptions } from '../../../constants/config';
import { Search } from '../../../shares/Search';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { PaginatorRight } from '../../../shares/PaginatorRight';
import { Column } from 'primereact/column';
import { datetime } from '../../../helpers/datetime';
import { paths } from '../../../constants/paths';
import { useNavigate } from 'react-router-dom';
import { Paginator } from 'primereact/paginator';
import { authorizationPayload } from '../authorizationPayload';
import { authorizationService } from '../authorizatonService';
import { setPermissionPaginate } from '../authorizationSlice';
import { setDateFilter } from '../../../shares/shareSlice';
import { FilterByDate } from '../../../shares/FilterByDate';
import moment from 'moment';

export const PermissionTableView = () => {

    const dispatch = useDispatch();
    const { permissions, permissionPaginateParams } = useSelector(state => state.auth);
    const navigate = useNavigate();
    console.log(permissionPaginateParams);

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(authorizationPayload.permissionColumns);
    const showColumns = useRef(columns?.current?.filter(col => col.show === true));


    /**
     * Event - Paginate Page Change
     * @param {*} event 
     */
    const onPageChange = (event) => {
        first.current = event.page * permissionPaginateParams.per_page;
        dispatch(
            setPermissionPaginate({
                ...permissionPaginateParams,
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
            setPermissionPaginate({
                ...permissionPaginateParams,
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
            setPermissionPaginate({
                ...permissionPaginateParams,
                sort: sortOrder,
                order: event.sortField
            })
        );
    }

    const onFilterByDate = (e) => {
        let updatePaginateParams = { ...permissionPaginateParams };
    
        updatePaginateParams.start_date = moment(e.startDate).format('yy-MM-DD');
        updatePaginateParams.end_date = moment(e.endDate).format('yy-MM-DD');
    
        dispatch(setDateFilter(e));
        dispatch(setPermissionPaginate(updatePaginateParams));
      };

    /**
     *  Loading Data
     */
    const loadingData = useCallback(async () => {
        setLoading(true);
        const result = await authorizationService.permissionIndex(dispatch, permissionPaginateParams);
        if (result.status === 200) {
            total.current = result?.data?.total ? result.data.total : result.data.length;
        }

        setLoading(false);
    }, [dispatch, permissionPaginateParams]);

    useEffect(() => {
        loadingData();
    }, [loadingData])

    /**
     * Table footer Rnder
     * **/
    const FooterRender = () => {
        return (
            <div className=' flex items-center justify-content-between'>
                <div>Total - <span style={{ color: "#4338CA" }}>{total ? total.current : 0}</span></div>
                <div className=' flex align-items-center gap-3'>
                    <Button
                        outlined
                        icon="pi pi-refresh"
                        size="small"
                        onClick={() => loadingData()}
                    />
                    <PaginatorRight
                        show={showAuditColumn}
                        onHandler={(e) => setShowAuditColumn(e)}
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
            <div className="w-full flex flex-column md:flex-row justify-content-start align-items-end">
                <Search
                    tooltipLabel={"search role by id, name, description"}
                    placeholder={"Search role"}
                    onSearch={(e) => onSearchChange(e)}
                />

                <div className="md:ml-3 flex flex-row justify-content-center align-items-end">
                    <FilterByDate onFilter={(e) => onFilterByDate(e)} />
                </div>
            </div>
        )
    }


    return (
        <>

            <DataTable
                dataKey="id"
                size="normal"
                value={permissions}
                sortField={permissionPaginateParams.order}
                sortOrder={permissionPaginateParams.sort === 'DESC' ? 1 : permissionPaginateParams.sort === 'ASC' ? -1 : 0}
                onSort={onSort}
                sortMode={paginateOptions.sortMode}
                loading={loading}
                emptyMessage="No permission found."
                globalFilterFields={authorizationPayload.permissionColumns}
                header={<HeaderRender />}
                footer={<FooterRender />}
            >
                {showColumns && showColumns.current?.map((col, index) => {
                    return (
                        <Column
                            key={`role_col_index_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => {

                                if (col.field === 'id') {
                                    return (<label className="nav-link" onClick={() => navigate(`${paths.role}/${value[col.field]}`)}> {value[col.field]} </label>)
                                }
                                return value[col.field]

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
                                    return <label> {datetime.long(value[col.field])} </label>
                                } else {
                                    return <label> {value[col.field] && value[col.field].name} </label>
                                }
                            }}
                        />
                    )
                })}
            </DataTable>
            <Paginator
                first={first.current}
                rows={permissionPaginateParams.per_page}
                totalRecords={total?.current}
                rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                template={"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"}
                currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
                onPageChange={onPageChange}
            />
        </>
    )
}