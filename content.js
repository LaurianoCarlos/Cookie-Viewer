chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getPageInfo") {
      sendResponse({ url: window.location.href });
    }
  });
  