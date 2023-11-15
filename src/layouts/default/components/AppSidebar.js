import { TieredMenu } from 'primereact/tieredmenu';
import { endpoints } from '../../../helpers/endpoints';

export const AppSidebar = () => {

    const items = [
        {
            icon: "pi pi-fw pi-desktop",
            label: "Dashboard",
            url: "/"
        },
        {
            icon: 'pi pi-fw pi-ticket',
            label: "Promotion",
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    url: endpoints.promotionCreate
                },
                {
                    label: 'List',
                    icon: 'pi pi-fw pi-external-link',
                    url: endpoints.promotion
                }
            ]
        },
    ];

    return(
        <TieredMenu 
            model={items}
        /> 
    )
}