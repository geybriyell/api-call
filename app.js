let currentPage = 1;
const dataTable = document.querySelector("#data-table tbody");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

async function fetchData(page) {
    try {
        const response = await fetch(`https://catfact.ninja/facts?page=${page}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        
        if (data && data.data && data.data.length > 0) {
            displayData(data.data);
            updateButtons(data.current_page, data.last_page);
        } else {
            
            dataTable.innerHTML = "<tr><td>No data available</td></tr>";
            prevButton.disabled = true;
            nextButton.disabled = true;
        }
    } catch (error) {
        console.error("API Request failed:", error);
        dataTable.innerHTML = `<tr><td>Error loading data</td></tr>`;
    }
}

function displayData(facts) {
    
    dataTable.innerHTML = "";

    
    facts.forEach(fact => {
        const row = `<tr><td>${fact.fact}</td></tr>`;
        dataTable.innerHTML += row;
    });
}

function updateButtons(current, last) {
    
    prevButton.disabled = current === 1;
    nextButton.disabled = current === last;
}


prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchData(currentPage);
    }
});

nextButton.addEventListener("click", () => {
    currentPage++;
    fetchData(currentPage);
});

// Initial fetch to load data on the first page
fetchData(currentPage);
