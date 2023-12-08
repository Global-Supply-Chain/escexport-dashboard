import { paths } from "../../constants/paths"
import { RoleList } from "./view/RoleList"


export const authorizationRoute = [
    {
        id: "authorization",
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
]