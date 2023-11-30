import { paths } from "../../constants/paths"
import { FaqCreate } from "./entry/FaqCreate"
import { FaqDetail } from "./list/FaqDetail"
import { FaqList } from "./views/FaqList"


export const faqRoutes = [
    {
        id : "faqList",
        path : paths.faq,
        element : <FaqList />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.faq },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "faqCreate",
        path: paths.faqCreate,
        element : <FaqCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.faq },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "faqDetail",
        path: `/${paths.faq}/:id`,
        element: <FaqDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.faq }
                ]
            }
        }
    }
]