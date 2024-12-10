document.getElementById("getCookies").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const url = currentTab.url;
  
      const domain = new URL(url).hostname;
      chrome.cookies.getAll({ domain }, (cookies) => {
        const formattedCookies = cookies.map(cookie => ({
          name: cookie.name,
          value: cookie.value,
          domain: cookie.domain,
          path: cookie.path,
          expires: cookie.expirationDate || null,
          size: cookie.size || (cookie.name.length + cookie.value.length),
          httpOnly: cookie.httpOnly,
          secure: cookie.secure,
          session: cookie.session,
          sameSite: cookie.sameSite || "None",
          priority: cookie.priority || "Medium",
          sameParty: cookie.sameParty || false,
          sourceScheme: cookie.sourceScheme || "NonSecure"
        }));
  
        document.getElementById("cookieOutput").textContent = JSON.stringify(formattedCookies, null, 2);
      });
    });
  });

  document.getElementById("copyCookies").addEventListener("click", () => {
    const cookieOutput = document.getElementById("cookieOutput").textContent;
    const messageElement = document.getElementById("message");
    if (cookieOutput) {
        navigator.clipboard.writeText(cookieOutput).then(() => {
            messageElement.textContent = "Dados copiados para a área de transferência!";
            messageElement.className = "success";
        }).catch(err => {
            messageElement.textContent = "Erro ao copiar os dados!";
            messageElement.className = "error";
            console.error("Erro ao copiar os dados: ", err);
        });
    } else {
        messageElement.textContent = "Nenhum dado para copiar!";
        messageElement.className = "error";
    }
});
  