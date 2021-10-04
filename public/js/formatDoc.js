function formatDoc(sCmd, sValue) {
    let activeTab;
    let tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].classList.contains("active"))
            activeTab = document.getElementById(tabs[i].innerHTML);
    }

    document.execCommand(sCmd, false, sValue); activeTab.focus();
}
