# 陈炎志 · 好奇心实验室

陈炎志个人主页，支持本地预览和 GitHub Pages 自动发布。

- 网站：https://dazhi666666.github.io/chen-yanzhi-homepage/
- 仓库：https://github.com/dazhi666666/chen-yanzhi-homepage

推送到 `main` 后，GitHub Actions 自动检查、构建并发布。凭据不写入项目。

## 本地预览

需要 Node.js 22.13 或以上版本。依赖已安装时，双击父文件夹中的「启动主页.cmd」，保持命令窗口运行，然后打开终端显示的本地地址（默认为 http://localhost:3000）。关闭窗口可停止预览。

手动启动：在本目录执行 `npm.cmd run dev`。首次安装依赖：`npm.cmd install`。

## GitHub Pages

运行 `npm run build:pages` 将静态站点导出到 `dist/client`，默认使用 `/chen-yanzhi-homepage` 作为资源前缀。Actions 根据仓库名自动设置前缀；可通过 `PAGES_BASE_PATH` 覆盖（用户主页根路径可设为空字符串）。只发布 `dist/client`，不上传本地运行记录、依赖或环境文件。

Windows 本地导出建议使用 Node.js 22 LTS；Node.js 24 的 Windows 导出进程可能在退出时触发 libuv 断言。Actions 使用 Node.js 22，与验证环境一致。

## 内容

- `app/projects.json`：8 个 AI 项目的介绍、要点、图片顺序、图片说明与 originalIntroduction 完整原文。
- `app/page.tsx`：首屏作品地图、项目展览、关于我、项目图集。
- `app/globals.css`：米白与浅草绿主题、彩色项目卡片、桌面和手机布局、动效偏好支持；正文和交互文字采用深色提高可读性。
- `public/projects/`：从提供的原始资料复制的 46 张项目配图，原始资料未修改。
- `app/feedback.tsx` 与 `app/feedback.css`：页面底部的访客反馈表单。

悟空智投、ModelShare、AnswerPlayer、阅读助手和坦克小游戏的详情默认进入「互动体验」，并可切换「真实截图 / 完整介绍」。science-harness 默认展示四张架构配图，保留完整介绍和 GitHub 仓库链接；Agent Router 收录五张真实界面截图、完整介绍及 GitHub 仓库链接；志愿项目保留截图与介绍。八篇原文完整收录，保留标题、加粗与嵌套列表格式；原文资料文件未修改。

## 互动演示


- 悟空智投：以可缩放、拖动的流程图展示角色协作，展开个股研究团队，点击节点与消息连线查看依据。支持开始、暂停、单步和时间线回看；首次研究后可注入放量突破、突发利空或冲高回落，展示条件确认、执行回执、V1/V2 策略变更、日终总结与次日记忆恢复。标的、行情和消息均为虚构预设场景，异常意图拦截是说明性演示，不连接原系统或交易服务。组件按需加载于 `app/wukong-demo.tsx`，状态与快照位于 `app/wukong-data.ts`。画布支持触屏平移，键盘方向键平移、加减缩放、0 适应视图；Tab 可进入节点和消息，回看与查看详情会暂停演示。
- ModelShare：调整请求量，开关资源节点，观察分配与等待队列。示例采用固定容量与轮转分配，并非真实平台调度算法。
- AnswerPlayer：选择预设面试问题，逐步体验识别、回答思路与逐句提词，无需麦克风权限。
- 阅读助手：在三个阅读兴趣间切换，观察文章排序、评分与推荐理由，比较摘要与示例原文。

以上均为本地预设演示，不调用真实模型，不发送用户数据。演示组件位于 `app/project-demo.tsx`，内容及调度逻辑位于 `app/demo-data.ts`，样式位于 `app/project-demo.css`。

坦克单人试玩是真正运行的本地小游戏，复用用户指定 `D:\坦克动荡` 的规则核心、Laika AI、默认旧版鼠标摇杆和矢量素材；原项目没有改动。支持触屏摇杆与开火双指操作，以及方向键 / WASD、空格 / M 开火、P 暂停。回合计分后自动换图，离开试玩焦点或隐藏页面时暂停。提供开始、暂停、恢复、重开，不包含联机服务和音效。

游戏代码按需加载，源文件位于 `app/tank/`，主页适配位于 `app/tank-demo.tsx`。详情参见 `app/tank/README.md`。

