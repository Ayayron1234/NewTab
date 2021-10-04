/**
 * target: HTMLElement
 * storedColor: hex color
 * currentColor: hex color
 * setColor(setter: (hex color) => void): void
 */
var ColorPicker = {
    storedColor: "#ffffff",
    currentColor: "#ffffff",
    container: null,
    isDragging: false,
    storeColor: null,
    setColor: () => null
}

window.addEventListener("load", _ => {
    var HUE = 0;
    var SATURATION = 24;
    var LIGHT = 41;
    let dragging = "";
    // -----------------------------------------------------------

    // -----------------------------------------------------------
    const hue = document.getElementsByClassName("hue").item(0);
    const huePointer = document.getElementsByClassName("pointer").item(1);
    // -----------------------------------------------------------

    // -----------------------------------------------------------
    const palett = document.getElementsByClassName("palett").item(0);
    const palettPointer = document.getElementsByClassName("pointer").item(0);
    const bg3 = document.getElementsByClassName("bg3").item(0);
    const current = document.getElementsByClassName("current").item(0)
    const previous = document.getElementsByClassName("previous").item(0);
    //const c1 = document.querySelector(".c1");
    // -----------------------------------------------------------

    // -----------------------------------------------------------
    window.addEventListener("mousemove", e => {
        if (dragging != "") {
            calculateH(e);
            calculateSL(e);
            updateColors();
        }
    });
    document.addEventListener("mouseup", e => {
        if (dragging != "")
            showSelection();

        dragging = "";
        ColorPicker.isDragging = false;
    });

    function updateColors(udateTarget = true) {
        let hslHex = HSLToHex(HUE, SATURATION, LIGHT),
            hHex = HSLToHex(HUE, 100, 50);

        ColorPicker.currentColor = hslHex;
        if (udateTarget)
            ColorPicker.setColor(hslHex);

        if (bg3 && current && huePointer && palettPointer) {
            bg3.style.background = hHex;
            current.style.background = hslHex;
            huePointer.style.background = hHex;
            palettPointer.style.background = hslHex;
        }
    }
    updateColors();

    function HSLToHex(h, s, l) {
        s /= 100;
        l /= 100;

        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c / 2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }
        // Having obtained RGB, convert channels to hex
        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);

        // Prepend 0s, if necessary
        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;

        return "#" + r + g + b;
    }
    function hexToHSL(H) {
        // Convert hex to RGB first
        let r = 0, g = 0, b = 0;
        if (H.length == 4) {
            r = "0x" + H[1] + H[1];
            g = "0x" + H[2] + H[2];
            b = "0x" + H[3] + H[3];
        } else if (H.length == 7) {
            r = "0x" + H[1] + H[2];
            g = "0x" + H[3] + H[4];
            b = "0x" + H[5] + H[6];
        }
        // Then to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        if (delta == 0)
            h = 0;
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            h = (b - r) / delta + 2;
        else
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        if (h < 0)
            h += 360;

        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return "hsl(" + h + "," + s + "%," + l + "%)";
    }

    function RGBToHex(r, g, b) {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;

        return "#" + r + g + b;
    }

    function storeColor(color) {
        if (color.split("")[0] == "#") {
            [HUE, SATURATION, LIGHT] = [...hexToHSL(color).split(",").map((n, i) => (i == 0) ? parseFloat(n.split("(")[1]) : parseFloat(n))];
            ColorPicker.storedColor = color;
        }
        if (color.split("(")[0] == "rgb" || color.split("(")[0] == " rgb") {
            [HUE, SATURATION, LIGHT] = [...hexToHSL(RGBToHex(...color.split("(")[1].split(",").map(n => parseFloat(n)))).split(",").map((n, i) => (i == 0) ? parseFloat(n.split("(")[1]) : parseFloat(n))];
            ColorPicker.storedColor = color;
        }
        palettPointer.style.left = `${(SATURATION / 100) * palett.offsetWidth - palettPointer.offsetWidth / 2}px`;
        palettPointer.style.top = `${palett.offsetHeight - ((LIGHT / 100) * palett.offsetHeight * (SATURATION / 100 + 1)) - palettPointer.offsetWidth / 2}px`;

        huePointer.style.left = `${(HUE / 360) * hue.offsetWidth - huePointer.offsetWidth / 2}px`;
        previous.style.background = ColorPicker.storedColor;
        updateColors(false);
    }
    ColorPicker.storeColor = storeColor;

    function hideSelections() {
        let stylesheet = document.styleSheets.item(0);
        stylesheet.insertRule('*::selection {background: #109fff28}', 0);
    }

    function showSelection() {
        let stylesheet = document.styleSheets.item(0);
        stylesheet.removeRule(0);
    }
    // -----------------------------------------------------------

    // -----------------------------------------------------------
    previous.addEventListener("mousedown", e => {
        e.preventDefault();

        ColorPicker.currentColor = ColorPicker.storedColor;
        storeColor(ColorPicker.storedColor);
        updateColors(ColorPicker.storeColor);
    });
    // -----------------------------------------------------------

    // -----------------------------------------------------------
    hue.addEventListener("mousedown", e => {
        e.preventDefault();

        hideSelections();

        dragging = "hue";
        ColorPicker.isDragging = true;
        calculateH(e);
        updateColors();
    });

    function calculateH(e) {
        let X;
        if (dragging == "hue"
            && (e.clientX > window.scrollX + hue.getBoundingClientRect().left &&
                e.clientX < window.scrollX + hue.getBoundingClientRect().left + palett.offsetWidth)) {
            let X;
            X = e.clientX - (window.scrollX + hue.getBoundingClientRect().left) - huePointer.offsetWidth / 2;
            huePointer.style.left = `${X}px`;
        }
        X = (((window.scrollX + huePointer.getBoundingClientRect().left) - (window.scrollX + hue.getBoundingClientRect().left) + huePointer.offsetWidth / 2) / hue.offsetWidth) * 360;
        HUE = X;
    }
    // -----------------------------------------------------------

    // -----------------------------------------------------------
    if (palett)
        palett.addEventListener("mousedown", e => {
            e.preventDefault();

            hideSelections();

            dragging = "palett";
            ColorPicker.isDragging = true;
            calculateSL(e);
            updateColors();
        });

    function calculateSL(e) {
        let X, Y;
        if (dragging == "palett") {
            if (e.clientX > window.scrollX + palett.getBoundingClientRect().left &&
                e.clientX < window.scrollX + palett.getBoundingClientRect().left + palett.offsetWidth) {
                let X;
                X = e.clientX - (window.scrollX + palett.getBoundingClientRect().left) - palettPointer.offsetWidth / 2;
                palettPointer.style.left = `${X}px`;
            } else if (e.clientX > window.scrollX + palett.getBoundingClientRect().left) {
                let X;
                X = palett.offsetWidth - palettPointer.offsetWidth / 2;
                palettPointer.style.left = `${X}px`;
            } else if (e.clientX < window.scrollX + palett.getBoundingClientRect().left + palett.offsetWidth) {
                let X;
                X = - palettPointer.offsetWidth / 2;
                palettPointer.style.left = `${X}px`;
            }

            if (e.clientY > window.scrollY + palett.getBoundingClientRect().top &&
                e.clientY < window.scrollY + palett.getBoundingClientRect().top + palett.offsetHeight) {
                let Y;
                Y = e.clientY - (window.scrollY + palett.getBoundingClientRect().top) - palettPointer.offsetHeight / 2;
                palettPointer.style.top = `${Y}px`;
            } else if (e.clientY > window.scrollY + palett.getBoundingClientRect().top) {
                let Y;
                Y = palett.offsetHeight - palettPointer.offsetHeight / 2;
                palettPointer.style.top = `${Y}px`;
            } else if (e.clientY < window.scrollY + palett.getBoundingClientRect().top + palett.offsetHeight) {
                let Y;
                Y = - palettPointer.offsetHeight / 2;
                palettPointer.style.top = `${Y}px`;
            }

            [X, Y] = [
                (((window.scrollX + palettPointer.getBoundingClientRect().left) - (window.scrollX + palett.getBoundingClientRect().left) + palettPointer.offsetWidth / 2) / palett.offsetWidth) * 100,
                (((window.scrollY + palettPointer.getBoundingClientRect().top) - (window.scrollY + palett.getBoundingClientRect().top) + palettPointer.offsetHeight / 2) / palett.offsetHeight) * 100
            ];
            SATURATION = X;
            LIGHT = ((100 - Y) / 2) * ((100 - X) / 100 + 1);
        }
    }
});

export default ColorPicker;
