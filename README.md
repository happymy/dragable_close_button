# 可拖拽关闭按钮 Chrome 扩展

一个简单的 Chrome 浏览器扩展，在页面上添加一个可拖拽的按钮，点击关闭当前标签页。

## 功能特点

- 🔴 可拖拽的圆形关闭按钮
- ❌ 点击按钮关闭当前标签页
- 📱 支持触摸屏移动设备
- ✨ 悬停缩放和点击动画效果
- 🔄 自动适配单页应用变化
- 💾 记忆按钮位置（使用 localStorage）

## 安装方法

1. 打开 Chrome 浏览器 `chrome://extensions/`
2. 开启"开发者模式"
3. 选择一种方式：
   - 点击"加载已解压的扩展程序"，选择扩展目录
   - 拖拽 `close-button.zip` 到页面

## 文件结构

```
manifest.json    # 扩展配置文件
background.js    # 后台脚本，执行关闭标签页
content.js       # 内容脚本，实现按钮逻辑
styles.css       # 按钮样式
pack.ps1         # 打包脚本，生成 close-button.zip
README.md        # 说明文档
```

## 使用方法

- 拖拽按钮：按住按钮拖拽到任意位置
- 关闭标签页：点击按钮关闭当前标签页
- 按钮会自动限制在可视区域内

## 实现细节

- 使用 Manifest V3
- 通过 background service worker 调用 `chrome.tabs.remove` API 关闭标签页
- 使用 `host_permissions` 获取跨域权限，支持在所有页面工作
- 内容脚本点击后通过 `chrome.runtime.sendMessage` 通知后台关闭
- 支持 MutationObserver 监听单页应用变化
- 完整触摸设备支持（`touchmove` 使用非被动监听确保滚动阻止）

## 注意事项

- 按钮 z-index 设为 10000，确保显示在最上层
- 关闭操作通过 chrome.tabs.remove API 实现，可靠性高
- 需要 `host_permissions: ["<all_urls>"]`，安装时会提示"读取和更改您在 all sites 上的数据"
- 运行 `.\pack.ps1` 可重新打包为 zip
