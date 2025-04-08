chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "updateBadge") {
    const tabId = sender.tab.id;
    const count = message.count;
    const detail = message.detail || [];

    chrome.action.setBadgeText({
      tabId: tabId,
      text: count.toString()
    });

    chrome.action.setBadgeBackgroundColor({
      tabId: tabId,
      color: count > 0 ? '#d93025' : '#34a853'
    });

    // setTitle に詳細な一覧をセット
    const tooltipText = detail.length === 0
      ? "No broken images detected."
      : detail.slice(0, 10).map(i => `${i.url} (${i.reason})`).join('\n') + (detail.length > 10 ? '\n...more' : '');

    chrome.action.setTitle({
      tabId: tabId,
      title: tooltipText
    });
  }
});
