import { BreadCrumb } from "../../../shares/BreadCrumb"
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { Column } from 'primereact/column';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import { paths } from '../../../constants/paths';
import { Search } from '../../../shares/Search';
import { getRequest } from '../../../helpers/api';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import ConfirmDialogButton from '../../../shares/ConfirmDialogButton';
import UserTableView from '../list/UserTableView';


export const UserList = () => {


    const PromotionHeader = () => {
        return (
            <div className='grid px-2'>
                <Search
                    placeholder="Search Promotion"
                    onSearch={(e) => {
                        console.log(e);
                    }}
                />
            </div>
        )
    }

    return (
        <div className="grid">

            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className='col-12'>
                <UserTableView  />
            </div>
        </div>
    )
}