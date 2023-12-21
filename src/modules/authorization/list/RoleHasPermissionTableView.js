import { Checkbox } from 'primereact/checkbox'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useRef, useState } from 'react'
import { authorizationPayload } from '../authorizationPayload'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { authorizationService } from '../authorizatonService'
import { useDispatch } from 'react-redux'
import { Card } from 'primereact/card'

export const RoleHasPermissionTableView = ({ dataSource, callback }) => {

    const columns = useRef(authorizationPayload.roleHasPermissionColumns);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [checkAll, setCheckAll] = useState(false);
    const [checkList, setCheckList] = useState([]);

    const dispatch = useDispatch();

    const onPerChange = (e) => {
        let permission = [...checkList];

        if (e.checked) {
            permission.push(e.value);
        }
        else
            permission = permission.filter(per => per !== e.value);

        setCheckList(permission);
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
    };

    const submitRoleRemovePermission = async () => {
        setLoading(true);

        const payload = {
            permissions: checkList
        }
        const res = await authorizationService.rolePermissionRemove(dispatch, dataSource?.id, payload);
        if (res.status === 200) {
            callback()
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!globalFilterValue) {
            setFilters(dataSource?.role?.permissions);
            return;
        }

        const result = filters?.filter((per) =>
            per.name.toLowerCase().includes(globalFilterValue.toLowerCase())
        );
        setFilters(result);

    }, [globalFilterValue, filters, dataSource?.role?.permissions])

    useEffect(() => {
        if (checkAll === true) {
            const result = filters?.map((per) => per.id)
            setCheckList(result)
        }
    }, [checkAll,filters])

    useEffect(() => {
        if (dataSource) {
            setFilters(dataSource?.role?.permissions)
        }
    }, [dataSource]);

    const RenderFooter = () => {
        const isDisable = checkList?.length > 0 ? false : true;

        return (
            <div className=' flex align-items-center justify-content-end'>
                <Button
                    type='submit'
                    label='REMOVE PERMISSION'
                    disabled={isDisable}
                    severity='danger'
                    onClick={submitRoleRemovePermission}
                    outlined
                />
            </div>
        )
    }

    return (
        <Card
        title={'Role Has Permission'}
        >

            <div className="flex justify-content-end gap-3 mb-3">
                <div className=' flex align-items-center justify-content-center gap-3'>
                    <label htmlFor='select' className=' text-black'>Select All</label>
                    <Checkbox
                        inputId='select'
                        checked={checkAll}
                        onChange={(e) => {
                            setCheckAll(!checkAll);
                            if (e.checked === false) {
                                setCheckList([]);
                            }
                        }}
                    />
                </div>
                <span className="p-input-icon-left">
                    <i htmlFor={'search'} className="pi pi-search" />
                    <InputText 
                    id="search"
                    value={globalFilterValue} 
                    onChange={onGlobalFilterChange} 
                    placeholder="Keyword Search" />
                </span>
            </div>

            <DataTable
                dataKey='id'
                value={filters}
                stripedRows
                filterDisplay="row"
                filters={filters}
                loading={loading}
                tableStyle={{ minWidth: '50rem' }}
                globalFilterFields={['id', 'name']}
                footer={<RenderFooter />}
            >
                {
                    columns.current?.map((col, index) => {
                        return (
                            <Column
                                key={`role_has_per_col_index_${index}`}
                                style={{ minWidth: "250px" }}
                                field={col.field}
                                header={col.header}
                                sortable={col.sortable}
                                body={(value) => {

                                    if (col.field === 'action') {
                                        return (
                                            <Checkbox
                                                inputId={value.id}
                                                value={value.id}
                                                checked={checkAll ? checkAll : checkList.some((che) => che === value.id)}
                                                onChange={(e) => {
                                                    onPerChange(e);
                                                    setCheckAll(false)
                                                }}
                                                multiple
                                            />
                                        )
                                    }

                                    return value[col.field]

                                }}
                            />
                        )
                    })
                }

            </DataTable>

        </Card>
    )
}
