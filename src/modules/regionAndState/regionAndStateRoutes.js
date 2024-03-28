import { paths } from "../../constants/paths"
import { RegionAndStateCreate } from "./entry/RegionAndStateCreate"
import { RegionAndStateDetail } from "./views/RegionAndStateDetail"
import { RegionAndStateList } from "./views/RegionAndStateList"


export const regionAndStateRoutes = [
    {
        id : "regionAndStateList",
        path : paths.regionAndState,
        element : <RegionAndStateList />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.regionAndState },
                    { label: "Create", url: paths.regionAndStateCreate },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "regionAndStateCreate",
        path: paths.regionAndStateCreate,
        element : <RegionAndStateCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.regionAndState },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "regionAndStateDetail",
        path: `/${paths.regionAndState}/:id`,
        element: <RegionAndStateDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.regionAndState }
                ]
            }
        }
    }
]