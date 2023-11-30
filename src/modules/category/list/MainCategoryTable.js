import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryPayload } from "../categoryPayload";
import { categoryService } from "../categoryService";
import { Search } from "../../../shares/Search";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { auditColumns, paginateOptions } from "../../../constants/config";
import { PaginatorRight } from "../../../shares/PaginatorRight";
import { Column } from "primereact/column";
import { datetime } from "../../../helpers/datetime";
import { Status } from "../../../shares/Status";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { Paginator } from "primereact/paginator";
import { setPaginate } from "../categorySlice";
import { Avatar } from "primereact/avatar";
import { endpoints } from "../../../constants/endpoints";

export const MainCategoryTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mainPaginateParams, mainCategories } = useSelector(
    (state) => state.category
  );
  const [loading, setLoading] = useState(false);
  const [showAuditColumn, setShowAuditColumn] = useState(false);

  const total = useRef(0);
  const columns = useRef(categoryPayload.mainCategoryColumns);
  const showColumns = useRef(
    columns.current.filter((col) => col.show === true)
  );

  const onPageChange = (event) => {
    dispatch(
      setPaginate({
        ...mainPaginateParams,
        page: event?.page + 1,
        per_page: event?.rows,
      })
    );
  };

  const onSearchChange = (event) => {
    dispatch(
      setPaginate({
        ...mainPaginateParams,
        search: event,
      })
    );
  };

  const loadingData = useCallback(async () => {
    setLoading(true);
    const result = await categoryService.mainIndex(
      dispatch,
      mainPaginateParams
    );
    if (result.status === 200) {
      total.current = result.data.total
        ? result.data.total
        : result.data.length;
    }
    setLoading(false);
  }, [dispatch, mainPaginateParams]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  const FooterRender = () => {
    return (
      <div className=" flex items-center justify-content-between">
        <div>
          Total -{" "}
          <span style={{ color: "#4338CA" }}>{total ? total.current : 0}</span>
        </div>
        <div className=" flex align-items-center gap-3">
          <Button
            outlined
            icon="pi pi-refresh"
            size="small"
            onClick={() => loadingData()}
          />
          <PaginatorRight
            show={showAuditColumn}
            onHandler={(e) => setShowAuditColumn(e)}
          />
        </div>
      </div>
    );
  };

  /**
   * Table Header Render
   */
  const HeaderRender = () => {
    return (
      <div className="w-full flex flex-column md:flex-row justify-content-between align-items-start">
        <Search
          tooltipLabel={"Search by id,title,status"}
          placeholder={"Search main category"}
          onSearch={(e) => onSearchChange(e)}
        />
      </div>
    );
  };

  const IconRender = ({ dataSource }) => {
    return (
      <Avatar
        className="category-icon"
        icon="pi pi-user"
        shape="circle"
        image={dataSource ? `${endpoints.image}/${dataSource}` : null}
      />
    );
  };

  return (
    <>
      <DataTable
        dataKey="id"
        size="normal"
        value={mainCategories}
        sortField={mainPaginateParams.order ? mainPaginateParams.order : ""}
        sortOrder={mainPaginateParams.sort ? mainPaginateParams.sort : 1}
        loading={loading}
        emptyMessage="No category found."
        globalFilterFields={categoryPayload.columns}
        header={<HeaderRender />}
        footer={<FooterRender />}
      >
        {showColumns.current.map((col, index) => {
          return (
            <Column
              key={`category_col_index_${index}`}
              style={{ minWidth: "250px" }}
              field={col.field}
              header={col.header}
              sortable
              body={(value) => {
                if (col.field === "status") {
                  return <Status status={value[col.field]} />;
                }

                if (col.field === "icon") {
                  return <IconRender dataSource={value[col.field]} />;
                }

                if (col.field === "id") {
                  return (
                    <label
                      className="nav-link"
                      onClick={() =>
                        navigate(`${paths.mainCategory}/${value[col.field]}`)
                      }
                    >
                      {value[col.field]}
                    </label>
                  );
                }
                return value[col.field];
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
                body={(value) => {
                  if (
                    col.field === "created_at" ||
                    col.field === "updated_at" ||
                    col.field === "deleted_at"
                  ) {
                    return <label> {datetime.long(value[col.field])} </label>;
                  } else {
                    return (
                      <label>
                        {" "}
                        {value[col.field] && value[col.field].name}{" "}
                      </label>
                    );
                  }
                }}
              />
            );
          })}
      </DataTable>

      <Paginator
        first={mainPaginateParams.per_page}
        rows={mainPaginateParams.per_page}
        totalRecords={total?.current}
        rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
        onPageChange={onPageChange}
      />
    </>
  );
};
