
function submitBorrow() {
  const machine = document.getElementById("machineSelect").value;
  const date = document.getElementById("borrowDate").value;
  const time = document.getElementById("borrowTime").value;

  const userId = window.loggedInUserId || "未登入";

  fetch('/api/notify-discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ machine, date, time, userId })
    })
    .then(async res => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return res.json();
        } else {
            throw new Error("後端未回傳 JSON");
        }
    })
    .then(data => {
        alert("✅ 成功送出並通知 Discord！");
        closePopup();
    })
    .catch(err => {
        alert("❌ 發送失敗：" + err.message);
    });
}


