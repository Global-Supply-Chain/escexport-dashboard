import { paths } from "../../constants/paths"
import PointCreate from "./entry/PointCreate"
import PointDetail from "./view/PointDetail"
import PointList from "./view/PointList"


export const pointRoutes = [
    {
        id: "pointList",
        path : paths.point,
        element : <PointList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.point },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "pointCreate",
        path : paths.pointCreate,
        element : <PointCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.point },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "pointDetail",
        path: `${paths.point}/:id`,
        element: <PointDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.point }
                ]
            }
        }
    }
]