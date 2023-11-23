import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '../../../shares/Search';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { auditColumns, paginateOptions } from '../../../constants/config';
import { PaginatorRight } from '../../../shares/PaginatorRight';
import { Column } from 'primereact/column';
import { datetime } from '../../../helpers/datetime';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../constants/paths';
import { pointPayload } from '../pointPayload';
import { pointService } from '../pointSerivce';

const PointTableView = () => {

    const dispatch = useDispatch();
    const {point} = useSelector(state => state.point);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const pointList = useRef(point);
    const columns = useRef(pointPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));

    /**
    * Table Header Render
    */
    const HeaderRender = () => {
        return (
            <div className="w-full flex flex-column md:flex-row justify-content-between align-items-start">
                <Search
                    tooltipLabel={"search by point id, label, point"}
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

        const result = await pointService.index(dispatch);
        if (result.status === 200) {
            pointList.current = result?.data;
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
            value={pointList.current}
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
            emptyMessage="No point found."
            globalFilterFields={pointPayload.columns}
            header={<HeaderRender />}
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

                            if (col.field === 'id') {
                                return (<label className="nav-link" onClick={() => navigate(`${paths.point}/${value[col.field]}`)}> {value[col.field]} </label>)
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

export default PointTableView