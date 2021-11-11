const electron = require('electron');
const { ipcRenderer } = electron;

let cancelButton = document.querySelector('#cancelButton');
let saveButton = document.querySelector('#saveButton');
let inputValue = document.querySelector('#inputValue');


cancelButton.addEventListener('click', () => {
    ipcRenderer.send('newTodo:close');
});

saveButton.addEventListener('click', () => {
    ipcRenderer.send("newTodo:save", { ref: "new", inputValue: inputValue.value })

});