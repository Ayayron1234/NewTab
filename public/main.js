import updateDocument from './js/upload.js';
import loadDocuments from "./js/loadDocuments.js";

window.addEventListener("load", async _ => {

    const documents = await loadDocuments();

    const tabs = document.getElementsByClassName("tab");
    const contents = document.getElementsByClassName("content");

    // Hide every content except for one
    for (let i = 0; i < contents.length; i++) {
        let content = contents.item(i);

        // load content from api
        if (documents.find(val => val.id == content.id))
            content.innerHTML = documents.find(val => val.id == content.id).content;

        content.style.display = "none";
    }
    contents[0].style.display = "block";

    // Add necessary event listeners to ".tab"
    for (let i = 0; i < tabs.length; i++) {
        let tab = tabs.item(i);

        tab.addEventListener("click", e => {
            // Add classname: "active" to the instance of .tab the user has clicked, and remove "active" from every other instance.  
            for (let i = 0; i < tabs.length; i++) {
                let tab = tabs.item(i);

                tab.classList.remove("active");
                tab.style.border = "2px solid #464646";
                tab.style.borderBottom = "2px solid #464646";
            }
            e.target.classList.add("active");
            e.target.style.border = "2px solid #464646";
            e.target.style.borderBottom = "2px solid #222222";

            // Switch between instances of ".content". The ones not selected should not be displayed.  
            for (let i = 0; i < contents.length; i++) {
                let content = contents.item(i);

                content.style.display = "none";
            }
            document.querySelector(`#${tab.innerHTML}`).style.display = "block";
        });
    }

    // Add necessary event listeners to ".content"
    for (let i = 0; i < contents.length; i++) {
        let content = contents.item(i);

        content.addEventListener("focus", e => {
            for (let i = 0; i < tabs.length; i++) {
                let tab = tabs.item(i);

                if (tab.classList.contains("active")) {
                    tab.style.border = "2px solid #0268ac";
                    tab.style.borderBottom = "2px solid #222222";
                } else {
                    tab.style.border = "2px solid #464646";
                    tab.style.borderBottom = "2px solid #0268ac";
                }
            }
        });

        content.addEventListener("focusout", e => {
            // update the current document by sending the content to the api
            updateDocument();

            for (let i = 0; i < tabs.length; i++) {
                let tab = tabs.item(i);

                if (tab.classList.contains("active")) {
                    tab.style.border = "2px solid #464646";
                    tab.style.borderBottom = "2px solid #222222";
                } else {
                    tab.style.border = "2px solid #464646";
                    tab.style.borderBottom = "2px solid #464646";
                }
            }
        });
    }
});

window.addEventListener('beforeunload', _ => {
    // update the current document by sending the content to the api
    updateDocument();
});

