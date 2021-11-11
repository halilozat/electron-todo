const electron = require("electron")

const url = require("url")
const path = require("path")


const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow, mainMenu, mainMenuTemplate;

app.on("ready", () => {

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "pages/mainWindow.html"),
            protocol: "file",
            slashes: true
        })
    )

    mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)

})

mainMenuTemplate = [
    {
        label: "Dosya",
        //altmenu
        submenu: [
            {
                label: "Yeni Todo Ekle"
            },
            {
                label: "Tümünü Sil"
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
