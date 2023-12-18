import { useLoaderData, useNavigate } from "react-router-dom"

export const BreadCrumb = () => {
    const { breadcrumbs } = useLoaderData();

    const navigate = useNavigate();
    
    return(
        <div className="breadcrumbs-card">
            <div className="breadcrumbs"> 
                { breadcrumbs && breadcrumbs.map((item, index) => {
                    return(
                        <div 
                            className="breadcrumb-item" 
                            key={`breadcrumb_${index}`}
                            onClick={() => navigate(item.url)}
                        >
                            <i className="pi pi-chevron-right"></i>
                            <span> { item.label } </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}