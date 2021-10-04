import ColorPicker from "../components/ColorPicker/colorPicker.js";

var state = "";

window.addEventListener("load", e => {

    const toolbar = document.getElementsByClassName("toolbar").item(0);
    toolbar.classList.add("center");
    const contents = document.getElementsByClassName("content");

    // ---------------------------------- Font Color ----------------------------------
    const fontColor = document.getElementsByClassName("font-color").item(0);
    for (let i = 0; i < contents.length; i++) {
        let content = contents[i];

        content.addEventListener("click", e => {
            showCorrectFontColor();
        });
        content.addEventListener("selectionchange", e => {
            showCorrectFontColor();
        });
    }
    fontColor.addEventListener("mousedown", e => {
        e.preventDefault();
        toolbar.classList.toggle("shift-left");

        ColorPicker.storeColor(fontColor.style.background);
        ColorPicker.setColor = (color) => {
            formatDoc('forecolor', color);
        }
    });
    document.getElementsByClassName("right-section").item(0).addEventListener("mouseleave", e => {
        let interval;
        if (ColorPicker.isDragging == false)
            toolbar.classList.remove("shift-left");
        else
            interval = setInterval(() => {
                if (ColorPicker.isDragging == false) {
                    toolbar.classList.remove("shift-left");
                    clearInterval(interval);
                }
            }, 10);
    });
    async function showCorrectFontColor() {
        setTimeout(() => {
            let selection = document.getSelection();
            let node = selection.anchorNode;
            let fontColorOfselectedNode;

            while (node.nodeType !== 9 && !fontColorOfselectedNode) {
                if (node.style && node.style.color)
                    fontColorOfselectedNode = node.style.color;
                else if (node.color)
                    fontColorOfselectedNode = node.color;
                node = node.parentNode;
            }

            if (!fontColorOfselectedNode)
                fontColorOfselectedNode = "#d4d4d4";

            fontColor.style.background = fontColorOfselectedNode;
            // ColorPicker.storeColor(fontColorOfselectedNode);
        }, 10);
    }
    // --------------------------------------------------------------------------------

});