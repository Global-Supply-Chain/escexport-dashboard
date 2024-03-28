import { BreadCrumb } from "../../../shares/BreadCrumb"
import { CountryTableView } from "../list/CountryTableView"

export const CountryList = () => {

    return (
        <div className="grid">

            <div className=" col-12">
                <BreadCrumb />
            </div>

            <div className=" col-12">
                <CountryTableView />
            </div>

        </div>
    )
}