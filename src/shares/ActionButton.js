import { SplitButton } from 'primereact/splitbutton';

export const ActionButton = () => {
    
    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                //toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
                //toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                //window.location.href = 'https://reactjs.org/';
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                //router.push('/fileupload');
            }
        }
    ];

    return(
        <div className="flex flex-row align-items-center justify-content-end">
            <SplitButton 
                className="action-btns"
                outlined
                model={items}
                icon="pi pi-cog"
                size="small"
                label="SETTING"
                severity="info"
            />
        </div>
    )
}