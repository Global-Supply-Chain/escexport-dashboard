import { BreadCrumb } from "../../../shares/BreadCrumb"
import { AdminUpdate } from "../entry/AdminUpdate"

export const AdminDetail = () => {

    return(
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <AdminUpdate />
            </div>
        </div>
    )
}