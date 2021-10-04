export default function getActiveTab() {
    const tabs = document.getElementsByClassName("tab");

    for (let i = 0; i < tabs.length; i++) {
        if (tabs.item(i).classList.contains("active"))
            return document.getElementById(tabs.item(i).innerHTML);
    }
}