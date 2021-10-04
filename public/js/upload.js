import getActiveTab from "./getActiveTab.js";

export default async function updateDocument() {
    // get the currently active tab
    //      return type is HTMLELement
    let content = getActiveTab();

    // send post request to the api
    let response = await fetch(`/documents/${content.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "content": content.innerHTML }) // body data type must match "Content-Type" header
    });
    // get json from response
    let responseJSON = await response.json();

    // log the response to the console
    console.log(responseJSON);
}
