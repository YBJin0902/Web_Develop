window.addEventListener('DOMContentLoaded', () => {
  const userId = sessionStorage.getItem('loggedInUserId') || "未登入";
  const userWelcome = document.getElementById('userWelcome');
  if (userWelcome) {
    userWelcome.textContent = `歡迎，${userId}`;
  }
});


function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.classList.remove('active'));

  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
  }

  if (id === 'section1') {
    loadEquipmentTable();
  }
}

async function loadEquipmentTable() {
  const tbody = document.querySelector('#equipmentTable tbody');
  tbody.innerHTML = '<tr><td colspan="7">載入中...</td></tr>';

  try {
    const res = await fetch('/equipment');
    const data = await res.json();

    if (Array.isArray(data)) {
      tbody.innerHTML = '';
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.eq_name}</td>
          <td>${row.eq_num}</td>
          <td>${row.eq_cl_num}</td>
          <td>${row.eq_place}</td>
          <td>${row.eq_user || '-'}</td>
          <td>${row.borrow_tim || '-'}</td>
        `;
        tbody.appendChild(tr);
      });
    } else {
      tbody.innerHTML = '<tr><td colspan="7">資料錯誤</td></tr>';
    }
  } catch (err) {
    console.error('[設備表] 載入失敗:', err);
    tbody.innerHTML = '<tr><td colspan="7">❌ 載入錯誤</td></tr>';
  }
}

function openPopup() {
  document.getElementById("popupOverlay").style.display = "flex";
}

function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
}

function logout() {
  // ✅ 清除登入資訊（依你目前的邏輯）
  sessionStorage.removeItem('loggedInUserId');
  localStorage.removeItem('loggedInUserId');

  // ✅ 導回登入畫面
  window.location.href = '../../index.html';
}


