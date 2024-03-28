import { paths } from "../../constants/paths"
import { CityCreate } from "./entry/CityCreate"
import { CityDetail } from "./views/CityDetail"
import { CityList } from "./views/CityList"


export const cityRoutes = [
    {
        id : "cityList",
        path : paths.city,
        element : <CityList />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.city },
                    { label: "Create", url: paths.cityCreate },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "cityCreate",
        path: paths.cityCreate,
        element : <CityCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.city },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "cityDetail",
        path: `/${paths.city}/:id`,
        element: <CityDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.city }
                ]
            }
        }
    }
]