import { Card } from "primereact/card";
import { BreadCrumb } from 'primereact/breadcrumb';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export const CreatePromotion = () => {

    const breadcrumbs = [
        { label: "Dashboard" , url: "/", current: false },
        { label: "Promotion", url: "/promotion", current: false },
        { label: "Create", url: "/promotion/new", current: true }
    ];

    return(
        <div className="grid">
            <div className="col-12">
                <BreadCrumb model={breadcrumbs} />
            </div>

            <div className="col-12">
                <Card
                    title="Create Promotion"
                >
                    <div className="grid">
                        <div className="col-12 md:col-4 lg:col-4">
                            <div className="p-inputgroup flex-1 mt-5">
                                <InputText 
                                    type="text"
                                    placeholder="Promotion Banner Title"
                                />
                            </div>
                        </div>

                        <div className="col-12 md:col-4 lg:col-4">
                            <div className="p-inputgroup flex-1 mt-5">
                                <InputText 
                                    type="text"
                                    placeholder="Promotion Page URL"
                                />
                            </div>
                        </div>

                        <div className="col-12 md:col-4 lg:col-4">
                            <div className="p-inputgroup flex-1 mt-5">
                                <InputText 
                                    type="file"
                                    placeholder="Promotion Banner Image"
                                />
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="flex flex-row justify-content-end align-items-center">
                                <Button
                                    severity="danger"
                                    label="Create"
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}