class PopupManager {
    constructor() {
        this.enableExtensionCheckbox = document.getElementById('enableExtension');
        this.reloadPageButton = document.getElementById('reloadPage');
        this.init();
    }
    init() {
        chrome.storage.sync.get(['extensionEnabled'], result => {
            this.enableExtensionCheckbox.checked = result.extensionEnabled || false;
        });
        this.enableExtensionCheckbox.addEventListener('change', () => {
            chrome.storage.sync.set({ 'extensionEnabled': this.enableExtensionCheckbox.checked }, () => {
                chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                    chrome.tabs.reload(tabs[0].id);
                });
            });
        });
        this.reloadPageButton.addEventListener('click', () => {
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                chrome.tabs.reload(tabs[0].id);
            });
        });
    }
}
document.addEventListener('DOMContentLoaded', () => new PopupManager());