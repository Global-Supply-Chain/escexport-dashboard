import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryPayload } from "../categoryPayload";
import { NavigateId } from "../../../shares/NavigateId";
import { paths } from "../../../constants/paths";
import { Status } from "../../../shares/Status";
import { setSubPaginate } from "../categorySlice";
import { Column } from "primereact/column";
import { auditColumns, paginateOptions } from "../../../constants/config";
import { AuditColumn } from "../../../shares/AuditColumn";
import { Search } from "../../../shares/Search";
import { Avatar } from "primereact/avatar";
import { endpoints } from "../../../constants/endpoints";
import { Button } from "primereact/button";
import { PaginatorRight } from "../../../shares/PaginatorRight";
import { useParams } from "react-router-dom";
import { categoryService } from "../categoryService";
import { Card } from "primereact/card";

export const SubCategoryTable = () => {
  const dispatch = useDispatch();
  const urlParams = useParams();

  const { subCategories, subPaginateParams } = useSelector(
    (state) => state.category
  );
  const { translate } = useSelector(state => state.setting);

  const [loading, setLoading] = useState(false);
  const [showAuditColumn, setShowAuditColumn] = useState(false);

  const total = useRef(0);
  const first = useRef(0);
  const columns = useRef(categoryPayload.subCategoryColumns);
  const showColumns = useRef(
    columns.current.filter((col) => col.show === true)
  );

  const loadingData = useCallback(async () => {
    setLoading(true);

    const updatePaginate = {
      ...subPaginateParams,
      filter: "main_category_id,level",
      value: `${urlParams.id},${urlParams.level}`
    }

    await categoryService.subIndex(dispatch, updatePaginate);
    dispatch(setSubPaginate(updatePaginate));
    setLoading(false);
  }, [dispatch, subPaginateParams, urlParams.id, urlParams.level]);

  /**
   * Event - Paginate Page Change
   * @param {*} event
   */
  const onPageChange = (event) => {
    first.current = event.page * subPaginateParams.per_page;
    dispatch(
      setSubPaginate({
        ...subPaginateParams,
        page: event?.page + 1,
        per_page: event?.rows,
      })
    );
  };

  /**
   * Event - Search
   * @param {*} event
   */
  const onSearchChange = (event) => {
    dispatch(
      setSubPaginate({
        ...subPaginateParams,
        search: event,
      })
    );
  };

  /**
   * Event - Column sorting "DESC | ASC"
   * @param {*} event
   */
  const onSort = (event) => {
    const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
    dispatch(
      setSubPaginate({
        ...subPaginateParams,
        sort: sortOrder,
        order: event.sortField,
      })
    );
  };

  /**
   * Render - Table Header
   * @returns
   */
  const HeaderRender = () => {
    return (
      <div className="w-full flex flex-column md:flex-row justify-content-between align-items-start">
        <Search
          tooltipLabel={"Search by id,title,status"}
          placeholder={"Search sub category"}
          onSearch={(e) => onSearchChange(e)}
          label={translate.press_enter_key_to_search}
        />
      </div>
    );
  };

  /** Render - Column Icon Field
   * @returns
   */
  const IconRender = ({ dataSource }) => {
    return (
      <Avatar
        className="category-icon"
        icon="pi pi-image"
        shape="circle"
        image={dataSource ? `${endpoints.image}/${dataSource}` : null}
      />
    );
  };

  /**
   * Render - Paginate Footer
   * @returns
   */
  const FooterRender = () => {
    return (
      <div className=" flex items-center justify-content-between">
        <div>
          {translate.total} -
          <span style={{ color: "#4338CA" }}> {total.current > 0 ? total.current : 0}</span>
        </div>
        <div className=" flex align-items-center gap-3">
          <Button
            outlined
            icon="pi pi-refresh"
            size="small"
            onClick={() => {
              dispatch(setSubPaginate(categoryPayload.subPaginateParams));
            }}
          />

          <div className=" flex align-items-center gap-3">
            <PaginatorRight
              show={showAuditColumn}
              onHandler={(e) => setShowAuditColumn(e)}
              label={translate.audit_columns}
            />
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <Card
      title={translate.sub_category_list}
    >
      <DataTable
        dataKey="id"
        size="normal"
        value={subCategories}
        sortField={subPaginateParams.order}
        sortOrder={
          subPaginateParams.sort === "DESC"
            ? 1
            : subPaginateParams.sort === "ASC"
              ? -1
              : 0
        }
        loading={loading}
        sortMode="single"
        emptyMessage="No main category found."
        globalFilterFields={categoryPayload.subCategoryColumns}
        header={<HeaderRender />}
        footer={<FooterRender />}
        onSort={onSort}
      >
        {showColumns.current.map((col, index) => {
          return (
            <Column
              key={`category_col_index_${index}`}
              style={{ minWidth: "250px" }}
              field={col.field}
              header={col.header}
              sortable={col.sortable}
              body={(value) => {
                switch (col.field) {
                  case "id":
                    return (
                      <NavigateId
                        url={`${paths.category}/${value[col.field]}`}
                        value={value[col.field]}
                      />
                    );
                  case "main_category_name":
                    return (
                      <NavigateId
                        url={`${paths.category}/${urlParams.id}`}
                        value={value[col.field]}
                      />
                    )
                  case "status":
                    return <Status status={value[col.field]} />;
                  case "icon":
                    return <IconRender dataSource={value[col.field]} />;
                  default:
                    return value[col.field];
                }
              }}
            />
          );
        })}

        {showAuditColumn &&
          auditColumns.map((col, index) => {
            return (
              <Column
                key={`audit_column_key_${index}`}
                style={{ minWidth: "250px" }}
                field={col.field}
                header={col.header}
                sortable
                body={(value) => <AuditColumn col={col} value={value} />}
              />
            );
          })}
      </DataTable>
      <Paginator
            first={first.current}
            rows={subPaginateParams.per_page}
            totalRecords={total.current}
            rowsPerPageOptions={paginateOptions.rowsPerPageOptions}
            template={
              "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            }
            currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
            onPageChange={onPageChange}
          />
    </Card>
  );
};
