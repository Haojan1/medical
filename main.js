const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    sandbox: true,
    webPreferences: {
      contextIsolation: true,
      disableBlinkFeatures: 'ContextMenu' // Disables context menu
      // Other webPreferences as needed
    }
  })

  mainWindow.loadURL('http://192.168.0.154:3000/') // Replace with your React web app URL

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
