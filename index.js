const electron = require('electron');
const path = require('path');
const cal = require("./js/calculations");
// const electron_reload = require('electron-reload');
const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 540,
    resizable: false,
    webPreferences: {
      nodeIntegration: true, // is default false after Electron v5
      contextIsolation: false, // is true by default
      enableRemoteModule: false, // turn off remote
    }
  });
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on('closed', () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

app.on('window-all-closed', () => app.quit());

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});



// catch the input sent from the html
// here do all the manipulations necessary
// the channel is called "get_resin_information"
ipcMain.on('raw_lotto_information_ch', (event, args) => {
  let numbers = [];
  if (args.option === "powerball") {
    for (let x = 0; x < args.plays; x++) {
      numbers.push(cal.powerball());
    }
    args.option = "Powerball";
  }
  else if (args.option === "megamillions") {
    for (let x = 0; x < args.plays; x++) {
      numbers.push(cal.megamillions());
    }
    args.option = "Mega Millions";
  }
  let lotto_results = {
    numbers: numbers,
    option: args.option,
    plays: args.plays
  };

  event.sender.send('refined_lotto_information_ch', lotto_results);
});


const menuTemplate = [];

if (process.platform === 'darwin' ) {
  menuTemplate.unshift({
    label: 'Blank',
    submenu: [
      {
        label: 'Preferences',
        accelerator: process.platform === 'darwin' ? 'Command+`' : 'Shift+`',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  });
}

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Developer',
    submenu: [
      {
        role: 'reload'
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}