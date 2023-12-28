import React, { useCallback, useEffect, useState } from 'react'
import { dashboardService } from '../dashboardService';
import { useDispatch, useSelector } from 'react-redux';

export const DashboardList = () => {

  const [loading, setLoading] = useState(false);

  const dashboard = useSelector((state) => state.dashboard);
  const { translate } = useSelector(state => state.setting);
  const dispatch = useDispatch()

  const loadingCountStatus = useCallback(async () => {
    setLoading(true);
    await dashboardService.countIndex(dispatch);
    setLoading(false)
  }, [dispatch])

  useEffect(() => {
    loadingCountStatus()
  }, [loadingCountStatus])


  return (
    <div className=' p-5'>

      <div className=' grid'>

        <div className=' col-12'>
            <h2 className=' text-black font-bold'>{translate.order_statics}</h2>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.order}</h2>
                </div>
                <div className=' count-status count-total'>
                  {translate.total}
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.order?.total}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view total flex align-items-center justify-content-center'>
              {translate.view_more}
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.order}</h2>
                </div>
                <div className=' count-status count-verified'>
                  {translate.verified}
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.order?.verified}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view verified flex align-items-center justify-content-center'>
              {translate.view_more}
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.order}</h2>
                </div>
                <div className=' count-status count-pending'>
                  {translate.pending}
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.order?.pending}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view pending flex align-items-center justify-content-center'>
              {translate.view_more}
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.order}</h2>
                </div>
                <div className=' count-status count-delivery'>
                  {translate.delivery}
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.order?.delivery}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view delivery flex align-items-center justify-content-center'>
              {translate.view_more}
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.order}</h2>
                </div>
                <div className=' count-status count-complete'>
                  {translate.complete}
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.order?.complete}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view complete flex align-items-center justify-content-center'>
              {translate.view_more}
            </div>
          </div>
        </div>

      </div>

      <div className=' grid mt-5'>

        <div className=' col-12'>
            <h2 className=' text-black font-bold'>{translate.item_statics}</h2>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.item}</h2>
                </div>
                <div className=' count-status count-delivery'>
                  {translate.total}
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.item?.total}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view delivery flex align-items-center justify-content-center'>
              {translate.view_more}
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.item}</h2>
                </div>
                <div className=' count-status count-complete'>
                  {translate.active}
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.item?.active}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view complete flex align-items-center justify-content-center'>
              {translate.view_more}
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.item}</h2>
                </div>
                <div className=' count-status count-disable'>
                  {translate.disable}
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.item?.disable}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view disable flex align-items-center justify-content-center'>
              {translate.view_more}
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.item}</h2>
                </div>
                <div className=' count-status count-total'>
                  {translate.delete}
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.item?.deleted}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view total flex align-items-center justify-content-center'>
              {translate.view_more}
            </div>
          </div>
        </div>

      </div>

      <div className=' grid mt-5'>

        <div className=' col-12'>
            <h2 className=' text-black font-bold'>{translate.user_statics}</h2>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.user}</h2>
                </div>
                <div className=' count-status count-verified'>
                  {translate.total}
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.user?.total}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view verified flex align-items-center justify-content-center'>
              {translate.view_more}
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.user}</h2>
                </div>
                <div className=' count-status count-complete'>
                  {translate.active}
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.user?.active}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view complete flex align-items-center justify-content-center'>
              {translate.view_more}
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>{translate.user}</h2>
                </div>
                <div className=' count-status count-pending'>
                  {translate.pending}
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.user?.pending}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view pending flex align-items-center justify-content-center'>
              {translate.view_more}
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
