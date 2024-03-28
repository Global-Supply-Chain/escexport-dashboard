import { paths } from "../../constants/paths"
import { TownShipCreate } from "./entry/TownShipCreate"
import { TownshipDetail } from "./views/TownShipDetail"
import { TownShipList } from "./views/TownShipList"


export const townshipRoutes = [
    {
        id : "townshipList",
        path : paths.township,
        element : <TownShipList />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.township },
                    { label: "Create", url: paths.townshipCreate },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "townshipCreate",
        path: paths.townshipCreate,
        element : <TownShipCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.township },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "townshipDetail",
        path: `/${paths.township}/:id`,
        element: <TownshipDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.township }
                ]
            }
        }
    }
]