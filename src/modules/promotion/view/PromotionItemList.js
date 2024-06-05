import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useCallback, useEffect, useState } from "react";
import { delRequest, getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../../shares/shareSlice";

const promotionInItemPayload = {
  columns: [
    { field: "item_name", header: "Item Name", sortable: true, show: true, width: 100 },
  ],
};

export const PromotionItemList = ({ id, status }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [promotionInItemLists, setPromotionInItemLists] = useState([]);

  // Confirm alert init
  const accept = async (props) => {
    const { id } = props;

    try {
      const response = await delRequest(`${endpoints.promotion}/${id}/item`);
      if (response.status === 200) {

        getPromotionInItem();
        dispatch(updateNotification({
          show: true,
          summary: "Success",
          severity: "success",
          detail: 'Success to delete this record'
        }));
      }
    } catch (error) {
      console.error('Promotion In item delete error', error);
    }
  };

  const confirm = (props) => {
    const { id } = props;
    confirmDialog({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      defaultfocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => accept({id : id}),
    });
  };

  const getPromotionInItem = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getRequest(`${endpoints.promotion}/${id}/item`);
      if (response.status === 200) {
        setLoading(false);
        setPromotionInItemLists(response.data);
      }
    } catch (error) {
      console.error('Promotion in item fetch fail error', error);
    }
  }, [id]);

  useEffect(() => {
    getPromotionInItem();
  }, [getPromotionInItem, status]);

  const actionBodyTemplate = (product) => {
    return (
      <div className="flex align-items-center justify-content-start">
        <i onClick={() => confirm({ id: product.id })} className="pi pi-trash" style={{ color: '#EA2B4A', cursor: 'pointer' }}></i>
      </div>
    );
  };

  return (
    <div>
      <ConfirmDialog />
      <DataTable
        dataKey="id"
        size="normal"
        value={promotionInItemLists}
        loading={loading}
        emptyMessage="No promotion item found."
        globalFilterFields={promotionInItemPayload.columns}
      >
        <Column field="item_name" header="Item Name"></Column>
        <Column field="action" header="Action" body={actionBodyTemplate}></Column>
      </DataTable>
    </div>
  );
};
