import React, { useCallback, useEffect, useState } from 'react'
import { dashboardService } from '../dashboardService';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from "primereact/divider"

export const DashboardList = () => {

  const [loading, setLoading] = useState(false);

  const dashboard = useSelector((state) => state.dashboard)
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
            <h2 className=' text-black font-bold'>Order Statics</h2>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>Order</h2>
                </div>
                <div className=' count-status count-total'>
                  Total
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.order?.total}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view total flex align-items-center justify-content-center'>
              View More
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>Order</h2>
                </div>
                <div className=' count-status count-verified'>
                  Verified
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.order?.verified}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view verified flex align-items-center justify-content-center'>
              View More
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>Order</h2>
                </div>
                <div className=' count-status count-pending'>
                  Pending
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.order?.pending}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view pending flex align-items-center justify-content-center'>
              View More
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>Order</h2>
                </div>
                <div className=' count-status count-delivery'>
                  Delivery
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.order?.delivery}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view delivery flex align-items-center justify-content-center'>
              View More
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>Order</h2>
                </div>
                <div className=' count-status count-complete'>
                  Complete
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.order?.complete}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view complete flex align-items-center justify-content-center'>
              View More
            </div>
          </div>
        </div>

      </div>

      <div className=' grid mt-5'>

        <div className=' col-12'>
            <h2 className=' text-black font-bold'>Item Statics</h2>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>Item</h2>
                </div>
                <div className=' count-status count-delivery'>
                  Total
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.item?.total}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view delivery flex align-items-center justify-content-center'>
              View More
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>Item</h2>
                </div>
                <div className=' count-status count-complete'>
                  Active
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.item?.active}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view complete flex align-items-center justify-content-center'>
              View More
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>Item</h2>
                </div>
                <div className=' count-status count-disable'>
                  Disable
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.item?.disable}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view disable flex align-items-center justify-content-center'>
              View More
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>Item</h2>
                </div>
                <div className=' count-status count-total'>
                  Delete
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.item?.deleted}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view total flex align-items-center justify-content-center'>
              View More
            </div>
          </div>
        </div>

      </div>

      <div className=' grid mt-5'>

        <div className=' col-12'>
            <h2 className=' text-black font-bold'>User Statics</h2>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>User</h2>
                </div>
                <div className=' count-status count-verified'>
                  Total
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.user?.total}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view verified flex align-items-center justify-content-center'>
              View More
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>User</h2>
                </div>
                <div className=' count-status count-complete'>
                  Active
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.user?.active}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view complete flex align-items-center justify-content-center'>
              View More
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold text-gray'>User</h2>
                </div>
                <div className=' count-status count-pending'>
                  Pending
                </div>
              </div>
              <div className=' mt-3 text-gray flex align-items-center justiry-content-start gap-5'>
                <i className=' pi pi-shopping-cart' style={{ fontSize: "3rem" }}></i>
                <div style={{ fontSize: "2.5rem" }}>{dashboard?.count?.user?.pending}</div>
              </div>
            </div>
            <div className=' mt-2 h-40 count-view pending flex align-items-center justify-content-center'>
              View More
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
