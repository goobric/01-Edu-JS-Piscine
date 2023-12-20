const url = "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json";
let data = [];
let heroes = [];
let currentPage = 1;  // Initial page
let pageSize = 20; // Initial page size
let totalPages = 29;
const columnSortOrder = {};

const table = document.getElementById('superhero-table');

function sortTable(table, column) {
    const currentHeader = table.querySelector(`th:nth-child(${column + 1})`);
    const isAscending = currentHeader.classList.contains("th-sort-asc");
    const dirModifier = isAscending ? -1 : 1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));
    const sortedRows = rows.sort((a, b) => {
        let aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        let bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        if (aColText.includes("Galan")){
            aColText = "Galan";
        }
        if(bColText.includes("Galan")){
            bColText = "Galan";
        }
        return aColText.localeCompare(bColText) * dirModifier;
    });

    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    tBody.append(...sortedRows);

    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    currentHeader.classList.toggle("th-sort-asc", !isAscending);
    currentHeader.classList.toggle("th-sort-desc", isAscending);
}
async function getSuperHeroes() {
    const response = await fetch(url);
    data = await response.json();
    heroes = data.slice(0, pageSize);
    populateTable(heroes);
}

getSuperHeroes();

function calculateTotalPages() {
    return Math.ceil(heroes.length / pageSize);
}

function getCurrentHeroes() {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + parseInt(pageSize, 10);
    return heroes.slice(startIndex, endIndex);

}

function updatePaginationUI() {
    const totalPages = calculateTotalPages();
    const pageSelect = document.getElementById("page-select");
    pageSelect.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Page ${i}`;
        pageSelect.appendChild(option);
    }

    pageSelect.value = currentPage;
}

const populateTable = () => {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = '';
    const heroesToShow = getCurrentHeroes();

    heroesToShow.forEach((hero, index) => {
        const row = document.createElement("tr");
        const createCell = (value) => {
            const cell = document.createElement("td");
            cell.textContent = value || '';
            return cell;
        };

        const createImageCell = (src) => {
            const cell = createCell();
            const image = document.createElement("img");
            image.src = src || '';
            cell.appendChild(image);
            return cell;
        };

        const createPowerStatCell = (stat) => createCell(hero.powerstats?.[stat] || 0);
        row.appendChild(createCell((currentPage - 1) * pageSize + index + 1));
        row.appendChild(createImageCell(hero.images?.sm));
        row.appendChild(createCell(hero.name));
        row.appendChild(createCell(hero.biography?.fullName));
        row.appendChild(createPowerStatCell('intelligence'));
        row.appendChild(createPowerStatCell('strength'));
        row.appendChild(createPowerStatCell('speed'));
        row.appendChild(createPowerStatCell('durability'));
        row.appendChild(createPowerStatCell('power'));
        row.appendChild(createPowerStatCell('combat'));
        row.appendChild(createCell(hero.appearance?.race));
        row.appendChild(createCell(hero.appearance?.gender));
        row.appendChild(createCell(hero.appearance?.height?.join(', ')));
        row.appendChild(createCell(hero.appearance?.weight?.join(', ')));
        row.appendChild(createCell(hero.biography?.placeOfBirth));
        row.appendChild(createCell(hero.biography?.alignment));
        tableBody.appendChild(row);
    });
    updatePaginationUI();
};


const handlePageChange = () => {
    const pageSelect = document.getElementById("page-select");
    currentPage = parseInt(pageSelect.value, 10);
    populateTable(getCurrentHeroes());
};

const handleSearch = () => {
    const searchInput = document.getElementById("search");
    const searchValue = searchInput.value.toLowerCase();

    // Fetch fresh data if it's the first search
    if (!data.length) {
        fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                data = jsonData;
                heroes = data.slice(0, pageSize);
                applySearchFilter(searchValue);
            });
    } else {
        // Update the 'heroes' array with the filtered data
        applySearchFilter(searchValue);

        // Reset the current page to the first page
        currentPage = 1;

        // Repopulate the table with the filtered data for the current page
        populateTable(getCurrentHeroes());

        // Update the pagination UI
        updatePaginationUI();
    }
};

const applySearchFilter = (searchValue) => {
    heroes = data.filter(hero => hero.name && hero.name.toLowerCase().includes(searchValue));
};

const handlePageSizeChange = async () => {
    const pageSizeSelect = document.getElementById("page-size");
    pageSize = pageSizeSelect.value;

    if (pageSize === '563' || pageSize === '50' || pageSize === '100'||pageSize==='10') {
        const response = await fetch(url);
        const data = await response.json();
        heroes = data;
    }
    console.log('Fetched Heroes:', heroes);

    let pageSizeHeroes;

    switch (pageSize) {
        case '10':
            pageSizeHeroes = heroes.slice(0, 10);
            break;
        case '20':
            pageSizeHeroes = heroes.slice(0, 20);
            break;
        case '50':
            pageSizeHeroes = heroes.slice(0, 50);
            break;
        case '100':
            pageSizeHeroes = heroes.slice(0, 100);
            break;
        case '563':
            pageSizeHeroes = heroes.slice(0, 563);
            break;


        default:
            console.error('Invalid page size:', pageSize);
            // Handle the error, e.g., display a message to the user
            return;
    }
    console.log('Page Size Heroes:', pageSizeHeroes);

    currentPage = 1;  // Reset to the first page when changing the page size
    populateTable(pageSizeHeroes);
    updatePaginationUI();
};

document.querySelectorAll('th[data-sort]').forEach(header => {
    header.addEventListener('click', () => {
        const columnIndex = Array.from(header.parentNode.children).indexOf(header);
        sortTable(table, columnIndex);
    });
});
document.getElementById("search").addEventListener("input", handleSearch);

document.getElementById("page-size").addEventListener("change", handlePageSizeChange);