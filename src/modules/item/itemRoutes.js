import { paths } from "../../constants/paths"
import ItemCreate from "./entry/ItemCreate"
import ItemDetail from "./view/ItemDetail"
import ItemList from "./view/ItemList"


export const itemRoutes = [
    {
        id: "item",
        path: paths.item,
        element : <ItemList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.item },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "itemCreate",
        path: paths.itemCreate,
        element : <ItemCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.item },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "itemDetail",
        path: paths.itemDetail,
        element : <ItemDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.item },
                ]
            }
        }
    }
]