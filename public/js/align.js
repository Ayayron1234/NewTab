window.addEventListener("load", loadEvent => {

    const fontAlignButtons = document.getElementsByClassName("font-align-button");
    const alignments = ["left", "center", "right"];

    for (let i = 0; i < fontAlignButtons.length; i++) {
        let fontAlignButton = fontAlignButtons[i];

        fontAlignButton.addEventListener("click", e => {

            // if (window.getSelection) {
            //     sel = window.getSelection();
            //     if (sel.getRangeAt && sel.rangeCount) {
            //         range = sel.getRangeAt(0);
            //         sel.
            //             range.deleteContents();
            //         range.insertNode(document.createTextNode(text));
            //     }
            // } else if (document.selection && document.selection.createRange) {
            //     document.selection.createRange().text = text;
            // }
        });
    }

    const contents = document.getElementsByClassName("content");
    for (let i = 0; i < contents.length; i++) {
        let content = contents[i];

        content.addEventListener("click", e => {
            showCorrectAlignButton();
        });
        content.addEventListener("focus", e => {
            showCorrectAlignButton();
        });
    }

});

async function showCorrectAlignButton() {
    setTimeout(() => {
        let selection = document.getSelection();
        let node = selection.anchorNode;
        let alignmentOfselectedNode;

        while (node.nodeType !== 9 && !alignmentOfselectedNode) {
            if (node.style && node.style.textAlign)
                alignmentOfselectedNode = node.style.textAlign;
            node = node.parentNode;
        }

        if (!alignmentOfselectedNode)
            alignmentOfselectedNode = "left";

        const fontAlignButtons = document.getElementsByClassName("font-align-button");

        for (let i = 0; i < fontAlignButtons.length; i++) {
            let fontAlignButton = fontAlignButtons[i];

            if (fontAlignButton.classList.contains(alignmentOfselectedNode)) {
                fontAlignButton.classList.add("active");
            } else {
                fontAlignButton.classList.remove("active");
            }
        }
    }, 10);
}