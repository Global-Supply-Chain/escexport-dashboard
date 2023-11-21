import { paths } from "../../constants/paths";
import { UserList } from "./view/UserList";
import { UserCreate } from "./entry/UserCreate";
import { UserDetail } from "./view/UserDetail";


export const userRoutes = [
    {
        id : "userList",
        path : paths.user,
        element : <UserList />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.user },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "userCreate",
        path: paths.userCreate,
        element : <UserCreate />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "User", url: paths.user },
                    { label: "Create", url: paths.userCreate },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "userDetail",
        path : paths.userDetail,
        element : <UserDetail />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.user },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    }
]