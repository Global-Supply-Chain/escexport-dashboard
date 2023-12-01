import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminPayload } from "../adminPayload";
import { Search } from "../../../shares/Search";
import { auditColumns, paginateOptions } from "../../../constants/config";
import { adminService } from "../adminService";
import { Button } from "primereact/button";
import { PaginatorRight } from "../../../shares/PaginatorRight";
import { datetime } from "../../../helpers/datetime";
import { Status } from '../../../shares/Status';
import { paths } from "../../../constants/paths";
import { useNavigate } from "react-router-dom";
import { Paginator } from "primereact/paginator";
import { setPaginate } from "../adminSlice";

export const AdminTableView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {admins, paginateParams} = useSelector(state => state.admin);

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const columns = useRef(adminPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));
    const total = useRef(0);
    const first = useRef(0);


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
  const onSort =(event) => {
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
     *  Loading Data
     */
    const loadingData = useCallback(async () => {
        setLoading(true);

        const result = await adminService.index(dispatch,paginateParams);
        if (result.status === 200) {
            total.current = result.data.total ? result.data.total : result.data.length;
        }

        setLoading(false);
    }, [dispatch,paginateParams]);

    useEffect(() => {
        loadingData();
    }, [loadingData])

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
            <div className="w-full flex flex-column md:flex-row justify-content-between align-items-start">
                <Search
                    tooltipLabel={"search admin account by id, name, email, phone, status"}
                    placeholder={"Search admin account"}
                    onSearch={(e) => onSearchChange(e)}
                />

                <div className="flex flex-row justify-content-center align-items-center">
                    <Button
                        outlined
                        icon="pi pi-filter"
                        size="small"
                    />
                </div>
            </div>
        )
    }

    return (
        <>

            <DataTable
                dataKey="id"
                size="normal"
                value={admins}
                sortField={paginateParams.order}
                sortOrder={paginateParams.sort === "DESC" ? 1 : paginateParams.sort === 'ASC' ? -1 : 0}
                onSort={onSort}
                lazy={paginateOptions.lazy}
                loading={loading}
                resizableColumns={paginateOptions.resizableColumns}
                emptyMessage="No admin accounts found."
                globalFilterFields={adminPayload.columns}
                header={<HeaderRender />}
                footer={<FooterRender />}
            >
                {showColumns.current.map((col, index) => {
                    return (
                        <Column
                            key={`admin_col_index_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => {
                                if (col.field === 'status') {
                                    return (<Status status={value[col.field]} />)
                                }

                                if (col.field === 'id') {
                                    return (
                                        <label
                                            className="nav-link"
                                            onClick={() => navigate(`${paths.admin}/${value[col.field]}`)}
                                        >
                                            {value[col.field]}
                                        </label>
                                    )
                                }

                                return value[col.field];
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
                rows={paginateParams.per_page}
                totalRecords={total?.current}
                rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                template={"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"}
                currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
                onPageChange={onPageChange}
            />

        </>
    )
}