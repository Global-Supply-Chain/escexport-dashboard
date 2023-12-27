import React from "react";
import { Card } from "primereact/card";
import { LanguageUpdate } from "../entry/LanguageUpdate";
import { useSelector } from "react-redux";

export const SettingDetail = () => {

  const { translate } = useSelector(state => state.setting);

  return (
    <div className="grid">
      <div className="col-12">
        <Card
          title={translate.setting_card_title}
          subTitle={translate.setting_card_sub_title}
        >
          <div className="col-12 md:col-3">
            <LanguageUpdate />
          </div>
        </Card>
      </div>
    </div>
  );
};
