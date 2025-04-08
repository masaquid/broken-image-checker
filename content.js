// 🔧 タブ内で画像リンク切れをチェックする関数（トップレベルで定義）
async function checkDeadImages() {
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

  return uniqueInfo;
}

// ✅ ポップアップが読み込まれたときの処理
document.addEventListener('DOMContentLoaded', async () => {
  const list = document.getElementById('deadLinks');
  const copyBtn = document.getElementById('copyBtn');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: checkDeadImages,
      },
      (results) => {
        if (!results || !results[0] || !results[0].result) {
          const li = document.createElement('li');
          li.textContent = 'Failed to check images.';
          list.appendChild(li);
          return;
        }

        const detail = results[0].result;

        if (detail.length === 0) {
          const li = document.createElement('li');
          li.textContent = 'No broken images found.';
          list.appendChild(li);
        } else {
          detail.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.url} (${item.reason})`;
            list.appendChild(li);
          });

          copyBtn.addEventListener('click', () => {
            const allUrls = detail.map(i => i.url).join('\n'); // ← URLのみ
            navigator.clipboard.writeText(allUrls);
          });
        }
      }
    );
  } catch (err) {
    const li = document.createElement('li');
    li.textContent = 'Error: ' + err.message;
    list.appendChild(li);
  }
});
