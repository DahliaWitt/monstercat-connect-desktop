const electron = require('electron');
//var globalShortcut = require('electron');
// Module to control application life.
const {app, globalShortcut} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let willQuitApp = false;
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({width: 1000, height: 600, title: "Monstercat Connect (Deon)"});

  // and load the index.html of the app.
  win.loadURL('http://deon.monstercat.com/');

  globalShortcut.register('MediaPreviousTrack', function() { 
		console.log('MediaPreviousTrack'); 
		win.webContents.executeJavaScript('document.querySelectorAll("button[role=previous]")[0].click()');
	});
	
	globalShortcut.register('MediaPlayPause', function() { 
		console.log('MediaPlayPause'); 
		win.webContents.executeJavaScript('document.querySelectorAll("i[role=play]")[0].click()');
	});

	globalShortcut.register('MediaNextTrack', function() { 
		console.log('MediaNextTrack');
		win.webContents.executeJavaScript('document.querySelectorAll("button[role=next]")[0].click()');
	});

  // Open the DevTools.
  // ONLY FOR DEV:
  //win.webContents.openDevTools();

  win.on('close', (e) => {
    if (willQuitApp) {
      /* the user tried to quit the app */
      win = null;
    } else {
      /* the user only tried to close the window */
      e.preventDefault();
      win.hide();
    }
  });


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  win.show();
  if (win === null) {
    createWindow();
  }
});

app.on('before-quit', () => willQuitApp = true);
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here