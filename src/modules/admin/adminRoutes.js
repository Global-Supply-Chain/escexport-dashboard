import { paths } from "../../constants/paths";
import { AdminCreate } from "./entry/AdminCreate";
import { AdminList } from "./view/AdminList";

export const adminRoutes = [
    {
        id: "adminCreate",
        path : paths.adminCreate,
        element : <AdminCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.admin },
                    { label: "Create", url: paths.adminCreate },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "adminList",
        path: paths.admin,
        element: <AdminList />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.admin },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    }
]