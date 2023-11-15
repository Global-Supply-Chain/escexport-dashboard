import { BreadCrumb } from 'primereact/breadcrumb';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { Column } from 'primereact/column';

import { endpoints } from '../../../helpers/endpoints';
import { Search } from '../../../shares/Search';


export const PromotionList = () => {

    const breadcrumbs = [
        { label: "Dashboard" , url: "/" },
        { label: "Promotion", url: endpoints.promotion },
    ];

    const columns = [
        {field: 'title', header: 'Title'},
        {field: 'url', header: 'Url'},
        {field: 'status', header: 'Status'},
    ];

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