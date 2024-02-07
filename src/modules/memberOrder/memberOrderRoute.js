import { paths } from "../../constants/paths"
import { MemberOrderDetail } from "./views/MemberOrderDetail"
import MemberOrderList from "./views/MemberOrderList"


export const memberOrderRoutes = [
    {
        id : "memberOrderList",
        path : paths.memberOrder,
        element : <MemberOrderList />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.memberOrder },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "memberOrderDetail",
        path : paths.memberOrderDetail,
        element : <MemberOrderDetail />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.memberOrder },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    }
]