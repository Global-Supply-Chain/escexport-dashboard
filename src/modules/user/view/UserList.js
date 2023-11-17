import { BreadCrumb } from 'primereact/breadcrumb';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import { paths } from '../../../constants/paths';
import { Search } from '../../../shares/Search';
import { getRequest } from '../../../helpers/api';


export const UserList = () => {

    const [params, setParams ] = useState(null);
    const [data, setData] = useState([]);

    const breadcrumbs = [
        { label: "Dashboard" , url: "/" },
        { label: "User", url: paths.user },
    ];

    const columns = [
        {field: 'name', header: 'Name'},
        {field: 'phone', header: 'Phone'},
        {field: 'email', header: 'Email'},
        {field: 'status', header: 'Status'},
    ];

    const state = useSelector(state => state.promotion);
    const dispatch = useDispatch();

    /**
     * Loading state
     */
    const loadingState = useCallback(() => {
        if(state && state.params)  setParams(state.params);
    },[state, setParams]);

    /**
     * Loading Data
     */
    const loadingData = useCallback(async () => {
        const response = await getRequest('/user');

        if(response && response.status === 200){
            setData(response.data);
        }


    },[]);

    useEffect(() => {
       loadingState(); 
    },[loadingState]);

    useEffect(() => {
        loadingData();
    },[loadingData])

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
    
    return(
        <div className="grid">
            <div className="col-12">
                <BreadCrumb model={breadcrumbs} />
            </div>

            <div className='col-12'>
                <Card title="User List" header={<PromotionHeader />}>
                    <DataTable
                    onRowClick={(e) => {
                        console.log(e.data);
                    }}
                    value={data}
                    >
                        {columns.map((col) => (
                            <Column 
                                key={col.field} 
                                field={col.field} 
                                header={col.header} 
                            />
                        ))}
                        <Column header="Option"></Column>
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