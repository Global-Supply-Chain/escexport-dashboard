import { paths } from "../../constants/paths"
import { MemberCreate } from "./entry/MemberCreate"
import MemberDetail from "./views/MemberDetail"
import { MemberList } from "./views/MemberList"


export const memberRoutes = [
    {
        id : "memberList",
        path : paths.member,
        element : <MemberList />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Create", url: paths.memberCreate },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "memberCreate",
        path: paths.memberCreate,
        element : <MemberCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.member },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "memberDetail",
        path: `/${paths.memberDetail}`,
        element: <MemberDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.member },
                    { label: "Create", url: paths.memberCardCreate}
                ]
            }
        }
    }
]