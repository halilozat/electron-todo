const electron = require("electron")

const { ipcRenderer } = electron

ipcRenderer.on("todo:addItem", (error, todo) => {
    //container
    const container = document.querySelector(".todo-container")

    //row
    const row = document.createElement("div")
    row.className = "row"

    //col
    const col = document.createElement("div")
    col.className = "p-2 mb-3 text-dark bg-light col-md-8 offset-2 d-flex justify-content-center flex-row align-items-center"

    //p
    const p = document.createElement("p")
    p.className = "m-0 w-100"
    p.innerText = todo.text

    // sil
    const deleteButton = document.createElement("button")
    deleteButton.className = "btn btn-sm btn-outline-danger flex-shrink-1"
    deleteButton.innerText = "X"

    deleteButton.addEventListener("click", () => {
        if (confirm("Silmek istiyor musunuz?")) {
        }
    })



    // İçeriden dışarıya doğru yapıyı oluşturuyoruz.
    col.appendChild(p)
    col.appendChild(deleteButton)
    row.appendChild(col)
    container.appendChild(row)
})

