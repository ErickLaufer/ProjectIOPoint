const { app, BrowserWindow, Tray, screen, ipcMain } = require('electron');
const {autoUpdater} = require("electron-updater");
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const getAllProduction = require('./backend/js/relatorios/getAllProduction');
// const postAddress = require('./backend/js/operacoes/postAddress');
// const listWareHouse = require('./backend/js/operacoes/listWareHouse');
// const barCodeWareHouseRoute = require('./backend/js/operacoes/barCodeWareHouse');
// const getWareHouse = require('./backend/js/operacoes/getWareHouse');
// const getProdutos = require('./backend/js/operacoes/getProdutos');
// const getEstoque = require('./backend/js/produtos/getEstoque');
// const getMeta = require('./backend/js/relatorios/getGoal');
// const getProduzir = require('./backend/js/relatorios/getProduction');
// const getPerHour = require('./backend/js/relatorios/getPerHour');
const appExpress = express();
const port = 8080;

let win;

// appExpress.use(bodyParser.json());
// appExpress.use(bodyParser.urlencoded({ extended: true }));

// autoUpdater.autoDownload = true; 
// autoUpdater.autoInstallOnAppQuit = true;


// appExpress.get('/buscaEndereco', getProdutos.getEndereco);
// appExpress.get('/getEstoque', getEstoque.getEstoque);
// appExpress.get('/getGoal', getMeta.getGoal);
// appExpress.get('/getAllProduction', getAllProduction.getAllProduction);
// appExpress.get('/getProduction', getProduzir.getProduction);
// appExpress.post('/addressRegister', postAddress.postAddress);
// appExpress.get('/listWareHouse', listWareHouse.listWareHouse);
// barCodeWareHouseRoute(appExpress);
// appExpress.get('/getWareHouse', getWareHouse.getWareHouse);
// appExpress.get('/getPerHour', getPerHour.getPerHour);

// const customUserDataPath = path.join('C:', 'RemainiFolder', 'RemainiUserData');
// app.setPath('userData', customUserDataPath);
// process.env.TEMP = path.join('C:', 'RemainiFolder', 'Temp');
// app.whenReady().then(() => {
//   autoUpdater.checkForUpdates();
// });

function createWindow() {
  const tray = new Tray(__dirname + '/assets/resources/appIcon.png'); // Carrega o ícone na bandeja do sistema
  
  // const displays = screen.getAllDisplays();
  // const externalDisplay = displays.find(display => display.bounds.x !== 0 || display.bounds.y !== 0);
  
  // const primaryDisplay = screen.getPrimaryDisplay();
  
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: __dirname + '/assets/resources/appIcon.png',
    webPreferences: {
      nodeIntegration: true, // Permite o uso do require no navegador
      contextIsolation: false, // Desativa o isolamento de contexto
      enableRemoteModule: true, // Permite o uso do módulo remoto
      sandbox: false, // Desativa a sandbox do Electron
      webSecurity: true, // Ativa a segurança na Web
      contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline';"
    }
  });
  
  win.loadFile('login.html');
  win.setMenuBarVisibility(false);
  
  win.once('ready-to-show', () => {
    win.show();
    autoUpdater.checkForUpdates();
  });
  // win.webContents.on('did-finish-load', () => {
  //   console.log('Janela carregada, enviando mensagem de atualização.');
  //   win.webContents.send('update-message', 'Aplicativo carregado e pronto.');
  // });
  autoUpdater.on('checking-for-update', () => {
    console.log('Pesquisando atualizações...');
    win.webContents.send('update-message', 'Verificando atualizações...');
  });
  autoUpdater.on('update-available', () => {
    console.log('aualização disponível...');
    win.webContents.send('update-message', 'Atualização disponível...');
    autoUpdater.downloadUpdate();
  });
  
  autoUpdater.on('update-not-available', () => {
    console.log('Nenhuma atualização disponível...');
    win.webContents.send('update-message', 'Nenhuma atualização disponível...');
  });
  
  // autoUpdater.on('update-downloaded', () => {
  //   console.log('Atualização baixada...Reiniciando aplicação...');
  //   win.webContents.send('update-message', 'Atualização baixada...Reiniciando aplicação...');
  //  // autoUpdater.quitAndInstall(); comando para reiniciar a aplicação após a atualização
  // });
  
  autoUpdater.on('error', (error) => {
    console.log('Erro ao atualizar:', error.message);
    win.webContents.send('update-message', `Erro ao atualizar: ${error.message}`);
  });
  
  // if (externalDisplay) {
    //   win.setBounds({
      //     x: externalDisplay.bounds.x,
      //     y: externalDisplay.bounds.y,
      //     width: 1280,
      //     height: 720
      //   });
      // } else {
        //   // Se não houver uma tela externa, abre na tela principal
        //   win.setBounds({
          //     x: primaryDisplay.bounds.x,
          //     y: primaryDisplay.bounds.y,
          //     width: 1280,
          //     height: 720
          //   });
          // }
          }
        app.whenReady().then(createWindow);
        appExpress.listen(port, () => {
          console.log(`Servidor Express esta ouvindo na porta ${port}`);
        });
        