'use strict'
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld(
    'dataapi', {
    getlist: () => ipcRenderer.invoke("getlist"),
    setlist: (data) => ipcRenderer.invoke("setlist", data),
    todo_all_del: () => ipcRenderer.invoke("todo_all_del"),
    window_close: () => ipcRenderer.invoke("window_close"),
    checkCompleted: () => ipcRenderer.send("checkCompleted"),
}); 
