import { paths } from "../../constants/paths";
import { UserList } from "./view/UserList";
import { UserCreate } from "./entry/UserCreate";
import UserDetail from "./view/UserDetail";


export const userRoutes = [
    {
        path : paths.user,
        element : <UserList />
    },
    {
        path: paths.userCreate,
        element : <UserCreate />
    },
    {
        path : paths.userDetail,
        element : <UserDetail />
    }
]