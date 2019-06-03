const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const electron = require('electron')


// Enable live reload for all the files inside project directory
require('electron-reload')(__dirname);

let win

function createWindow() {
   win = new BrowserWindow({
      width: 800, 
      height: 600, 
      frame: true,
      title: 'Data Tab',
      webPreferences: {
         nodeIntegration: true
     }
   })
   win.loadURL(url.format ({
      pathname: path.join(__dirname, './gui/index.html'),
      protocol: 'file:',
      slashes: true
   }))
   // win.webContents.openDevTools()
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {app.quit();});

