import { paths } from "../../constants/paths"
import { CountryCreate } from "./entry/CountryCreate"
import { CountryDetail } from "./views/CountryDetail"
import { CountryList } from "./views/CountryList"

export const countryRoutes = [
    {
        id: "country",
        path: paths.country,
        element: <CountryList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Country", url: paths.country },
                    { label: "Create", url: paths.countryCreate }
                ],
                role: ['ADMINISTRATOR']
            }
        },
        
    },
    {
        id: "countryCreate",
        path: paths.countryCreate,
        element: <CountryCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.country },
                    { label: "Create", url: paths.countryCreate }
                ]
            }
        }
    },
    {
        id: "countryDetail",
        path : paths.countryDetail,
        element: <CountryDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.country },
                ]
            }
        }
    }
]