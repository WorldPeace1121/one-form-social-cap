# ONE FORM SOCIAL CAP

## 概述

这是一个基于 Quasar Framework 构建的dc自动分配项目。该项目提供了一个现代化、响应式的界面，用于与DC自动分配，尤其关注社交KYC认证功能。

## 环境要求

- Node.js (v14.0.0 或更高版本)
- Yarn 包管理器（推荐）或 npm
- 基本的区块链概念理解

## 安装

1. 全局安装 Quasar CLI：

```bash
yarn global add @quasar/cli
# 或
npm install -g @quasar/cli
```

2. 克隆仓库：

```bash
git clone [仓库地址]
cd ui
```

3. 安装依赖：

```bash
yarn
# 或
npm install
```

## 开发

### 启动开发服务器

```bash
quasar dev
```

这将启动带有热重载功能的开发服务器，访问地址为 `http://localhost:9001`

### 代码质量工具

#### 代码检查

```bash
yarn lint
# 或
npm run lint
```

项目使用 ESLint 进行代码检查，配置针对 Vue.js 和 Quasar Framework 进行了优化。

#### 代码格式化

```bash
yarn format
# 或
npm run format
```

项目配置了 Prettier 以确保代码格式的一致性。

## 生产环境

### 构建生产版本

```bash
quasar build
```

此命令将：

- 编译并压缩代码
- 生成生产环境资源
- 在 `dist` 目录中创建构建输出

## 配置

### Quasar 框架配置

项目使用 Quasar Framework v2。详细配置选项：

- 查看 [Quasar 配置指南](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js)
- 修改 `quasar.config.js` 以自定义构建设置
- 在 `.env` 文件中配置环境变量
