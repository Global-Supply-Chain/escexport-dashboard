import { DataTable } from "primereact/datatable"
import { deliveryPayload } from "../deliveryPayload";
import { Column } from "primereact/column";
import { Search } from "../../../shares/Search";
import { Button } from "primereact/button";
import { paginateOptions } from "../../../constants/config";
import { useCallback, useEffect, useRef, useState } from "react";
import { PaginatorRight } from "../../../shares/PaginatorRight";
import { useDispatch, useSelector } from "react-redux";
import { deliveryService } from "../deliveryService";

export const UserDeliveryAddressTable = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.delivery)

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);
    const deliveries  = useRef(state.deliveries);

    /**
     * Loading Data
     */
    const loadingData = useCallback(async () => {
        setLoading(true);
        const response = await deliveryService.index(dispatch);
        if(response.status === 200) {
            deliveries.current = response.data;
        }
        setLoading(false);
    },[dispatch]);

    /**
     * Table Header Render
     */
    const HeaderRender = () => {
        return(
            <div className="w-full flex flex-column md:flex-row justify-content-between align-items-start">
                <Search 
                    tooltipLabel={"search by admin's id, name, email, phone, status"}
                    placeholder={"Search admin account"}
                    onSearch={(e) => console.log(e)}
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

    useEffect(() => {
        loadingData();
    },[loadingData]);

    return(
        <DataTable
            header={<HeaderRender />}
            dataKey="id"
            size="normal"
            value={deliveries.current}
            lazy={paginateOptions.lazy}
            loading={loading}
            resizableColumns={paginateOptions.resizableColumns}
            emptyMessage="No admin accounts found."
            globalFilterFields={deliveryPayload.columns}
            paginator
            rows={paginateOptions.rows}
            rowsPerPageOptions={paginateOptions.rowsPerPageOptions} 
            paginatorTemplate={paginateOptions.paginatorTemplate}
            sortMode={paginateOptions.sortMode}
            paginatorLeft={paginateOptions.paginatorLeft}
            paginatorRight={
                <PaginatorRight 
                    show={showAuditColumn}
                    onHandler={(e) => setShowAuditColumn(e)}
                />
            }
            onSort={(e) => console.log(e)}
        >
            { deliveryPayload.columns && deliveryPayload.columns.map((col, index) => {
                return(
                    <Column 
                        key={`delivery_col_key_${index}`}
                        field={col.field}
                        header={col.header}
                    />
                )
            })}
        </DataTable>
    )
}