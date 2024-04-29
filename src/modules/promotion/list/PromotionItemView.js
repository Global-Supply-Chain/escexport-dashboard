import { Card } from "primereact/card"
import { CreatePromotionItem } from "../entry/CreatePromotionItem"

export const PromotionItemView = () => {

    return(
        <Card title="Promotion Item List">
            <div className="grid">
                <div className="col-12">
                    <CreatePromotionItem />
                </div>
            </div>
        </Card>
    )
}