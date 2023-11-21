import { BreadCrumb } from "../../../shares/BreadCrumb"
import {UserTableView} from '../list/UserTableView';

export const UserList = () => {

    return (
        <div className="grid">

            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className='col-12'>
                <UserTableView  />
            </div>
        </div>
    )
}