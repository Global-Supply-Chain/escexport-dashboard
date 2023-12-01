import { paths } from "../../constants/paths";
import { MainCategoryCreate } from "./entry/MainCategoryCreate";
import { MainCategoryUpdate } from "./entry/MainCategoryUpdate";
import CategoryDetail from "./view/CategoryDetail";
import { MainCategoryList } from "./view/MainCategoryList";


export const mainCategoryRoutes = [
    {
        id: "mainCategory",
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
        id: "createMainCategory",
        path: paths.createMainCategory,
        element : <MainCategoryCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "Main Category", url: paths.mainCategory },
                    { label: "Create", url: paths.createMainCategory },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "updateMainCategory",
        path: paths.updateMainCategory,
        element : <MainCategoryUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "Main Category", url: paths.mainCategory },
                    { label: "Create", url: paths.createMainCategory },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "mainCategoryDetail",
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