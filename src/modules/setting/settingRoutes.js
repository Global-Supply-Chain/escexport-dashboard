import { paths } from "../../constants/paths"
import { SettingDetail } from "./views/SettingDetail"

export const settingRoutes = [
    {
        id : "setting",
        path : paths.setting,
        element : <SettingDetail />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Setting", url: paths.setting },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
];