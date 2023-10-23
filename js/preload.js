'use strict'
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld(
    'dataapi', {
    getlist: () => ipcRenderer.invoke("getlist"),
    setlist: (data) => ipcRenderer.invoke("setlist", data),
    todoalldel: () => ipcRenderer.invoke("todoalldel"),
    window_close: () => ipcRenderer.invoke("window_close"),
}); 
