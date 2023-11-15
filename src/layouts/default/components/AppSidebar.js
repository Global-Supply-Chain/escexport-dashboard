import { TieredMenu } from 'primereact/tieredmenu';
import { paths } from '../../../constants/paths';

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
                    url: paths.promotionCreate
                },
                {
                    label: 'List',
                    icon: 'pi pi-fw pi-external-link',
                    url: paths.promotion
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