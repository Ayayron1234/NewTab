import updateDocument from './js/upload.js';
import loadDocuments from "./js/loadDocuments.js";

window.addEventListener("load", async _ => {

    const documents = await loadDocuments();

    const tabs = document.getElementsByClassName("tab");
    const documentContainers = document.getElementsByClassName("content");

    // Hide every content except for one
    for (let i = 0; i < documentContainers.length; i++) {
        let content = documentContainers.item(i);

        // load content from api
        if (documents.find(val => val.id == content.id))
            content.innerHTML = documents.find(val => val.id == content.id).content;

        content.style.display = "none";
    }
    documentContainers[0].style.display = "block";

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
            for (let i = 0; i < documentContainers.length; i++) {
                let content = documentContainers.item(i);

                content.style.display = "none";
            }
            document.querySelector(`#${tab.innerHTML}`).style.display = "block";
        });
    }

    // Add necessary event listeners to ".content"
    for (let i = 0; i < documentContainers.length; i++) {
        let content = documentContainers.item(i);

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

    // use tab key for space when focuse is inside of document
    window.addEventListener("keydown", e => {
        for (let i = 0; i < documentContainers.length; i++) {
            if (e.key === "Tab" && documentContainers[i].contains(document.activeElement)) {
                e.preventDefault()

                var sel, range;
                if (window.getSelection) {
                    // get selection
                    sel = window.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {
                        // get selection range
                        range = sel.getRangeAt(0);

                        // check if the length of the range is 0 (there is nothing selected)
                        if (Math.abs(range.startOffset - range.endOffset) == 0 && range.startContainer == range.endContainer) {
                            // create a html element: <font class="\n">   </font>
                            let tab = document.createElement("font");
                            let newNode = document.createTextNode(`\xa0\xa0\xa0\xa0`);
                            tab.className = "\\t";
                            tab.appendChild(newNode);

                            if ((range.startContainer.parentElement && range.startContainer.parentElement.classList && range.startContainer.parentElement.classList.contains("\\t")
                                || (range.startContainer.classList && range.startContainer.classList.contains("\\t")))) {
                                sel.setPosition(range.startContainer);
                                console.log(range.startContainer)
                                range.startContainer.parentElement.parentElement.insertBefore(tab, range.startContainer.parentElement);
                            } else {
                                range.insertNode(tab);
                            }
                            range.setStartAfter(tab);
                        }
                    }
                } else if (document.selection && document.selection.createRange) {
                    document.selection.createRange().text = `\xa0\xa0\xa0`;
                }

            }
            if (e.key === "Backspace" && documentContainers[i].contains(document.activeElement)) {
                // get selection and range
                let selection = window.getSelection(),
                    range = selection.getRangeAt(0);

                // only change behaviour if the selection range is 0
                if (Math.abs(range.startOffset - range.endOffset) == 0 && range.startContainer == range.endContainer) {
                    // TODO: remove \t element when backspace is pressed

                    // e.preventDefault();
                }
            }
        }
    })
});

window.addEventListener('beforeunload', _ => {
    // update the current document by sending the content to the api
    updateDocument();
});

