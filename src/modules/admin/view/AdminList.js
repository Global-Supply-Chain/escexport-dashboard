import { BreadCrumb } from "../../../shares/BreadCrumb"
import { AdminTableView } from "../list/AdminTableView";

export const AdminList = () => {

    return(
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <AdminTableView />
            </div>
        </div>
    )
}