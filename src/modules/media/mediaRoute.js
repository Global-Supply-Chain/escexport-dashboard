import { paths } from "../../constants/paths";
import MediaList from "./view/MediaList";


export const mediaRoutes = [
    {
        id: "mediaList",
        path : paths.media,
        element : <MediaList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.media },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    }
]