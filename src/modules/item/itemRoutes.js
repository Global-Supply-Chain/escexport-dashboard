import { paths } from "../../constants/paths"
import ItemCreate from "./entry/ItemCreate"
import ItemList from "./view/ItemList"


export const itemRoutes = [
    {
        id: "item",
        path: paths.item,
        element : <ItemList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
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
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.item },
                    { label: "Create", url: paths.itemCreate },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]