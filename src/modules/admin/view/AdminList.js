import { Card } from "primereact/card"
import { Column } from 'primereact/column';
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb"
import { Search } from "../../../shares/Search"
import { adminPayload } from "../adminPayload";
import { paginateOptions } from "../../../constants/config";

export const AdminList = () => {

    const [loading, setLoading] = useState(false);
    return(
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <Card
                    title="Administrator List"
                    subTitle="All admin accounts are showing and admin can manage each account."
                >
                    <div className="grid">
                        <div className="col-12">
                            <DataTable
                                dataKey="id"
                                size="normal"
                                paginator
                                rows={paginateOptions.rows}
                                rowsPerPageOptions={paginateOptions.rowsPerPageOptions} 
                                paginatorTemplate={paginateOptions.paginatorTemplate}
                                paginatorLeft={paginateOptions.paginatorLeft}
                                paginatorRight={paginateOptions.paginatorRight}
                                sortMode={paginateOptions.sortMode}
                                filterDisplay="row" 
                                loading={loading}
                                emptyMessage="No admin accounts found."
                                globalFilterFields={adminPayload.columns}
                                header={() => {
                                    return(
                                        <Search 
                                            placeholder="Search admin account"
                                            onSearch={(e) => console.log(e)}
                                        />
                                    )
                                }}
                            >
                                { adminPayload.columns && adminPayload.columns.map((col, index) => {
                                    return(
                                        <Column key={`admin_col_index_${index}`} field={col.field} header={col.header} />
                                    )
                                })}
                            </DataTable>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}