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
import { Status } from "../../../shares/Status";
import { paths } from "../../../constants/paths";
import { Paginator } from "primereact/paginator";
import { Avatar } from "primereact/avatar";
import { NavigateId } from "../../../shares/NavigateId";
import { endpoints } from "../../../constants/endpoints";
import { AuditColumn } from "../../../shares/AuditColumn";
import { setMainPaginate } from "../categorySlice";
import { setDateFilter, setStatusFilter } from "../../../shares/shareSlice";
import { getRequest } from "../../../helpers/api";
import { FilterByStatus } from "../../../shares/FilterByStatus";
import { FilterByDate } from "../../../shares/FilterByDate";
import moment from "moment";
import { Card } from "primereact/card";

export const MainCategoryTable = () => {
  const dispatch = useDispatch();

  const { mainPaginateParams, mainCategories } = useSelector(
    (state) => state.category
  );
  const [loading, setLoading] = useState(false);
  const [showAuditColumn, setShowAuditColumn] = useState(false);

  const total = useRef(0);
  const first = useRef(0);
  const categoryStatus = useRef(['ALL']);
  const columns = useRef(categoryPayload.mainCategoryColumns);
  const showColumns = useRef(
    columns.current.filter((col) => col.show === true)
  );

  /**
   * Event - Paginate Page Change
   * @param {*} event 
   */
  const onPageChange = (event) => {
    first.current = event.page * mainPaginateParams.per_page;
    dispatch(
      setMainPaginate({
        ...mainPaginateParams,
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
      setMainPaginate({
        ...mainPaginateParams,
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
      setMainPaginate({
        ...mainPaginateParams,
        sort: sortOrder,
        order: event.sortField
      })
    );
  }

  /**
    * On Change Filter
    * @param {*} e
    */
  const onFilter = (e) => {
    let updatePaginateParams = { ...mainPaginateParams };

    if (e === "ALL") {
      updatePaginateParams.filter = "";
      updatePaginateParams.value = "";
    } else {
      updatePaginateParams.filter = "status";
      updatePaginateParams.value = e;
    }

    dispatch(setMainPaginate(updatePaginateParams));
    dispatch(setStatusFilter(e));
  };

  const onFilterByDate = (e) => {
    let updatePaginateParams = { ...mainPaginateParams };

    updatePaginateParams.start_date = moment(e.startDate).format('yy-MM-DD');
    updatePaginateParams.end_date = moment(e.endDate).format('yy-MM-DD');

    dispatch(setDateFilter(e));
    dispatch(setMainPaginate(updatePaginateParams));
  };

  /**
   * Initialize loading data
   */
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

  /**
* loading general Status
*/
  const loadingStatus = useCallback(async () => {
    const categoryStatusResponse = await getRequest(
      `${endpoints.status}?type=general`
    );

    if (categoryStatusResponse.status === 200) {
      categoryStatus.current = categoryStatus.current.concat(
        categoryStatusResponse.data.general
      );
    }
  }, []);

  useEffect(() => {
    loadingStatus();
  }, [loadingStatus]);

  /**
   * LifeCycle - watch event change
   */
  useEffect(() => {
    loadingData();
  }, [loadingData]);

  /**
   * Render - Table Header
   * @returns
   */
  const HeaderRender = () => {
    return (
      <div className="w-full flex flex-column md:flex-row justify-content-between md:justify-content-start align-items-start md:align-items-end gap-3">
        <Search
          tooltipLabel={"Search by id,title,status"}
          placeholder={"Search main category"}
          onSearch={(e) => onSearchChange(e)}
        />

        <FilterByStatus
          status={categoryStatus.current}
          onFilter={(e) => onFilter(e)}
        />

        <FilterByDate onFilter={(e) => onFilterByDate(e)} />
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
        <Button
          outlined
          icon="pi pi-refresh"
          size="small"
          onClick={() => {
            dispatch(setMainPaginate(categoryPayload.mainCategoryPaginateParams));
            dispatch(setStatusFilter("ALL"));
            dispatch(setDateFilter({ startDate: "", endDate: "" }));
          }}
        />

        <div className=" flex align-items-center gap-3">
          <PaginatorRight
            show={showAuditColumn}
            onHandler={(e) => setShowAuditColumn(e)}
          />
        </div>
      </div>
    );
  };

  return (
    <Card
      title={'Main Category List'}
      subTitle="Category for sub categories"
    >
      <DataTable
        dataKey="id"
        size="normal"
        value={mainCategories}
        sortField={mainPaginateParams.order}
        sortOrder={mainPaginateParams.sort === 'DESC' ? 1 : mainPaginateParams.sort === "ASC" ? -1 : 0}
        loading={loading}
        sortMode="single"
        emptyMessage="No main category found."
        globalFilterFields={categoryPayload.columns}
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
        rows={mainPaginateParams.per_page}
        totalRecords={total.current}
        rowsPerPageOptions={paginateOptions.rowsPerPageOptions}
        template={"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"}
        currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
        onPageChange={onPageChange}
      />
    </Card>
  );
};
