import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { categoryPayload } from '../categoryPayload';
import { categoryService } from '../categoryService';
import { Search } from '../../../shares/Search';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { auditColumns, paginateOptions } from '../../../constants/config';
import { PaginatorRight } from '../../../shares/PaginatorRight';
import { Column } from 'primereact/column';
import { datetime } from '../../../helpers/datetime';
import { Status } from '../../../shares/Status';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../constants/paths';

const CategoryTableView = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.admin);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const categoryList = useRef(state.category);
    const columns = useRef(categoryPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));

    /**
* Table Header Render
*/
    const HeaderRender = () => {
        return (
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

    /**
    * Loading Data
    */
    const loadingData = useCallback(async () => {
        setLoading(true);

        const result = await categoryService.index(dispatch);
        if (result.status === 200) {
            categoryList.current = result.data;
        }

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingData();
    }, [loadingData])


    return (
        <DataTable
            dataKey="id"
            size="normal"
            value={categoryList.current}
            paginator
            rows={paginateOptions.rows}
            rowsPerPageOptions={paginateOptions.rowsPerPageOptions}
            paginatorTemplate={paginateOptions.paginatorTemplate}
            paginatorLeft={paginateOptions.paginatorLeft}
            paginatorRight={
                <PaginatorRight
                    show={showAuditColumn}
                    onHandler={(e) => setShowAuditColumn(e)}
                />
            }
            sortMode={paginateOptions.sortMode}
            loading={loading}
            emptyMessage="No category found."
            globalFilterFields={categoryPayload.columns}
            header={<HeaderRender />}
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

                            if (col.field === 'id') {
                                return (<label className="nav-link" onClick={() => navigate(`${paths.category}/${value[col.field]}`)}> {value[col.field]} </label>)
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
    )
}

export default CategoryTableView