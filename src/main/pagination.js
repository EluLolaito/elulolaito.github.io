let currentPage = 1;
const maxRows = 50;
let tableData = [];

function loadTableData() {
    const rows = document.querySelectorAll("#music-table-body tr");
    tableData = Array.from(rows).map(row => row.outerHTML);
    updateTable();
}

function updateTable() {
    const tableBody = document.getElementById("music-table-body");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * maxRows;
    const end = start + maxRows;
    const rowsToDisplay = tableData.slice(start, end);

    rowsToDisplay.forEach(rowHTML => {
        tableBody.insertAdjacentHTML("beforeend", rowHTML);
    });

    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(tableData.length / maxRows);
    document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage >= totalPages;
}

function changePage(direction) {
    if (direction === "next" && currentPage * maxRows < tableData.length) {
        currentPage++;
    } else if (direction === "prev" && currentPage > 1) {
        currentPage--;
    }
    updateTable();
}

document.getElementById("prevPage").addEventListener("click", () => changePage("prev"));
document.getElementById("nextPage").addEventListener("click", () => changePage("next"));

document.addEventListener("DOMContentLoaded", loadTableData);
