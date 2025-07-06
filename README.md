# AllYouTube - YouTube 视频下载器

一个基于 Next.js 构建的免费在线 YouTube 视频下载工具，支持多种分辨率和格式，无需安装软件即可直接在线下载。

## ✨ 特性

- 🎥 **免费下载** - 完全免费的 YouTube 视频下载服务
- 🌍 **多语言支持** - 支持中文和英文界面
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🎯 **多格式支持** - 支持多种视频质量和音频格式
- ⚡ **快速解析** - 基于 yt-dlp 的高效视频解析
- 🔒 **安全可靠** - 内置速率限制和安全验证
- 💾 **智能缓存** - 减少重复请求，提升用户体验

## 🛠️ 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI 组件**: React 18 + TypeScript
- **样式框架**: Tailwind CSS
- **图标库**: Lucide React
- **视频解析**: yt-dlp + ytdl-core
- **国际化**: 自定义 i18n 解决方案
- **部署**: 支持 Vercel 等多种部署方式

## 📦 项目结构

```
allyoutube/
├── app/                          # Next.js App Router
│   ├── [lang]/                   # 动态语言路由
│   │   ├── layout.tsx           # 布局组件
│   │   └── page.tsx             # 主页面
│   ├── api/                     # API 路由
│   │   └── parse/               # 视频解析 API
│   └── i18n/                    # 国际化配置
│       ├── dictionaries/        # 语言包
│       └── settings.ts          # i18n 设置
├── components/                   # React 组件
│   ├── ui/                      # 基础 UI 组件
│   ├── video-form.tsx           # 视频表单组件
│   ├── video-results.tsx        # 结果展示组件
│   ├── faq.tsx                  # FAQ 组件
│   ├── header.tsx               # 头部组件
│   ├── footer.tsx               # 底部组件
│   └── language-switcher.tsx    # 语言切换器
├── styles/                      # 样式文件
├── public/                      # 静态资源
├── bin/                         # yt-dlp 可执行文件
└── middleware.ts                # Next.js 中间件
```

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm、yarn 或 pnpm

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install
```

### 开发环境运行

```bash
# 启动开发服务器
npm run dev

# 或使用其他包管理器
yarn dev
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
# 构建应用
npm run build

# 启动生产服务器
npm run start
```

## 🌐 国际化

项目支持多语言，目前支持：

- 🇨🇳 中文 (zh)
- 🇺🇸 英文 (en)

### 添加新语言

1. 在 `app/i18n/settings.ts` 中添加新的语言代码
2. 在 `app/i18n/dictionaries/` 目录下创建对应的 JSON 文件
3. 参考现有语言文件的结构添加翻译内容

## 🔧 配置说明

### 环境变量

项目支持以下环境变量配置：

```env
# Google Analytics (可选)
NEXT_PUBLIC_GA_ID=your-ga-id

# Google AdSense (可选)
NEXT_PUBLIC_ADSENSE_ID=your-adsense-id
```

### yt-dlp 配置

项目使用 yt-dlp 作为视频解析引擎，可执行文件位于 `bin/` 目录：

- Linux/macOS: `bin/yt-dlp`
- Windows: `bin/yt-dlp.exe`

## 📱 API 接口

### POST /api/parse

解析 YouTube 视频信息

**请求体:**
```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**响应:**
```json
{
  "title": "视频标题",
  "thumbnail": "缩略图URL",
  "duration": "视频时长",
  "author": "作者",
  "uploadDate": "上传日期",
  "viewCount": "观看次数",
  "downloadUrls": {
    "video": "视频下载链接",
    "audio": "音频下载链接",
    "thumbnail": "缩略图链接",
    "qualities": [
      {
        "quality": "1080p",
        "url": "下载链接",
        "hasAudio": true
      }
    ]
  }
}
```

## 🛡️ 安全特性

- **速率限制**: 每个 IP 每分钟最多 5 次请求
- **来源验证**: 验证请求来源和 Referer
- **输入验证**: 严格的 URL 格式验证
- **错误处理**: 完善的错误处理和用户友好的错误信息

## 🚀 部署

### Vercel 部署

1. Fork 本项目到你的 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量（如需要）
4. 部署完成

### 其他部署平台

本项目是标准的 Next.js 应用，可以部署到任何支持 Node.js 的平台：

- **Netlify**: 支持 Next.js 应用部署
- **Railway**: 简单的云部署平台
- **Render**: 免费的云应用平台
- **自建服务器**: 使用 PM2 或其他进程管理器

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- 邮箱: xiaoyuansay@gmail.com
- Telegram: [加入群组](https://t.me/+iCoexLc8fsg0Njdl)

## ⚠️ 免责声明

本工具仅供个人学习和研究使用，请遵守 YouTube 的服务条款和相关法律法规。下载的内容请勿用于商业用途。

---

**⭐ 如果这个项目对你有帮助，请给个 Star！**