const electron = require("electron")

const { ipcRenderer } = electron

ipcRenderer.on("todo:addItem", (error, todoItems) => {
    console.log(todoItems)
})