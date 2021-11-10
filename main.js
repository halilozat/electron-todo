const electron = require("electron")

//url ve path sayfalarımızı oluştururken hangi html sayfasını 
//kullanacağımızı belirttiğimiz yöntemde kullandığımız araçlar
const url = require("url")
const path = require("path")


const { app, BrowserWindow, Menu, ipcMain } = electron;

//ana sayfa
let mainWindow, mainMenu, mainMenuTemplate;

//uygulamamız hazır olduğunda bu çalışacak! (yani başlatırken)
app.on('ready', () => {
    console.log("running!")

    //console.log(process.platform)

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "main.html"),
            //nereden geldiğini belirtir, dosya tipini
            protocol: "file",
            //file://abc
            slashes: true
        })
    )

    mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    //bu menüyü benim uygulamamın menüsü olarak ayarla
    Menu.setApplicationMenu(mainMenu)


    //eğer "key" isimli bir event gelirse şuradaki fonksiyonu çalıştır
    ipcMain.on("key", (error, data) => {
        console.log(data)
    })

    ipcMain.on("key:inputValue", (error, data) => {
        console.log(data)
    })
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
                //kısa yol tuşu atama
                accelerator: process.path == "darwin" ? "Command+Q" : "Ctrl:Q",
                role: "quit"
            }
        ]
    },
    //Geliştirici konsol ve yenile için yeni menu
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

