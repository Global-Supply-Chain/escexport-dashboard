import { paths } from "../../constants/paths";
import CategoryCreate from "./entry/CategoryCreate";
import { CategoryList } from "./view/CategoryList";
import CategoryDetail from "./view/CategoryDetail";

export const categoryRoutes = [
    {
        id: "category",
        path: paths.category,
        element : <CategoryList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Category List", url: paths.category },
                    { label: "Create", url: paths.createCategory },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "create_category",
        path: paths.createCategory,
        element: <CategoryCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Category List", url: paths.category },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "update_category",
        path: `${paths.category}/:id`,
        element: <CategoryDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Category List", url: paths.category },
                    { label: "Create", url: paths.createCategory },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    }
]