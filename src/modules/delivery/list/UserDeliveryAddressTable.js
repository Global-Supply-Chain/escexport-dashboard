import { DataTable } from "primereact/datatable"
import { deliveryPayload } from "../deliveryPayload";
import { Column } from "primereact/column";
import { Search } from "../../../shares/Search";
import { Button } from "primereact/button";
import { auditColumns, paginateOptions } from "../../../constants/config";
import { useCallback, useEffect, useRef, useState } from "react";
import { PaginatorRight } from "../../../shares/PaginatorRight";
import { useDispatch, useSelector } from "react-redux";
import { deliveryService } from "../deliveryService";
import { Paginator } from "primereact/paginator";
import { Status } from "../../../shares/Status";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { datetime } from "../../../helpers/datetime";

export const UserDeliveryAddressTable = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(state => state.delivery)

    const [params, setParams] = useState(deliveryPayload.paginateParams)
    const [first, setFirst] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);
    const columns = useRef(deliveryPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));
    const deliveries = useRef(state.deliveries);
    const total = useRef(0);

    const onPageChange = (event) => {
        setFirst(event?.first);
        setParams({
            ...params,
            page: event?.page + 1,
            per_page: event?.rows,
        })
    };

    const onSortChange = (event) => {
        if (event) {
            const orderFormat = event?.sortOrder === 1 ? "DESC" : "ASC";
            setParams({
                ...params,
                order: event?.sortField,
                sort: orderFormat
            })
        }
    }

    const onSearchChange = (event) => {
        setParams({
            ...params,
            search: event
        })
    }

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
                    tooltipLabel={"search by id, address, contact_person,contact_phone,default address"}
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

    /**
     * Loading Data
     */
    const loadingData = useCallback(async () => {
        setLoading(true);
        const response = await deliveryService.index(dispatch,params);
        if (response.status === 200) {
            deliveries.current = response.data.data;
            total.current = response.data.total
        }
        setLoading(false);
    }, [dispatch,params]);

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    return (
        <>
            <DataTable
                dataKey="id"
                size="normal"
                value={deliveries.current?.length > 0 ? deliveries.current : null}
                sortField={params ? params.order : ""}
                sortOrder={params ? params.sort : 1}
                onSort={(e) => onSortChange(e)}
                loading={loading}
                emptyMessage="No delivery address found."
                globalFilterFields={deliveryPayload.columns}
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

                                if(col.field === 'address') {
                                    return (<span>{value[col.field]?.substring(0,8)}...</span>)
                                }

                                if (col.field === 'id') {
                                    return (<label className="nav-link" onClick={() => navigate(`${paths.delivery}/${value[col.field]}`)}> {value[col.field]} </label>)
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
                first={first}
                rows={params.per_page ? params.per_page : paginateOptions.rows}
                totalRecords={total?.current}
                rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                onPageChange={onPageChange}
            />
        </>
    )
}