# 彭芷莹 · 简历与作品集

继承 [陈奕翰个人站](https://github.com/ChanYIHAN/chenyihan.github.io) 的深色 UI、侧栏导航、信息卡、时间轴和作品封面卡片。使用 HTML / CSS / 原生 JavaScript，可直接部署 GitHub Pages，无数据库依赖。原项目作者：ChanYIHAN。

## 维护

- index.html：简历内容、作品卡片和占位位置。
- data/works.json：作品名称与 PC/WAP 双端链接。修改作品时同时更新 HTML 静态卡片。
- portfolio-loader.js：按设备选择 PC / WAP；iPhone、Android、iPad（含桌面 UA）、平板走 WAP，桌面走 PC；单链接回退。
- covers/：本地封面，assets/：照片、PDF简历、赛事长图。
- original-theme.css：复用原项目的视觉样式；style.css：本项目响应式适配。

## 待补充

1. 品牌整合营销案例：已预留卡片。
2. 新媒体陪跑案例：已预留卡片。
3. 2026广州设计周：已预留卡片。
4. 2025 BiliBiliWorld：用户确认保留2025，原链接现为BW2026，暂不启用跳转；sourceUrl仅用于记录待替换原地址。使用文字封面，待补正确专题链接与主视觉。

作品名称按提供资料保留。2026 WARC条目当前页面为WAIC世界人工智能大会，未自行改写资料名称。

## 部署

GitHub Pages：main 分支 / 根目录。无需安装依赖或构建。请勿将原站 Supabase 地址和配置迁入此项目。若未来需要在线后台管理，再建立独立数据库与权限。
