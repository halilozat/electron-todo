const electron = require("electron")
const url = require("url")
const path = require("path")

const { app, BrowserWindow, Menu, ipcMain } = electron

let mainWindow, mainMenu, mainMenuTemplate;

app.on('ready', () => {
    console.log("Ready !")

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "mainWindow.html"),
            protocol: "file",
            slashes: true
        })
    )

    mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)

    // ipcMain.on("key", (error, data) => {
    //     console.log(data)
    // })

    mainWindow.on('close', () => {
        app.quit()
    })

    ipcMain.on("key:newWindow", () => {
        createWindow()
    })

    ipcMain.on("key:inputValue", (error, data) => {
        console.log(data)
    })


})

mainMenuTemplate = [
    {
        label: "Dosya",
        submenu: [
            {
                label: "Yeni Todo Ekle"
            },
            {
                label: "Çıkış Yap",
                accelerator: process.path == "darwin" ? "Command+Q" : "Ctrl:Q",
                role: "quit"
            }
        ]
    },
    {
        label: "Geliştirici Araçları",
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
        title: "Yeni Pencere"
    })

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, "newWindow.html"),
        protocol: "file",
        slashes: true
    }))

    addWindow.on('close', () => {
        addWindow = null;
    })

}