import { paths } from "../../constants/paths"
import { PermissionList } from "./view/PermissionList"
import { RoleList } from "./view/RoleList"


export const authorizationRoute = [
    {
        id: "role",
        path: paths.role,
        element : <RoleList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.role },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "permission",
        path: paths.permission,
        element : <PermissionList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.permission },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]