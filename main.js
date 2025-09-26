// 引入Electron的核心模块
const { app, BrowserWindow, Menu, ipcMain } = require("electron");

const path = require("path");

// 添加 IPC 处理器来获取应用版本
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

// 创建窗口的函数
function createWindow() {
  // 定义图标路径
  const iconPath = path.join(__dirname, "./public/app1.png");

  // 新建一个窗口（就像打开一个浏览器窗口）
  const mainWindow = new BrowserWindow({
    width: 800, // 窗口宽度
    height: 600, // 窗口高度
    icon: iconPath,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      // 允许在Vue页面中使用Node.js的功能（可选，按需开启）
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // 告诉窗口要显示的内容：
  // 开发阶段，显示Vue3的本地服务地址（就是刚才npm run dev的地址）
  if (process.env.NODE_ENV === "development") {
    // 开发环境：加载本地服务
    mainWindow.loadURL("http://localhost:5173");
  } else {
    // 生产环境：加载构建后的文件
    mainWindow.loadFile(path.join(__dirname, "dist/index.html"));
  }

  // 创建一个简单的菜单（包含前进/后退按钮）
  // const menu = Menu.buildFromTemplate([
  //   {
  //     label: "", // 菜单名称
  //     icon: path.join(__dirname, './public/left.png'), // 16x16
  //     submenu: [
  //       {
  //         label: "后退", // 后退按钮
  //         click: () => mainWindow.webContents.goBack(), // 调用后退API
  //       },
  //       {
  //         label: "前进", // 前进按钮
  //         click: () => mainWindow.webContents.goForward(), // 调用前进API
  //       },
  //     ],
  //   },
  // ]);
  const menu = null;
  Menu.setApplicationMenu(menu); // 把菜单应用到窗口
  // 打开开发者工具（类似浏览器的F12，方便调试，可选）
  // mainWindow.webContents.openDevTools();
}

// 当Electron准备好后，创建窗口
app.whenReady().then(() => {
  createWindow();

  // 对于Mac系统的兼容（不用深究，照抄即可）
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 关闭所有窗口时退出应用（Windows和Linux的习惯）
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

const { autoUpdater } = require("electron-updater");
function checkUpdate() {
  //检测更新
  autoUpdater.checkForUpdates();

  //监听'error'事件
  autoUpdater.on("error", (err) => {
    console.log(err);
  });

  //监听'update-available'事件，发现有新版本时触发
  autoUpdater.on("update-available", () => {
    console.log("found new version");
  });

  //默认会自动下载新版本，如果不想自动下载，设置autoUpdater.autoDownload = false

  //监听'update-downloaded'事件，新版本下载完成时触发
  autoUpdater.on("update-downloaded", () => {
    dialog
      .showMessageBox({
        type: "info",
        title: "应用更新",
        message: "发现新版本，是否更新？",
        buttons: ["是", "否"],
      })
      .then((buttonIndex) => {
        if (buttonIndex.response == 0) {
          //选择是，则退出程序，安装新版本
          autoUpdater.quitAndInstall();
          app.quit();
        }
      });
  });
}

app.on("ready", () => {
  //每次启动程序，就检查更新
  checkUpdate();
});
