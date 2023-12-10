import { BreadCrumb } from "../../../shares/BreadCrumb";
import { MainCategoryUpdate } from "../entry/MainCategoryUpdate";

export const MainCategoryDetail = () => {

  return (
    <div className="grid">
    <div className="col-12">
      <BreadCrumb />
    </div>

    <div className="col-12">
        <MainCategoryUpdate />
    </div>
  </div>
  );
};
