class Background {
    constructor() {
        this.init();
    }
    async incrementTotalBlockedAds() {
        const totalBlocked = (await chrome.storage.local.get(['totalBlocked'])).totalBlocked ?? 0;
        await chrome.storage.local.set({ totalBlocked: totalBlocked + 1 });
    }
    init() {
        chrome.runtime.onMessage.addListener(async (request) => {
            if (request.action === 'increment') {
                this.incrementTotalBlockedAds();
            }
        });
    }
}
new Background();