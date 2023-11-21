import { paths } from "../../constants/paths";
import CategoryCreate from "./entry/CategoryCreate";
import CategoryDetail from "./view/CategoryDetail";
import CategoryList from "./view/CategoryList";


export const categoryRoutes = [
    {
        id: "category",
        path: paths.category,
        element : <CategoryList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.category },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "categoryCreate",
        path: paths.categoryCreate,
        element: <CategoryCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.category },
                    { label: "Create", url: paths.categoryCreate }
                ]
            }
        }
    },
    {
        id: "categoryDetail",
        path : paths.categoryDetail,
        element: <CategoryDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.category },
                    { label: "Detail", url: paths.categoryDetail },
                ]
            }
        }
    }
]