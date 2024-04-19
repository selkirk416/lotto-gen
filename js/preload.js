const { contextBridge, ipcRenderer } = require("electron");


console.log("This preload script is successful.");


// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  get_resin_information: (args) => ipcRenderer.invoke('raw_resin_information_ch', args),




  // send: (channel, data) => {
  //   // whitelist channels
  //   let validChannels = ["toMain"];
  //   if (validChannels.includes(channel)) {
  //       ipcRenderer.send(channel, data);
  //   }
  // },
  // receive: (channel, func) => {
  //   let validChannels = ["fromMain"];
  //   if (validChannels.includes(channel)) {
  //     // Deliberately strip event as it includes `sender`
  //     ipcRenderer.on(channel, (event, ...args) => func(...args));
  //   }
  // }
});


// do calculations and variables in here
const MOD_TINY = 6.97;
const MOD_SMALL = 6.06;
const MOD_LARGE = 5.15;
const MOD_HUGE = 4.25;
const MOD_GARGANTUAN = 3.34;