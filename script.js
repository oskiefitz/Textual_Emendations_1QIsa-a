function renderEmendations(data) {
  const container = document.getElementById("emendationContainer");
  container.innerHTML = "";

  data.forEach(entry => {
    const div = document.createElement("div");
    div.className = "emendation";

    const imagePath = `emendations/${entry.number}/${entry.number}.png`;

    div.innerHTML = `
      <strong>Emendation #${entry.number}</strong><br/>
      <img src="${imagePath}" alt="Emendation ${entry.number}"/><br/>
      <strong>Word:</strong> ${entry.word_transliterated}<br/>
      <strong>Length:</strong> ${entry.length}<br/>
      <strong>Type:</strong> ${entry.type_of_emendation}<br/>
      <strong>Characters:</strong> ${entry.num_characters}<br/>
      <strong>Heatmap:</strong> ${entry.heatmap_data}
    `;

    container.appendChild(div);
  });
}

function filterData(data, query) {
  return data.filter(entry => {
    const text = Object.values(entry).join(" ").toLowerCase();
    return text.includes(query.toLowerCase());
  });
}

function init() {
  Papa.parse("data.csv", {
    download: true,
    header: true,
    complete: function(results) {
      let allData = results.data.filter(row => row.number); // Clean empty rows
      renderEmendations(allData);

      document.getElementById("searchInput").addEventListener("input", function () {
        const filtered = filterData(allData, this.value);
        renderEmendations(filtered);
      });
    }
  });
}

init();
