let currentPage = 1;
const dataTable = document.querySelector("#data-table tbody");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

async function fetchData(page) {
    try {
        const response = await fetch(`https://catfact.ninja/facts?page=${page}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        // Check if data is available to display
        if (data && data.data && data.data.length > 0) {
            displayData(data.data);
            updateButtons(data.current_page, data.last_page);
        } else {
            // Display a message if no data is available
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
    // Clear existing table content
    dataTable.innerHTML = "";

    // Populate table with facts
    facts.forEach(fact => {
        const row = `<tr><td>${fact.fact}</td></tr>`;
        dataTable.innerHTML += row;
    });
}

function updateButtons(current, last) {
    // Disable or enable buttons based on the current and last page
    prevButton.disabled = current === 1;
    nextButton.disabled = current === last;
}

// Event listeners for pagination buttons
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
