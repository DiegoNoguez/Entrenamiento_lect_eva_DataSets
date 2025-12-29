// Archivo de js para subir arhcivo en el index 
const input = document.getElementById("DataSetInput");

// EL USUARIO SUBE EL ARCHIVO 
input.addEventListener("change", ()=>{
    const file = input.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = function (e){
        const fileData = {
            name: file.name,
            type: file.type,
            content: e.target.result
        };

        //  guardar archivo en sesion de usuario 
        localStorage.setItem("dataset", JSON.stringify(fileData));
        document.getElementById("uploadStatus").textContent='Archivo cargado: ${file.name}';
    };

    reader.readAsText(file); //CSV TXT JSON.
    input.value = " ";

});