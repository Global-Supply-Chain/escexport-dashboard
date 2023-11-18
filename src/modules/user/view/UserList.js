import { BreadCrumb } from 'primereact/breadcrumb';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { Column } from 'primereact/column';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import { paths } from '../../../constants/paths';
import { Search } from '../../../shares/Search';
import { getRequest } from '../../../helpers/api';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import ConfirmDialogButton from '../../../shares/ConfirmDialogButton';


export const UserList = () => {

    const [params, setParams] = useState(null);
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [rowId, setRowId] = useState();

    /**
     * delete confirm dialog accept message
     * **/
    const acceptMsg = {
        severity :  'success',
        summary : 'Confirmed',
        detail : 'User is deleted successfully',
        life : 3000,
        id : rowId
    }

    /**
     * delete confirm dialog reject message
     * **/
    const rejectMsg = {
        severity :  'error',
        summary : 'Confirmed',
        detail : 'Network error',
        life : 3000
    }

    /**
     * for breadcrumbs
     * @returns
     * **/
    const breadcrumbs = [
        { label: "Dashboard", url: "/" },
        { label: "User", url: paths.user },
    ];

    /**
     * user list column for datatable
     * @returns
     * **/
    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'phone', header: 'Phone' },
        { field: 'email', header: 'Email' },
        {
            field: 'status',
            header: 'Status',
            body: (rowData) => {
                return <Badge value={rowData.status} severity={rowData?.status !== "ACTIVE" && "warning"} readOnly cancel={"false"} />;
            }
        },
        {
            field: 'option',
            header: 'Option',
            body: (rowData) => {
                return (
                    <>

                        <div className=' flex align-items-center gap-3'>
                            <Button
                                size='small'
                                onClick={() => {
                                    navigate(`/user/${rowData.id}`)
                                }}
                            >
                                <i className=' pi pi-user-edit'></i>
                            </Button>
                            <Button
                                size='small'
                                severity='danger'
                                onClick={() => {
                                    setVisible(true);
                                    setRowId(rowData?.id);
                                }}
                            >
                                <i className=' pi pi-trash'></i>
                            </Button>
                        </div>

                    </>
                )
            }
        }
    ];

    const state = useSelector(state => state.promotion);
    const navigate = useNavigate();

    /**
     * Loading state
     */
    const loadingState = useCallback(() => {
        if (state && state.params) setParams(state.params);
    }, [state, setParams]);

    /**
     * Loading Data
     */
    const loadingData = useCallback(async () => {
        const response = await getRequest('/user');

        if (response && response.status === 200) {
            setData(response.data);
        }


    }, []);

    useEffect(() => {
        loadingState();
    }, [loadingState]);

    useEffect(() => {
        loadingData();
    }, [loadingData])

    const PromotionHeader = () => {
        return (
            <div className='grid px-2'>
                <Search
                    placeholder="Search Promotion"
                    onSearch={(e) => {
                        console.log(e);
                    }}
                />
            </div>
        )
    }

    return (
        <div className="grid">

            <ConfirmDialogButton 
            visible={visible}
            setVisible={setVisible}
            message={'Are you sure to delete user?'}
            header={'Confirm'}
            acceptMessage={acceptMsg}
            rejectMessage={rejectMsg}
            callback={loadingData}
            />

            <div className="col-12">
                <BreadCrumb model={breadcrumbs} />
            </div>

            <div className='col-12'>
                <Card title="User List" header={<PromotionHeader />}>
                    <DataTable
                        onRowClick={(e) => {
                            navigate(`/user/${e.data.id}`)
                        }}
                        value={data}

                    >
                        {columns.map((col) => (
                            <Column
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                body={col.body}
                            />
                        ))}
                    </DataTable>

                    <Paginator
                        first={1}
                        rows={10}
                        totalRecords={120}
                        rowsPerPageOptions={[10, 20, 30]}
                    />
                </Card>
            </div>
        </div>
    )
}