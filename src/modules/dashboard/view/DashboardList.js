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

  console.log(dashboard);

  return (
    <div className=' p-5'>

      <div className=' grid'>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card order'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold '>Order</h2>
                  <h4>{dashboard?.count?.order?.total}</h4>
                </div>
                <div className='count-icon order'>
                  <i className=' pi pi-shopping-cart' style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card status order'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold '>Verified</h2>
                  <h4>{dashboard?.count?.order?.verified}</h4>
                </div>
                <div className='count-icon status order'>
                  <i className=' pi pi-percentage' style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card status order'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold '>Pending</h2>
                  <h4>{dashboard?.count?.order?.pending}</h4>
                </div>
                <div className='count-icon status order'>
                  <i className=' pi pi-percentage' style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card status order'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold '>Delivery</h2>
                  <h4>{dashboard?.count?.order?.delivery}</h4>
                </div>
                <div className='count-icon status order'>
                  <i className=' pi pi-percentage' style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card status order'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold '>Complete</h2>
                  <h4>{dashboard?.count?.order?.complete}</h4>
                </div>
                <div className='count-icon status order'>
                  <i className=' pi pi-percentage' style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className=' grid mt-5'>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card item'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold '>Item</h2>
                  <h4>{dashboard?.count?.item?.total}</h4>
                </div>
                <div className='count-icon item'>
                  <i className=' pi pi-fw pi-inbox' style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card status item'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold '>Active</h2>
                  <h4>{dashboard?.count?.item?.active}</h4>
                </div>
                <div className='count-icon status item'>
                  <i className=' pi pi-percentage' style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card status item'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold '>Disable</h2>
                  <h4>{dashboard?.count?.item?.disable}</h4>
                </div>
                <div className='count-icon status item'>
                  <i className=' pi pi-percentage' style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card status item'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold '>Deleted</h2>
                  <h4>{dashboard?.count?.item?.deleted}</h4>
                </div>
                <div className='count-icon status item'>
                  <i className=' pi pi-percentage' style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className=' grid mt-5'>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card user'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold '>User</h2>
                  <h4>{dashboard?.count?.user?.total}</h4>
                </div>
                <div className='count-icon user'>
                  <i className=' pi pi-fw pi-user' style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card status user'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold '>Active</h2>
                  <h4>{dashboard?.count?.user?.active}</h4>
                </div>
                <div className='count-icon status user'>
                  <i className=' pi pi-fw pi-percentage' style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=' col-12 md:col-6 lg:col-3 flex justify-content-center'>
          <div className=' count-card status user'>
            <div className=' p-3'>
              <div className=' flex align-items-center justify-content-between'>
                <div>
                  <h2 className=' font-bold '>Pending</h2>
                  <h4>{dashboard?.count?.user?.pending}</h4>
                </div>
                <div className='count-icon status user'>
                  <i className=' pi pi-fw pi-percentage' style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
