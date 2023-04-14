const electron = require('electron');
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const regedit = require('regedit');

app.on('ready', () => {
  // レジストリキーを登録する
  const appPath = path.resolve(app.getAppPath(), 'NetDrvConn.exe');
  regedit.putValue({
    'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run': {
      'MyApp': {
        value: appPath,
        type: 'REG_SZ',
      }
    }
  }, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('レジストリキーを追加しました');
    }
  });
});

let mainWindow = null;
app.on('ready', () => {
  // mainWindow を作成
  mainWindow = new BrowserWindow({
    // 初期表示
    width: 500,
    height: 500,

    // ウィンドウサイズの最小
    minWidth: 300,
    minHeight: 300,

    // ウィンドウサイズの最大
    maxWidth: 800,
    maxHeight: 800,
    // 最大化を無効
    maximizable: false,
    // 最小化を無効
    minimizable: false,
  });

  // html を指定
  let path = 'file://' + __dirname + '/index.html';
  mainWindow.loadURL(path);

  // developper tool を開く
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });


app.on('browser-window-focus', function () {
  // 最小化のショートカットキー
  globalShortcut.register('CommandOrControl+M', () => {
    console.log('CommandOrControl+M is pressed: Shortcut Disabled')
  })
  // 最大化のショートカットキー
  globalShortcut.register('F11', () => {
    console.log('F11 is pressed: Shortcut Disabled')
  })
})
});