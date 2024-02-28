import { paths } from "../../constants/paths"
import { MemberCardCreate } from "./entry/MemberCardCreate"
import MemberCardDetail from "./views/MemberCardDetail"
import { MemberCardList } from "./views/MemberCardList"


export const memberCardRoutes = [
    {
        id : "memberCardList",
        path : paths.memberCard,
        element : <MemberCardList />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Create", url: paths.memberCardCreate },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "memberCardCreate",
        path: paths.memberCardCreate,
        element : <MemberCardCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.memberCard },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "memberCardDetail",
        path: `${paths.memberCard}/:id`,
        element: <MemberCardDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.memberCard },
                    { label: "Create", url: paths.memberCard }
                ]
            }
        }
    }
]