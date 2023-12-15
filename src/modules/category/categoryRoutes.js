import { paths } from "../../constants/paths";
import { MainCategoryCreate } from "./entry/MainCategoryCreate";
import { MainCategoryDetail } from "./view/MainCategoryDetail";
import { MainCategoryList } from "./view/MainCategoryList";
import { SubCategoryList } from "./view/SubCategoryList";

export const categoryRoutes = [
    {
        id: "mainCategory",
        path: paths.category,
        element : <MainCategoryList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Main Category", url: paths.category },
                    { label: "Create", url: paths.createMainCategory },
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
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Main Category", url: paths.category },
                    { label: "Create", url: paths.createMainCategory },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "updateMainCategory",
        path: paths.updateMainCategory,
        element : <MainCategoryDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Main Category", url: paths.category },
                    { label: "Create", url: paths.createMainCategory },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "subCategory",
        path: paths.subCategory,
        element : <SubCategoryList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Main Category", url: paths.category },
                    { label: "Sub Category", url: null },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    }
]