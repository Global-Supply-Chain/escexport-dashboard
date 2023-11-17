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
import { ActionButton } from '../../../shares/ActionButton';

export const PromotionList = () => {

    const [params, setParams ] = useState(null);

    const breadcrumbs = [
        { label: "Dashboard" , url: "/" },
        { label: "Promotion", url: paths.promotion },
    ];

    const columns = [
        {field: 'title', header: 'Title'},
        {field: 'url', header: 'Url'},
        {field: 'status', header: 'Status'},
    ];

    const state = useSelector(state => state.promotion);

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
        const result = await getRequest(paths.promotion);
        console.log(result);
    },[]);

    useEffect(() => {
       loadingState(); 
    },[loadingState]);

    useEffect(() => {
        loadingData();
    },[loadingData])

    const PromotionHeader = () => {
        return (
            <div className='flex flex-row align-items-center justify-content-between px-2'>
                <Search 
                    placeholder="Search Promotion"
                    onSearch={(e) => {
                        console.log(e);
                    }}
                />

                <ActionButton />
            </div>
        )
    }
    
    return(
        <div className="grid">
            <div className="col-12">
                <BreadCrumb model={breadcrumbs} />
            </div>

            <div className='col-12'>
                <Card title="Promotion List" header={<PromotionHeader />}>
                    <DataTable>
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