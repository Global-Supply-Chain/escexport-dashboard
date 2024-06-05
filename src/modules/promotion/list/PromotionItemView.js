import { Card } from "primereact/card"
import { CreatePromotionItem } from "../entry/CreatePromotionItem"
import { PromotionItemList } from "../view/PromotionItemList";
import { useState } from "react";

export const PromotionItemView = ({id}) => {

    const [status, setStatus] = useState();

    return(
        <Card title="Promotion Item List">
            <div className="grid">
                <div className="col-12">
                    <CreatePromotionItem id={id} setStatus={setStatus} />
                </div>
                <div className=" col-12">
                    <PromotionItemList id={id} status={status} />
                </div>
            </div>
        </Card>
    )
}