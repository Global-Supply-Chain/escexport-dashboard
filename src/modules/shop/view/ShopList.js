import { BreadCrumb } from "../../../shares/BreadCrumb"
import { ShopViewTable } from "../list/ShopViewTable"

export const ShopList = () => {

    return (
        <div className="grid">

            <div className=" col-12">
                <BreadCrumb />
            </div>

            <div className=" col-12">
                <ShopViewTable />
            </div>

        </div>
    )
}