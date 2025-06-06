const equipmentUsageData = [
  { machine: "603", user: "小明", date: "06/06", time: "14:00" },
  { machine: "603", user: "小華", date: "06/06", time: "15:00" },
  { machine: "507", user: "小美", date: "06/06", time: "09:00" },
  { machine: "507", user: "小綠", date: "06/06", time: "11:00" }
];

function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.classList.remove('active'));

  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    if (id === 'section2') renderUsageTables();
  }
}

function renderUsageTables() {
  const table603 = document.getElementById("table603");
  const table507 = document.getElementById("table507");

  table603.innerHTML = "";
  table507.innerHTML = "";

  equipmentUsageData.forEach(entry => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${entry.user}</td>
      <td>${entry.date}</td>
      <td>${entry.time}</td>
    `;

    if (entry.machine === "603") {
      table603.appendChild(tr);
    } else if (entry.machine === "507") {
      table507.appendChild(tr);
    }
  });
}