项目图集支持缩略图、左右切换、查看原图、Esc 关闭及键盘焦点管理。图库中的左右方向键在图库控件获得焦点后生效。

## AI 数字分身

页面底部的 `app/ai-twin.tsx` 是真实 AI 对话，调用自托管服务端 `https://game.dzskyid.cn/api/chat` 转发至用户指定的 ShareLLM 接口。主页继续部署在 GitHub Pages；密钥只存于服务器 `/opt/ai-twin/ai-twin.env` 的 `AI_API_KEY`（chmod 600），不进入公开仓库或浏览器。可通过 `NEXT_PUBLIC_CHAT_ENDPOINT` 覆盖默认接口地址。

`lib/ai-context.ts` 从 `app/projects.json` 提取全部八篇原始介绍与项目摘要，生成分身提示词。服务端源码位于同级 `../ai-twin-service`：`worker.mjs` 是核心逻辑（校验、限频、转发），`service.mjs` 是自托管 Node 入口（零依赖，反馈用 `node:sqlite` 存储）。项目资料变更后需更新 `context.mjs` 并重新部署服务端。每次请求附带全部项目资料和最近 12 条消息；聊天只保存在当前页面内存，刷新或点击重新聊会清空。服务端不保存聊天记录，上游服务商按自身策略处理请求。

分身使用 `deepseek-v4-flash`；支持快捷问题、Markdown、多轮追问、停止和失败重试。服务端校验来源、消息角色与大小，限制输出，并按 IP 尽力限频（不是全局费用上限）；费用上限需在服务商侧配置。

服务端部署在阿里云 ECS，与坦克对战服务同机：`/opt/ai-twin/releases/<日期>/` + systemd `ai-twin`（监听 127.0.0.1:8788，开机自启、崩溃自动拉起），Nginx 在 `game.dzskyid.cn` 443 下按 `/api/` 前缀反代，复用游戏站点的 Let's Encrypt 证书。日常操作：`ssh tanktrouble` 后执行 `systemctl status ai-twin`、`journalctl -u ai-twin -n 200 --no-pager`；更新时打包 `worker.mjs context.mjs service.mjs feedback-list.mjs` 解压到新 releases 目录后 `sed -i 's|releases/[0-9]*|releases/<新日期>|' /etc/systemd/system/ai-twin.service && systemctl daemon-reload && systemctl restart ai-twin`。

## 反馈

页面底部（AI 数字分身之后）的 `app/feedback.tsx` 是访客反馈表单：选择类型（建议 / 问题 / 喜欢 / 其他），填写内容后即可提交至 `https://game.dzskyid.cn/api/feedback`，写入服务器上的 SQLite（`/opt/ai-twin/data/feedback.sqlite`，在 releases 目录之外，更新部署不影响历史数据）。反馈仅站长可读：`ssh tanktrouble` 后执行 `node /opt/ai-twin/releases/20261008/feedback-list.mjs /opt/ai-twin/data/feedback.sqlite`（可加条数参数）。

服务端校验类型与各字段长度（内容不超过 1000 字），仅接受主页来源，并按 IP 尽力限频（每 10 分钟 3 条）。服务未就绪时接口返回 503，表单会提示稍后再来，已填内容保留可重试。可通过 `NEXT_PUBLIC_FEEDBACK_ENDPOINT` 覆盖默认接口地址。

服务端接口测试：在 `ai-twin-service` 目录运行 `node --test test.mjs`（覆盖校验、限频与存储写入）。

## 检查命令

`npm.cmd run build` 构建项目；`npx.cmd tsc --noEmit` 检查类型。

Node.js 24 下执行 `node --test tests/demo-logic.test.mjs`，验证调度容量、队列守恒、节点暂停恢复及阅读兴趣排序。

`node --test tests/tank-solo.test.mjs` 验证单人默认摇杆、暂停与输入清理、短按开火、反弹、Laika 自主行动及自动计分换回合。

`node --test tests/wukong-flow.test.mjs` 验证投研分支、暂停与回放边界、历史快照隔离、策略版本与成交状态，以及流程连线和实际消息的一致性。

页面没有虚构学历、任职经历和联系方式；项目描述依据提供的资料整理。图片含各项目历史界面版本，页面详情注明了适用的快照说明。
