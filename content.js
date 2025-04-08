(async function () {
  const imgs = Array.from(document.images);
  const brokenInfo = [];

  for (const img of imgs) {
    const urlList = [img.src];

    if (img.srcset) {
      const setUrls = img.srcset.split(',').map(s => s.trim().split(' ')[0]);
      urlList.push(...setUrls);
    }

    for (const url of urlList) {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        if (!res.ok) {
          brokenInfo.push({ url, reason: res.status.toString() });
        }
      } catch (e) {
        brokenInfo.push({ url, reason: 'FETCH_FAILED' });
      }
    }
  }

  const uniqueInfo = [];
  const seen = new Set();
  for (const item of brokenInfo) {
    if (!seen.has(item.url)) {
      seen.add(item.url);
      uniqueInfo.push(item);
    }
  }

  // ✅ バッジ更新メッセージ送信
  chrome.runtime.sendMessage({
    type: "updateBadge",
    count: uniqueInfo.length,
    detail: uniqueInfo
  });
})();
