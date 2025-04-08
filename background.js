chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "updateBadge") {
    const tabId = sender.tab?.id;
    if (!tabId) return;

    chrome.action.setBadgeText({
      tabId: tabId,
      text: message.count.toString()
    });

    chrome.action.setBadgeBackgroundColor({
      tabId: tabId,
      color: message.count > 0 ? '#d93025' : '#34a853'
    });

    const tooltip = message.detail.slice(0, 10).map(i => `${i.url} (${i.reason})`).join('\n')
      + (message.detail.length > 10 ? '\n...more' : '');

    chrome.action.setTitle({
      tabId: tabId,
      title: tooltip || 'No broken images detected.'
    });
  }
});
