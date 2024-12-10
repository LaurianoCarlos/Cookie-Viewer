chrome.runtime.onInstalled.addListener(() => {
    chrome.cookies.getAll({}, (cookies) => {
        const formattedCookies = cookies.map(cookie => ({
            name: cookie.name,
            value: cookie.value,
            domain: cookie.domain,
            path: cookie.path,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
            sameSite: cookie.sameSite || "None",
            expirationDate: cookie.expirationDate || null
        }));
    });
});
