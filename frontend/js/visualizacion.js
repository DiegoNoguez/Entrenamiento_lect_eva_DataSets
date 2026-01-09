// Fucniones Auxiliares para ocupar el fetch 
function renderMeta(data) {
    document.getElementById("dataset-meta").innerHTML = `
        <p><strong>Archivo:</strong> ${data.filename}</p>
        <p><strong>Filas:</strong> ${data.rows}</p>
        <p><strong>Columnas:</strong> ${data.columns}</p>
    `;
}

function renderPreview(preview) {
    const container = document.getElementById("preview-table");

    let html = "<table><thead><tr>";
    preview.columns.forEach(c => html += `<th>${c}</th>`);
    html += "</tr></thead><tbody>";

    preview.rows.forEach(row => {
        html += "<tr>";
        preview.columns.forEach(c => {
            html += `<td>${row[c]}</td>`;
        });
        html += "</tr>";
    });

    html += "</tbody></table>";
    container.innerHTML = html;
}

function renderInfo(info) {
    let html = `
        <p>Total filas: ${info.total_filas}</p>
        <p>Total columnas: ${info.total_columnas}</p>
        <table>
            <thead>
                <tr>
                    <th>Columna</th>
                    <th>Tipo</th>
                    <th>No nulos</th>
                </tr>
            </thead>
            <tbody>
    `;

    info.columns.forEach(col => {
        html += `
            <tr>
                <td>${col.name}</td>
                <td>${col.dtype}</td>
                <td>${col.non_null}</td>
            </tr>
        `;
    });

    html += "</tbody></table>";
    document.getElementById("dataset-info").innerHTML = html;
}

function renderPlots(plots) {
    const container = document.getElementById("plots-container");
    container.innerHTML = "";

    plots.forEach(p => {
        const div = document.createElement("div");
        div.className = "plot-card";

        div.innerHTML = `
            <h4>
                ${p.column}
                ${p.category !== null ? `→ ${p.category}` : ""}
            </h4>
            <img src="http://localhost:8000${p.url}" alt="plot">
        `;

        container.appendChild(div);
    });
}


// CUerpo general del fetch 
window.addEventListener("DOMContentLoaded", async () => {

    const datasetId = sessionStorage.getItem("dataset_id");

    if (!datasetId) {
        alert("No hay dataset cargado");
        window.location.href = "index.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:8000/apis/visualizar_dataset/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dataset_id: datasetId,
                options: {
                    preview: true,
                    info: true
                }
            })
        });

        if (!response.ok) throw new Error("Error al obtener dataset");

        const data = await response.json();

        renderMeta(data);
        renderPreview(data.preview);
        renderInfo(data.info);
        renderPlots(data.plots);

    } catch (err) {
        console.error(err);
        alert("Error al visualizar el dataset");
    }
});

// Botón Back
const btnBack = document.getElementById("btn-back");
if (btnBack) {
    btnBack.addEventListener("click", () => {
        window.location.href = "index.html"; 
    });
} else {
    console.warn("El botón 'btn-back' no se encontró en el HTML");
}