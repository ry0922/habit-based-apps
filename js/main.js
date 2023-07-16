'use strict'
const electron = require("electron");
//electron読み込んでapp,BrowserWindowを取り出す
const { app, BrowserWindow, ipcMain } = electron;
const globalShortcut = electron.globalShortcut;
const Store = require('electron-store');
const path = require("path");           //pathはjoin用
const { exit } = require("process");
let mainWindow;
const Store_Data = new Store({ name: "data" });//Dataを格納しておくStore
const regedit = require('regedit');

//electron が準備終わったとき
app.on("ready", function () {
    //     // レジストリキーを登録する
    const appPath = path.resolve(path.resolve(app.getAppPath(),'../../'), 'electronreminder.exe');
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
    //その日タスク完了してた場合
    if (checkCompleted()) {
        app.quit();
        return;
    }

    //新しいウインドウを開く
    mainWindow = new BrowserWindow({
        width: 600,
        height: 800,
        frame: false,
        'fullscreen': true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    console.log(Store_Data.get('ToDoList').length);

    if (Store_Data.get('ToDoList').length === 0) {
        //mainWindowでhtmlファイルを開く
        //"file://" + path.join(__dirname, 'index.html'); => file://作業ディレクトリ/index.html
        mainWindow.loadURL("file://" + path.join(path.resolve(__dirname, '../'), 'init.html'));
    } else {
        mainWindow.loadURL("file://" + path.join(path.resolve(__dirname, '../'), 'index.html'));
    }

    //メインウインドウが閉じたらアプリが終了する
    mainWindow.on("closed", function () {
        app.quit();
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

// getlist(data取得処理)
ipcMain.handle('getlist', async (event, data) => {
    return Store_Data.get('ToDoList', []);//ToDoListがあれば取り出し、なければからのリストを返す
});

// setlist(data保存処理)
ipcMain.handle("setlist", async (event, data) => {
    Store_Data.set('ToDoList', data);       // 保存
});

// リスト削除
ipcMain.handle('todo_all_del', async (event) => {
    Store_Data.delete('ToDoList');//ToDoListのデータを削除
});

ipcMain.handle('window_close', async (event) => {
    app.quit();
});

function checkCompleted() {
    const now = new Date();
    console.log(now);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const ToDoList = Store_Data.get('ToDoList', []);
    let completedFlag = 0;
    if(typeof ToDoList[0] === "undefined"){
        return;
    }
    ToDoList[0].completedDate.forEach((data, i, array) => {
        let date = data.split(',');
        let completedDate = new Date(date[0], date[1] - 1, date[2]);
        if (completedDate.getTime() === today.getTime()) {
            completedFlag = 1;
        }
        console.log(completedDate);
        console.log(today);
    });
    if (completedFlag === 1) {
        return true;
    } else {
        return false;
    }
}