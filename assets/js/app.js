async function loadDashboard() {

    const response = await fetch(
        `data/dashboard.json?v=${Date.now()}`
    );

    const data = await response.json();

    document.getElementById("updatedAt").innerText =
        "Update terakhir : " + data.updated_at;

    document.getElementById("totalSls").innerText =
        data.summary.total_sls.toLocaleString();

    document.getElementById("selesai").innerText =
        data.summary.selesai.toLocaleString();

    document.getElementById("belum").innerText =
        data.summary.belum.toLocaleString();

    document.getElementById("progress").innerText =
        data.summary.progress + "%";

    loadTable(data.kecamatan);

    loadChart(data.history);
}

function loadTable(rows){

    const tbody =
        document.getElementById("tblKecamatan");

    tbody.innerHTML = "";

    rows.forEach(row => {

        const progress =
            Math.round(
                row.selesai / row.target * 100
            );

        tbody.innerHTML += `
        <tr>
            <td>${row.nama}</td>
            <td>${row.target}</td>
            <td>${row.selesai}</td>
            <td>${progress}%</td>
        </tr>`;
    });
}

function loadChart(history){

    new Chart(
        document.getElementById("historyChart"),
        {
            type: "line",
            data: {
                labels: history.map(x => x.tanggal),
                datasets: [{
                    label: "Selesai",
                    data: history.map(x => x.nilai)
                }]
            }
        }
    );
}

loadDashboard();
