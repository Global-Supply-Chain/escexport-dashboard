import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column";
import { Search } from "../../../shares/Search";
import { Button } from "primereact/button";
import { auditColumns, paginateOptions } from "../../../constants/config";
import { useCallback, useEffect, useRef, useState } from "react";
import { PaginatorRight } from "../../../shares/PaginatorRight";
import { useDispatch, useSelector } from "react-redux";
import { Paginator } from "primereact/paginator";
import { Status } from "../../../shares/Status";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { datetime } from "../../../helpers/datetime";
import { shopPayload } from "../shopPayload";
import { shopService } from "../shopService";
import { setPaginate } from "../shopSlice";
import { Can } from "../../../shares/Can";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { FilterByStatus } from "../../../shares/FilterByStatus";
import { setDateFilter, setStatusFilter } from "../../../shares/shareSlice";
import moment from "moment";
import { FilterByDate } from "../../../shares/FilterByDate";

export const ShopViewTable = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shops, paginateParams } = useSelector(state => state.shop)
    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);
    const columns = useRef(shopPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));
    const first = useRef(0);
    const total = useRef(0);
    const shopStatus = useRef(['ALL']);

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

        updatePaginateParams.start_date = moment(e.startDate).format('yy-MM-DD');
        updatePaginateParams.end_date = moment(e.endDate).format('yy-MM-DD');

        dispatch(setDateFilter(e));
        dispatch(setPaginate(updatePaginateParams));
    };

    const handleExport = () => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        iframe.src = 'http://127.0.0.1:8000/dashboard/export-shop';

        // Cleanup the iframe after download
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 5000); // Adjust the timeout as needed
    };

    /**
     * Loading Data
     */
    const loadingData = useCallback(async () => {
        setLoading(true);
        const response = await shopService.index(dispatch, paginateParams);
        if (response.status === 200) {
            total.current = response.data.total ? response.data.total : response.data.length;
        }
        setLoading(false);
    }, [dispatch, paginateParams]);

    /**
 * loading User Status
*/
    const loadingStatus = useCallback(async () => {
        const shopStatusResponse = await getRequest(
            `${endpoints.status}?type=general`
        );

        if (shopStatusResponse.status === 200) {
            shopStatus.current = shopStatus.current.concat(
                shopStatusResponse.data.general
            );
        }
    }, []);

    useEffect(() => {
        loadingStatus();
    }, [loadingStatus]);

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    /**
 * Table Footer Render
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
                    tooltipLabel={"search shop by id, name, phone,address, location, status"}
                    placeholder={"Search shop"}
                    onSearch={(e) => onSearchChange(e)}
                />

                <div className="flex flex-row justify-content-center align-items-end gap-3">
                    <FilterByStatus
                        status={shopStatus.current}
                        onFilter={(e) => onFilter(e)}
                    />

                    <FilterByDate onFilter={(e) => onFilterByDate(e)} />

                    <Button
                        link
                        outlined
                        icon="pi pi-cloud-download"
                        size='small'
                        onClick={handleExport}
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
                value={shops}
                sortField={paginateParams.order}
                sortOrder={paginateParams.sort === 'DESC' ? 1 : paginateParams.sort === 'ASC' ? -1 : 0}
                onSort={onSort}
                loading={loading}
                emptyMessage="No shop found."
                globalFilterFields={shopPayload.columns}
                sortMode={paginateOptions.sortMode}
                header={<HeaderRender />}
                footer={<FooterRender />}
            >
                {showColumns.current.map((col, index) => {
                    return (
                        <Column
                            key={`category_col_index_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => {
                                if (col.field === 'status') {
                                    return (<Status status={value[col.field]} />)
                                }

                                if (col.field === 'region') {
                                    return (<span>{value[col.field]?.name}</span>)
                                }

                                if (col.field === 'id') {
                                    return (<label className="nav-link" onClick={() => navigate(`${paths.shop}/${value[col.field]}`)}> {value[col.field]} </label>)
                                }
                                return value[col.field]

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
        </>
    )
}