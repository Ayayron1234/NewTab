export default async function () {
    // query the names of documents from the api
    //      the response format is: ["name1", "name2"]
    const documentNames = await (await fetch("./documents/")).json();

    // get the content of each document
    //      respons format is: {conent: "<x>document content</x>", id: "document name"}
    const documents = [];
    for (let i = 0; i < documentNames.length; i++) {
        documents.push({ content: await (await fetch(`./documents/${documentNames[i]}`)).text(), id: documentNames[i] });
    }

    return documents;
}
