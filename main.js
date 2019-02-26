const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

app.on('ready',function(){
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol:'file:',
    slashes: true
  }));

  //Build menu from the Template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert menu
  Menu.setApplicationMenu(mainMenu);
});

//Menu Template
const mainMenuTemplate = [
  {
    label:'File',
    submenu:[
      {
        label:'Add Item'
      },
      {
        label:'Clear Items'
      },
      {
        label:'Quit',
        click(){
          app.quit();
        }
      }
    ]    
  }
];
