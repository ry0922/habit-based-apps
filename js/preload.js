'use strict'
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld(
    'dataapi', {
    getlist: () => ipcRenderer.invoke("getlist"),
    setlist: (data) => ipcRenderer.invoke("setlist", data),
    toDoAllDel: () => ipcRenderer.invoke("toDoAllDel"),
    window_close: () => ipcRenderer.invoke("window_close"),
}); 
