const electron = require("electron")

const url = require("url")
const path = require("path")

const { app, BrowserWindow, Menu, ipcMain, webContents } = electron;
let mainWindow, mainMenu, mainMenuTemplate, addWindow;
let todoList = []

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })

    mainWindow.setResizable(false)

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "pages/mainWindow.html"),
            protocol: "file",
            slashes: true
        })
    )

    mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)

    //new Todo events
    ipcMain.on("newTodo:close", () => {
        addWindow.close()
        addWindow = null
    })

    ipcMain.on("newTodo:save", (error, data) => {
        if (data) {
            const todo = {
                id: todoList.length + 1,
                text: data.inputValue
            }

            todoList.push(todo)

            mainWindow.webContents.send("todo:addItem", todo)

            if (data.ref == "new") {
                addWindow.close()
                addWindow = null
            }
        }
    })

})

mainMenuTemplate = [
    {
        label: "Dosya",
        submenu: [
            {
                label: "Yeni Todo Ekle",
                click() {
                    createWindow()
                }
            },
            {
                label: "Çıkış",
                accelerator: process.path == "darwin" ? "Command+Q" : "Ctrl:Q",
                role: "quit"
            }
        ]
    },
    {
        label: "Dev Tools",
        submenu: [
            {
                label: "Konsolu Aç",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                label: "Yenile",
                role: "reload"
            }
        ]

    }
]

if (process.platform == "darwin") {
    mainMenuTemplate.unshift({
        label: app.getName(),
        role: "TODO"
    })
}

function createWindow() {
    addWindow = new BrowserWindow({
        width: 450,
        height: 250,
        title: "Yeni Pencere",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, "pages/newTodo.html"),
        protocol: "file",
        slashes: true
    }))

    addWindow.on('close', () => {
        addWindow = null;
    })


}

