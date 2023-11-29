import { BreadCrumb } from "../../../shares/BreadCrumb"
import { UserDeliveryAddressTable } from "../list/UserDeliveryAddressTable"

export const DeliveryList = () => {

    return (
        <div className="grid">

            <div className=" col-12">
                <BreadCrumb />
            </div>

            <div className=" col-12">
                <UserDeliveryAddressTable />
            </div>

        </div>
    )
}