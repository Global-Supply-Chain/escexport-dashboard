import { paths } from "../../constants/paths"
import { RegionCreate } from "./entry/RegionCreate"
import { RegionDetail } from "./views/RegionDetail"
import { RegionList } from "./views/RegionList"


export const regionRoutes = [
    {
        id : "regionList",
        path : paths.region,
        element : <RegionList />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.region },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "regionCreate",
        path: paths.regionCreate,
        element : <RegionCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.region },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "regionDetail",
        path: `/${paths.region}/:id`,
        element: <RegionDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.region }
                ]
            }
        }
    }
]