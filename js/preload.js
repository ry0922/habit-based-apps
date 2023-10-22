'use strict'
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld(
    'dataapi', {
    gettodo: () => ipcRenderer.invoke("gettodo"),
    settodo: (data) => ipcRenderer.invoke("settodo", data),
    todoalldel: () => ipcRenderer.invoke("todoalldel"),
    window_close: () => ipcRenderer.invoke("window_close"),
}); 
