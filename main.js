const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

app.on('ready',function(){
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol:'file:',
    slashes: true
  }));
  //Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });

  //Build menu from the Template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert menu
  Menu.setApplicationMenu(mainMenu);
});

//Handle create add mainWindow
function createAddWindow(){
  addWindow = new BrowserWindow({
    width:300,
    height:200,
    title:'Add Shopping List Item'
  });
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol:'file:',
    slashes: true
  }));
  //Garbage collection
  addWindow = null;
}

//Menu Template
const mainMenuTemplate = [
  {
    label:'File',
    submenu:[
      {
        label:'Add Item',
        click(){
          createAddWindow();
        }
      },
      {
        label:'Clear Items'
      },
      {
        label:'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

//If mac, add empty obj to Menu
if(process.platform =='darwin'){
  mainMenuTemplate.unshift({});
};

//Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item,focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}
