import { paths } from "../../constants/paths"
import { RoleCreate } from "./entry/RoleCreate"
import { PermissionList } from "./view/PermissionList"
import { RoleDetail } from "./view/RoleDetail"
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
        id: "roleCreate",
        path: paths.roleCreate,
        element : <RoleCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: 'Dashboard', url : '/' },
                    { label : "List", url: paths.role }
                ]
            }
        }
    },
    {
        id: "roleDetail",
        path: `/${paths.role}/:id`,
        element: <RoleDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.role }
                ]
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