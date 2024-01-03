import { Button } from "primereact/button";
import { keys } from "../constants/config";
import { baseURL } from "../constants/endpoints";
import { getData } from "./localstorage";


export const ExportExcel = ({url}) => {

    const handleExport = async () => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        try {
            const response = await fetch(baseURL +'/'+ url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Adjust the content type if needed
                    'authorization': `Bearer ${getData(keys.API_TOKEN)}`,
                    'Content-Disposition': 'attachment; filename=exportedFile.xlsx',
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    // Add any other headers if necessary
                },
                // Add body if you need to send data in the request payload
                // body: JSON.stringify({ key: 'value' }),
            });

            // Check if the request was successful (status code 2xx)
            if (response.ok) {
                // Check if the response has a valid content type for an Excel file
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
                    // Start the download if the response has a valid body
                    const blob = await response.arrayBuffer();
                    const url = URL.createObjectURL(new Blob([blob], { type: contentType }));
                    iframe.src = url;

                    // Cleanup the iframe after download
                    setTimeout(() => {
                        document.body.removeChild(iframe);
                        URL.revokeObjectURL(url);
                    }, 5000); // Adjust the timeout as needed
                } else {
                    console.error('Invalid content type for file download:', contentType);
                }
            } else {
                // Handle the case when the request was not successful
                console.error('Failed to export data:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred during the export:', error);
        }
    }

    return (
        <Button
            outlined
            icon="pi pi-cloud-download"
            size='small'
            onClick={handleExport}
        />
    )
}