import { paths } from "../../constants/paths"
import { DashboardList } from "./view/DashboardList"


export const dashbardRoutes = [
    {
        id: "dashboard",
        path: paths.dashboard,
        element : <DashboardList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.dashboard },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]