import { paths } from "../../constants/paths";
import { UserList } from "./view/UserList";
import { UserCreate } from "./entry/UserCreate";


export const userRoutes = [
    {
        path : paths.user,
        element : <UserList />
    },
    {
        path: paths.userCreate,
        element : <UserCreate />
    }
]