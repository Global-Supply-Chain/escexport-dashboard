import { paths } from "../../constants/paths";
import CategoryCreate from "./entry/CategoryCreate";
import CategoryDetail from "./view/CategoryDetail";
import { MainCategoryList } from "./view/MainCategoryList";


export const categoryRoutes = [
    {
        id: "category",
        path: paths.mainCategory,
        element : <MainCategoryList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "Main Category", url: paths.mainCategory },
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
                    { label: "List", url: paths.mainCategory },
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
                ]
            }
        }
    }
]