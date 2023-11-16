import { paths } from "../../constants/paths";
import { UserList } from "./view/UserList";


export const userRoutes = [
    {
        path : paths.user,
        element : <UserList />
    }
]