
import { BreadCrumb } from '../../../shares/BreadCrumb';
import PromotionTableView from '../list/PromotionTableView';

export const PromotionList = () => {

    
    return(
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className='col-12'>
                <PromotionTableView />
            </div>
        </div>
    )
}