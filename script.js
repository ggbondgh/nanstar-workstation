const storageKeys = {
  theme: "nanstar-workstation-theme",
  language: "nanstar-workstation-language",
  favorites: "nanstar-workstation-favorites",
  customCards: "nanstar-workstation-custom-cards",
  editedCards: "nanstar-workstation-edited-cards",
  deletedCards: "nanstar-workstation-deleted-cards",
  recentCards: "nanstar-workstation-recent",
  cardFrequency: "nanstar-workstation-frequency",
  customModules: "nanstar-workstation-custom-modules",
  moduleOrder: "nanstar-workstation-module-order",
  syncEmail: "nanstar-workstation-sync-email",
  localUpdatedAt: "nanstar-workstation-local-updated-at"
};

const supabaseConfig = {
  url: "https://npvslireymkfyqmfwhmh.supabase.co",
  key: "sb_publishable_OqlBUWh-Mj86SRYdWXdReA_sSdqrdwV"
};

const supabaseBrowser = window.nanstarSupabase || window.supabase;
const supabaseClient = supabaseBrowser?.createClient
  ? supabaseBrowser.createClient(supabaseConfig.url, supabaseConfig.key)
  : null;

document.documentElement.dataset.syncSdk = supabaseClient ? "ready" : "missing";

const categoryMeta = {
  all: { label: "全部", labelEn: "All", sub: "全部卡片", subEn: "All cards", eyebrow: "All Orbits / Command Atlas", title: "NanStar Workstation", titleEn: "NanStar Workstation" },
  config: { label: "配置", labelEn: "Config", sub: "环境设置", subEn: "Identity setup", eyebrow: "Venus Orbit / Environment", title: "配置与身份", titleEn: "Config & Identity" },
  daily: { label: "日常", labelEn: "Daily", sub: "日常提交", subEn: "Daily commits", eyebrow: "Mercury Orbit / Daily Flow", title: "日常 Git 工作流", titleEn: "Daily Git Flow" },
  undo: { label: "撤销", labelEn: "Undo", sub: "撤销恢复", subEn: "Undo & restore", eyebrow: "Mars Orbit / Recovery", title: "撤销与恢复", titleEn: "Undo & Recovery" },
  remote: { label: "远程", labelEn: "Remote", sub: "远程同步", subEn: "Remote sync", eyebrow: "Earth Orbit / Sync", title: "远程与同步", titleEn: "Remote & Sync" },
  stash: { label: "暂存", labelEn: "Stash", sub: "暂存现场", subEn: "Save context", eyebrow: "Saturn Orbit / Context", title: "暂存现场", titleEn: "Stash Context" },
  danger: { label: "危险", labelEn: "Danger", sub: "危险操作", subEn: "Careful ops", eyebrow: "Neptune Orbit / Confirm First", title: "危险操作", titleEn: "Careful Operations" },
  "api-relay": { label: "API 中转站", labelEn: "API Relay", sub: "模型代理配置", subEn: "Model proxy config", eyebrow: "Mars Orbit / API Relay", title: "API 中转站", titleEn: "API Relay" }
};

let moduleMeta = {
  git: { label: "Git", labelEn: "Git", sub: "命令速查", subEn: "Command cards", eyebrow: "Mercury Orbit / Git Module", title: "Git 命令工作台", titleEn: "Git Command Workstation", focusTitle: "快速定位 Git 命令", focusTitleEn: "Find Git Commands Fast", searchPlaceholder: "搜：撤销 / 邮箱 / rebase / index.lock", searchPlaceholderEn: "Search: undo / email / rebase / index.lock" },
  clients: { label: "客户", labelEn: "Clients", sub: "客户项目", subEn: "Client work", eyebrow: "Jupiter Orbit / Client Workspace", title: "客户工作区", titleEn: "Client Workspace", focusTitle: "快速定位客户资料", focusTitleEn: "Find Client Notes Fast", searchPlaceholder: "搜：拉取 / 编译 / 烧录 / NV / SSH", searchPlaceholderEn: "Search: clone / build / package / NV / SSH" },
  windows: { label: "Windows", labelEn: "Windows", sub: "系统命令", subEn: "System commands", eyebrow: "Earth Orbit / Windows Module", title: "Windows 与 PowerShell", titleEn: "Windows & PowerShell", focusTitle: "快速定位系统命令", focusTitleEn: "Find System Commands Fast", searchPlaceholder: "搜：休眠 / 端口 / 进程 / IP", searchPlaceholderEn: "Search: sleep / port / process / IP" },
  cloud: { label: "Cloud", labelEn: "Cloud", sub: "部署入口", subEn: "Deploy notes", eyebrow: "Venus Orbit / Cloud Module", title: "GitHub 与 Cloudflare", titleEn: "GitHub & Cloudflare", focusTitle: "快速定位部署步骤", focusTitleEn: "Find Deploy Steps Fast", searchPlaceholder: "搜：Cloudflare / Pages / GitHub / main", searchPlaceholderEn: "Search: Cloudflare / Pages / GitHub / main" },
  database: { label: "Database", labelEn: "Database", sub: "数据同步", subEn: "Data sync", eyebrow: "Saturn Orbit / Data Module", title: "Supabase 与数据同步", titleEn: "Supabase & Data Sync", focusTitle: "快速定位数据库操作", focusTitleEn: "Find Database Ops Fast", searchPlaceholder: "搜：RLS / policy / auth / table", searchPlaceholderEn: "Search: RLS / policy / auth / table" },
  ai: { label: "AI", labelEn: "AI", sub: "提示模板", subEn: "Prompt templates", eyebrow: "Mars Orbit / AI Module", title: "AI 提示模板", titleEn: "AI Prompt Templates", focusTitle: "快速定位提示词", focusTitleEn: "Find Prompt Templates Fast", searchPlaceholder: "搜：审查 / 总结 / 翻译 / 代码", searchPlaceholderEn: "Search: review / summary / translate / code" },
  links: { label: "Links", labelEn: "Links", sub: "常用入口", subEn: "Quick links", eyebrow: "Neptune Orbit / Link Module", title: "常用链接入口", titleEn: "Quick Links", focusTitle: "快速定位入口", focusTitleEn: "Find Links Fast", searchPlaceholder: "搜：GitHub / Supabase / Cloudflare", searchPlaceholderEn: "Search: GitHub / Supabase / Cloudflare" },
  templates: { label: "Templates", labelEn: "Templates", sub: "工作模板", subEn: "Work templates", eyebrow: "Uranus Orbit / Template Module", title: "个人工作模板", titleEn: "Personal Templates", focusTitle: "快速定位模板", focusTitleEn: "Find Templates Fast", searchPlaceholder: "搜：日报 / 提交 / 项目 / 复盘", searchPlaceholderEn: "Search: daily / commit / project / review" }
};

const builtInModuleMeta = { ...moduleMeta };

const clientMeta = {
  wk: { label: "微克", labelEn: "WK", title: "微克客户资料", titleEn: "WK Client Notes" }
};

const clientCategoryMeta = {
  all: { label: "全部", labelEn: "All" },
  "wk-flow": { label: "流程", labelEn: "Flow" },
  "wk-paths": { label: "路径", labelEn: "Paths" },
  "wk-interfaces": { label: "接口", labelEn: "Interfaces" },
  "wk-snippets": { label: "片段", labelEn: "Snippets" },
  "wk-test": { label: "测试", labelEn: "Test" },
  "wk-ops": { label: "运维", labelEn: "Ops" },
  "wk-checklist": { label: "清单", labelEn: "Checklist" }
};

const cardClassByCategory = {
  config: "venus-card",
  daily: "mercury-card",
  undo: "mars-card",
  remote: "earth-card",
  stash: "saturn-card",
  danger: "neptune-card",
  clients: "jupiter-card",
  windows: "earth-card",
  cloud: "venus-card",
  database: "saturn-card",
  ai: "mars-card",
  links: "neptune-card",
  templates: "uranus-card",
  "wk-flow": "mercury-card",
  "wk-paths": "earth-card",
  "wk-interfaces": "venus-card",
  "wk-snippets": "saturn-card",
  "wk-test": "mars-card",
  "wk-ops": "neptune-card",
  "wk-checklist": "uranus-card"
};

const moduleCategoryOptions = ["all", "config", "daily", "undo", "remote", "stash", "danger"];
const clientCategoryOptions = ["all", "wk-flow", "wk-paths", "wk-interfaces", "wk-snippets", "wk-test", "wk-ops", "wk-checklist"];
const coreModuleOrder = ["git", "clients"];
const defaultModuleOrder = coreModuleOrder;
const customModuleClasses = ["earth-nav", "venus-nav", "saturn-nav", "mars-nav", "neptune-nav", "uranus-nav"];

const uiText = {
  zh: {
    htmlLang: "zh-CN",
    brandSub: "Workstation · Command Atlas",
    themeLight: "浅色",
    themeDark: "深色",
    themeToLight: "切换浅色主题",
    themeToDark: "切换深色主题",
    langLabel: "切换英文",
    langButton: "EN",
    focusEyebrow: "Command Locate",
    focusTitle: "快速定位命令",
    searchPlaceholder: "搜：撤销 / 邮箱 / rebase / index.lock",
    searchAria: "快速搜索命令卡片",
    clear: "清空",
    favorites: "收藏",
    exitFavorites: "退出收藏",
    newCard: "新建卡片",
    addModule: "添加模块",
    moduleSub: "自定义模块",
    modulePrompt: "模块名称",
    moduleAddTitle: "添加模块",
    moduleEditTitle: "重命名模块",
    moduleSave: "保存模块",
    moduleNameRequired: "模块名称不能为空",
    moduleCreated: "模块已添加",
    moduleRenamed: "模块已重命名",
    moduleDeleted: "模块已删除",
    moduleDeleteHint: "再次点击确认删除",
    coreModuleLocked: "核心模块不可删除",
    renameModule: "重命名",
    deleteModule: "删除模块",
    deleteModuleConfirm: "删除该模块和其中的自定义卡片？",
    resultEyebrow: "Command Cards / 命令卡片",
    favoriteCards: "收藏卡片",
    favoritedCommands: "已收藏命令",
    frequentGit: "高频 Git 场景",
    cardsUnit: "cards",
    custom: "Custom",
    git: "Git",
    copy: "复制",
    copyAll: "复制全部",
    copySnippet: "复制整段",
    copyConfig: "复制 config.toml",
    copyLine: "复制此行",
    editAction: "编辑",
    deleteAction: "删除",
    deleteConfirm: "确认",
    deleteHint: "再次点击确认删除",
    deletedCard: "卡片已删除",
    favoriteAction: "收藏",
    noMatchTitle: "没有匹配的卡片",
    noMatchBody: "换个关键词，或点击“新建卡片”把这条命令收进你的工作站。",
    selectedEyebrow: "Selected Card / 当前卡片",
    pickCardTitle: "先选一张卡片",
    pickCardBody: "点击卡片查看备注；复制优先在命令行内完成。",
    category: "分类",
    scenario: "场景",
    copyGroup: "复制整组命令",
    solarEyebrow: "Solar Field / 星图",
    solarTitle: "八轨行星",
    solarFullLabel: "全屏查看八轨行星",
    solarFullTitle: "全屏查看",
    solarOverlayEyebrow: "Solar Field / 全屏星图",
    solarOverlayTitle: "八轨行星观测",
    close: "关闭",
    closeSolar: "关闭八轨行星观测",
    selectedBody: "Selected Body / 星体",
    clickPlanet: "点击一颗行星",
    clickBody: "点击太阳或行星",
    planetHint: "全屏模式会保持转动。点击太阳或行星后，轨道暂停并显示简介；点击空白区域后继续转动。",
    formCustomEyebrow: "Custom Card / 自定义",
    formCustomTitle: "添加自定义卡片",
    formEditEyebrow: "Edit Card / 编辑",
    formEditTitle: "编辑卡片",
    formClose: "关闭",
    formTitle: "标题",
    formCategory: "分类",
    formScenario: "场景",
    formCommand: "命令",
    formSnippetContent: "内容",
    formNote: "备注",
    formTags: "标签",
    saveCard: "保存卡片",
    updateCard: "保存修改",
    titlePlaceholder: "例如：撤销最近一次 commit",
    scenarioPlaceholder: "什么时候用这张卡",
    notePlaceholder: "执行前要注意什么",
    tagsPlaceholder: "用逗号分隔，例如 git,撤销,commit",
    customScenario: "自定义场景",
    titleRequired: "标题和命令不能为空",
    savedCard: "卡片已保存",
    updatedCard: "卡片已更新",
    favoriteAdded: "已加入收藏",
    favoriteRemoved: "已取消收藏",
    copied: "命令已复制",
    copyUnavailable: "复制不可用",
    storageFull: "本地存储空间不足，请清理浏览器数据",
    sync: "同步",
    syncTitle: "云端同步",
    syncEmail: "邮箱",
    syncPassword: "密码",
    syncSignIn: "登录",
    syncSignUp: "注册",
    syncSignOut: "退出",
    syncNow: "立即同步",
    syncOffline: "未登录",
    syncOnline: "已登录",
    syncBusy: "同步中",
    syncReady: "已同步",
    syncFailed: "同步失败",
    syncLoginRequired: "请先输入邮箱和密码",
    syncSignUpDone: "注册成功，请检查邮箱或直接登录",
    syncSignInDone: "已登录并同步",
    syncSignOutDone: "已退出同步",
    syncSaved: "云端已同步",
    syncSdkMissing: "Supabase SDK 未加载"
  },
  en: {
    htmlLang: "en",
    brandSub: "Workstation · Command Atlas",
    themeLight: "Light",
    themeDark: "Dark",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    langLabel: "Switch to Chinese",
    langButton: "中",
    focusEyebrow: "Command Locate",
    focusTitle: "Find Commands Fast",
    searchPlaceholder: "Search: undo / email / rebase / index.lock",
    searchAria: "Search command cards",
    clear: "Clear",
    favorites: "Favorites",
    exitFavorites: "Exit Favorites",
    newCard: "New Card",
    addModule: "Add Module",
    moduleSub: "Custom module",
    modulePrompt: "Module name",
    moduleAddTitle: "Add Module",
    moduleEditTitle: "Rename Module",
    moduleSave: "Save Module",
    moduleNameRequired: "Module name is required",
    moduleCreated: "Module added",
    moduleRenamed: "Module renamed",
    moduleDeleted: "Module deleted",
    moduleDeleteHint: "Click again to delete",
    coreModuleLocked: "Core module cannot be deleted",
    renameModule: "Rename",
    deleteModule: "Delete module",
    deleteModuleConfirm: "Delete this module and its custom cards?",
    resultEyebrow: "Command Cards",
    favoriteCards: "Favorite Cards",
    favoritedCommands: "Favorited Commands",
    frequentGit: "Frequent Git Scenarios",
    cardsUnit: "cards",
    custom: "Custom",
    git: "Git",
    copy: "Copy",
    copyAll: "Copy All",
    copySnippet: "Copy Block",
    copyConfig: "Copy config.toml",
    copyLine: "Copy this line",
    editAction: "Edit",
    deleteAction: "Delete",
    deleteConfirm: "Confirm",
    deleteHint: "Click again to delete",
    deletedCard: "Card deleted",
    favoriteAction: "Favorite",
    noMatchTitle: "No matching cards",
    noMatchBody: "Try another keyword, or add this command with New Card.",
    selectedEyebrow: "Selected Card",
    pickCardTitle: "Select a card first",
    pickCardBody: "Click a card to view notes. Copy actions are available inside each command line.",
    category: "Category",
    scenario: "Scenario",
    copyGroup: "Copy command group",
    solarEyebrow: "Solar Field",
    solarTitle: "Eight-Orbit System",
    solarFullLabel: "Open solar field fullscreen",
    solarFullTitle: "Fullscreen",
    solarOverlayEyebrow: "Solar Field / Fullscreen",
    solarOverlayTitle: "Eight-Orbit View",
    close: "Close",
    closeSolar: "Close solar field view",
    selectedBody: "Selected Body",
    clickPlanet: "Click a planet",
    clickBody: "Click the Sun or a planet",
    planetHint: "Fullscreen mode keeps orbiting. Click the Sun or a planet to pause and show a short note; click empty space to resume.",
    formCustomEyebrow: "Custom Card",
    formCustomTitle: "Add Custom Card",
    formEditEyebrow: "Edit Card",
    formEditTitle: "Edit Card",
    formClose: "Close",
    formTitle: "Title",
    formCategory: "Category",
    formScenario: "Scenario",
    formCommand: "Command",
    formSnippetContent: "Content",
    formNote: "Note",
    formTags: "Tags",
    saveCard: "Save Card",
    updateCard: "Save Changes",
    titlePlaceholder: "Example: undo last commit",
    scenarioPlaceholder: "When to use this card",
    notePlaceholder: "What to check before running it",
    tagsPlaceholder: "Comma-separated, e.g. git,undo,commit",
    customScenario: "Custom scenario",
    titleRequired: "Title and command are required",
    savedCard: "Card saved",
    updatedCard: "Card updated",
    favoriteAdded: "Added to favorites",
    favoriteRemoved: "Removed from favorites",
    copied: "Command copied",
    copyUnavailable: "Copy unavailable",
    storageFull: "Local storage is full. Clear browser data and try again.",
    sync: "Sync",
    syncTitle: "Cloud Sync",
    syncEmail: "Email",
    syncPassword: "Password",
    syncSignIn: "Sign In",
    syncSignUp: "Sign Up",
    syncSignOut: "Sign Out",
    syncNow: "Sync Now",
    syncOffline: "Signed out",
    syncOnline: "Signed in",
    syncBusy: "Syncing",
    syncReady: "Synced",
    syncFailed: "Sync failed",
    syncLoginRequired: "Enter email and password first",
    syncSignUpDone: "Account created. Check email or sign in directly.",
    syncSignInDone: "Signed in and synced",
    syncSignOutDone: "Signed out",
    syncSaved: "Cloud sync complete",
    syncSdkMissing: "Supabase SDK is not loaded"
  }
};

const seedCards = [
  {
    id: "git-config-user",
    title: "配置提交用户名和邮箱",
    titleEn: "Configure Git username and email",
    category: "config",
    risk: "Safe",
    scenario: "新电脑、临时环境或 GitHub 提交身份不对时先检查这张。",
    scenarioEn: "Use this first on a new machine, temporary environment, or when GitHub commit identity looks wrong.",
    command: 'git config --global user.name "你的名字"\ngit config --global user.email "你的邮箱@example.com"\ngit config --global --list',
    note: "--global 会写入当前系统用户配置。项目内单独配置时去掉 --global。",
    noteEn: "--global writes to the current system user config. Remove --global when configuring only one repository.",
    tags: ["git", "配置", "邮箱", "user"]
  },
  {
    id: "git-config-default-branch",
    title: "设置默认分支名为 main",
    titleEn: "Set default branch name to main",
    category: "config",
    risk: "Safe",
    scenario: "初始化新仓库时，避免默认分支名和 GitHub Pages / Cloudflare Pages 习惯不一致。",
    scenarioEn: "Use when initializing new repositories to avoid branch-name mismatches with GitHub Pages or Cloudflare Pages habits.",
    command: "git config --global init.defaultBranch main\ngit init",
    note: "只影响之后新建的仓库，不会自动改已有仓库分支名。",
    noteEn: "Only affects repositories created later. Existing branch names will not change automatically.",
    tags: ["git", "配置", "main", "init"]
  },
  {
    id: "git-daily-commit-push",
    title: "日常提交上传",
    titleEn: "Daily commit and push",
    category: "daily",
    risk: "Safe",
    scenario: "最常规的一次保存、提交、推送流程。",
    scenarioEn: "The normal save, commit, and push flow.",
    command: 'git status\ngit pull\ngit add .\ngit commit -m "提交说明"\ngit push',
    note: "提交前先看 status，确认没有把临时文件、密钥、构建产物一起加进去。",
    noteEn: "Check status before committing to avoid adding temp files, secrets, or build artifacts.",
    tags: ["git", "提交", "push", "daily"]
  },
  {
    id: "git-check-diff",
    title: "提交前查看改了什么",
    titleEn: "Review changes before committing",
    category: "daily",
    risk: "Safe",
    scenario: "准备 commit 前快速扫一遍改动，避免把无关内容提交进去。",
    scenarioEn: "Quickly scan changes before committing so unrelated content does not get included.",
    command: "git status\ngit diff\ngit diff --staged",
    note: "git diff 看工作区未暂存改动；git diff --staged 看已经 add 的改动。",
    noteEn: "git diff shows unstaged working-tree changes; git diff --staged shows changes already added.",
    tags: ["git", "diff", "检查", "提交前"]
  },
  {
    id: "git-log-graph",
    title: "漂亮日志图",
    titleEn: "Compact commit graph",
    category: "daily",
    risk: "Safe",
    scenario: "需要看分支、合并、提交关系时，用一行图快速判断仓库状态。",
    scenarioEn: "Use this to inspect branches, merges, and commit relationships at a glance.",
    command: "git log --oneline --graph --decorate --all",
    note: "适合 pull/rebase/merge 前看一眼，尤其是多分支时。",
    noteEn: "Useful before pull, rebase, or merge, especially in multi-branch repositories.",
    tags: ["git", "log", "graph", "分支"]
  },
  {
    id: "git-pull-rebase",
    title: "更稳的提交前同步",
    titleEn: "Safer sync before pushing",
    category: "remote",
    risk: "Low Risk",
    scenario: "本地准备提交或推送前，先同步远程并保持历史更干净。",
    scenarioEn: "Sync remote changes before local commit or push while keeping history cleaner.",
    command: "git fetch\ngit log --oneline --graph --decorate --all\ngit pull --rebase origin main",
    note: "如果 rebase 冲突，先解决冲突，再 git rebase --continue。",
    noteEn: "If rebase conflicts occur, resolve them and then run git rebase --continue.",
    tags: ["git", "pull", "rebase", "同步"]
  },
  {
    id: "git-remote-url",
    title: "查看和切换远程地址",
    titleEn: "View and switch remote URLs",
    category: "remote",
    risk: "Safe",
    scenario: "换 GitHub 仓库、HTTPS/SSH 切换、推送到新远程时使用。",
    scenarioEn: "Use when switching GitHub repositories, changing HTTPS/SSH, or pushing to a new remote.",
    command: "git remote -v\ngit remote set-url origin git@github.com:用户名/仓库名.git\ngit remote set-url origin https://github.com/用户名/仓库名.git",
    note: "SSH 需要本机配置 SSH key；HTTPS 通常走浏览器或 token 认证。",
    noteEn: "SSH requires a local SSH key. HTTPS usually uses browser or token authentication.",
    tags: ["git", "remote", "ssh", "https"]
  },
  {
    id: "git-undo-last-commit-soft",
    title: "撤销最近一次 commit，保留改动",
    titleEn: "Undo last commit, keep changes",
    category: "undo",
    risk: "Low Risk",
    scenario: "刚 commit 完发现提交说明写错、漏改文件，想退回到提交前继续改。",
    scenarioEn: "Use right after a commit when the message is wrong or files were missed, and you want to keep editing.",
    command: "git reset --soft HEAD^",
    note: "只撤销 commit，本地文件和暂存区改动还在。已经 push 的提交不要直接这么处理。",
    noteEn: "Only removes the commit. Local files and staged changes remain. Avoid this directly for commits already pushed.",
    tags: ["git", "撤销", "commit", "reset"]
  },
  {
    id: "git-unstage-all",
    title: "取消暂存全部文件",
    titleEn: "Unstage all files",
    category: "undo",
    risk: "Safe",
    scenario: "git add . 后发现加多了，想把文件从暂存区拿回来。",
    scenarioEn: "Use after git add . when too many files were staged.",
    command: "git restore --staged .",
    note: "不会丢失工作区文件内容，只是取消 add。",
    noteEn: "Does not delete working-tree content. It only unstages files.",
    tags: ["git", "撤销", "staged", "restore"]
  },
  {
    id: "git-discard-file",
    title: "丢弃某个文件的工作区修改",
    titleEn: "Discard working-tree changes in one file",
    category: "undo",
    risk: "Check First",
    scenario: "某个文件改坏了，想恢复到最近一次提交的状态。",
    scenarioEn: "Use when one file is broken and should return to the last committed state.",
    command: "git restore <文件路径>",
    note: "这会丢掉该文件未提交的修改。执行前最好先 git diff <文件路径>。",
    noteEn: "This discards uncommitted changes in that file. Run git diff <path> first if unsure.",
    tags: ["git", "丢弃", "restore", "文件"]
  },
  {
    id: "git-revert-pushed",
    title: "安全撤销已经 push 的提交",
    titleEn: "Safely undo a pushed commit",
    category: "undo",
    risk: "Safe",
    scenario: "提交已经推到远程或被别人拉取，想撤销影响但保留公共历史。",
    scenarioEn: "Use when a commit is already pushed or pulled by others and public history should stay intact.",
    command: "git revert <commit-id>\ngit push",
    note: "revert 会生成一个新的反向提交，比 reset --hard 再强推更适合公共分支。",
    noteEn: "revert creates a new inverse commit and is safer than reset --hard plus force push on shared branches.",
    tags: ["git", "revert", "push", "安全"]
  },
  {
    id: "git-stash-context",
    title: "临时保存现场",
    titleEn: "Temporarily save current work",
    category: "stash",
    risk: "Safe",
    scenario: "做到一半需要切分支、拉代码、修紧急问题，但当前改动还不能提交。",
    scenarioEn: "Use when switching branches or handling urgent work while current changes are not ready to commit.",
    command: 'git stash push -m "做到一半"\ngit switch <其他分支>\n# 回来后\ngit switch <原分支>\ngit stash pop',
    note: "pop 会尝试恢复并删除 stash；不确定时先用 git stash apply。",
    noteEn: "pop restores and removes the stash. Use git stash apply first when unsure.",
    tags: ["git", "stash", "切分支", "现场"]
  },
  {
    id: "git-index-lock-windows",
    title: "Windows 下处理 Git 锁文件",
    titleEn: "Handle Git lock files on Windows",
    category: "danger",
    risk: "Check First",
    scenario: "Git 提示 index.lock 已存在，通常是上次 Git 进程异常退出或仍在运行。",
    scenarioEn: "Use when Git reports index.lock already exists, usually after an abnormal exit or a still-running Git process.",
    command: 'Get-Process | Where-Object { $_.ProcessName -like "*git*" }\nTest-Path .git\\index.lock\nRemove-Item -Force .git\\index.lock',
    note: "先确认没有 Git 进程正在执行，再删除锁文件。不要在 IDE/Git 操作进行中硬删。",
    noteEn: "Confirm no Git process is running before deleting the lock. Do not remove it while IDE or Git operations are active.",
    tags: ["git", "index.lock", "Windows", "修复"]
  },
  {
    id: "git-reset-hard-origin",
    title: "重置本地到远程 main",
    titleEn: "Reset local branch to remote main",
    category: "danger",
    risk: "Danger",
    scenario: "本地分支乱了，确定本地改动不要了，要完全回到远程 main。",
    scenarioEn: "Use only when the local branch is messy and local changes can be discarded completely.",
    command: "git fetch origin\ngit reset --hard origin/main\ngit clean -fd",
    note: "会丢弃本地提交、工作区修改和未跟踪文件。执行前必须确认没有要保留的内容。",
    noteEn: "This discards local commits, working-tree changes, and untracked files. Confirm nothing needs to be kept.",
    tags: ["git", "reset", "hard", "危险"]
  },
  {
    id: "git-cherry-pick",
    title: "只拿某个提交",
    titleEn: "Pick one specific commit",
    category: "remote",
    risk: "Check First",
    scenario: "只想把另一个分支上的某个提交拿到当前分支。",
    scenarioEn: "Use when only one commit from another branch should be applied to the current branch.",
    command: "git cherry-pick <commit-id>",
    note: "如果出现冲突，解决后 git cherry-pick --continue；放弃则 git cherry-pick --abort。",
    noteEn: "If conflicts occur, resolve them and run git cherry-pick --continue. Abort with git cherry-pick --abort.",
    tags: ["git", "cherry-pick", "分支", "提交"]
  },
  {
    id: "windows-sleep-1930",
    module: "windows",
    title: "晚上 7 点半进入睡眠",
    titleEn: "Sleep at 19:30",
    category: "windows",
    risk: "Check First",
    scenario: "临时需要让电脑按固定时间休眠时使用，适合放在系统命令模块里。",
    scenarioEn: "Use when the PC should go to sleep at a fixed time.",
    command: 'schtasks /create /tn "Sleep at 19:30" /tr "rundll32.exe powrprof.dll,SetSuspendState 0,1,0" /sc daily /st 19:30',
    note: "如果电脑开启了快速启动/休眠设置，SetSuspendState 的表现可能和预期不同。",
    noteEn: "SetSuspendState can behave differently depending on hibernation and power settings.",
    tags: ["windows", "sleep", "schtasks", "休眠"]
  },
  {
    id: "cloud-cloudflare-pages-root",
    module: "cloud",
    title: "Cloudflare Pages 静态站点设置",
    titleEn: "Cloudflare Pages static site settings",
    category: "cloud",
    risk: "Safe",
    scenario: "纯 HTML/CSS/JS 项目从 GitHub 部署到 Cloudflare Pages 时快速对照。",
    scenarioEn: "Quick reference when deploying a plain HTML/CSS/JS site from GitHub to Cloudflare Pages.",
    command: "Framework preset: None\nBuild command: \nBuild output directory: /",
    note: "这个工作站当前就是静态站点，通常不需要构建命令。",
    noteEn: "This workstation is a static site, so it usually does not need a build command.",
    tags: ["cloudflare", "pages", "github", "deploy"]
  },
  {
    id: "database-supabase-rls-check",
    module: "database",
    title: "检查 Supabase 表是否开启 RLS",
    titleEn: "Check Supabase RLS status",
    category: "database",
    risk: "Safe",
    scenario: "建完表和策略后，用来快速确认 public schema 里的表有没有开启行级安全。",
    scenarioEn: "Use after creating tables and policies to verify row-level security in the public schema.",
    command: "select tablename, rowsecurity\nfrom pg_tables\nwhere schemaname = 'public';",
    note: "个人站也建议开 RLS，再用 user_id 做隔离。",
    noteEn: "RLS is still recommended for a personal site, usually isolated by user_id.",
    tags: ["supabase", "rls", "sql", "database"]
  },
  {
    id: "ai-review-prompt",
    module: "ai",
    title: "让 AI 做页面审查",
    titleEn: "Ask AI to review a page",
    category: "ai",
    risk: "Safe",
    scenario: "页面看着别扭但说不清原因时，用这个提示词让 AI 从用户体验角度挑问题。",
    scenarioEn: "Use when a page feels off and you want an AI review from a user-experience perspective.",
    command: "请以专业产品设计和前端体验审核的角度审查这个页面：\n1. 先指出最影响使用体验的问题\n2. 再指出视觉、布局、交互、文案上的问题\n3. 最后给出优先级明确的修改建议\n不要写空泛赞美，直接说问题。",
    note: "适合你现在这种持续打磨风格基调的流程。",
    noteEn: "Useful for iterative visual and UX refinement.",
    tags: ["ai", "prompt", "review", "ux"]
  },
  {
    id: "ai-api-relay-codex-xiavier",
    module: "ai",
    title: "Codex API 中转站配置",
    titleEn: "Codex API relay config",
    category: "api-relay",
    risk: "Check First",
    scenario: "在新设备或重装 Codex 后，需要快速恢复 Xiavier API 中转站配置时使用。",
    scenarioEn: "Use this to restore the Xiavier API relay setup for Codex on a new or rebuilt machine.",
    layout: "config",
    command: "model_provider = \"Xiavier\"\nmodel = \"gpt-5.5\"\nmodel_reasoning_effort = \"xhigh\"\npreferred_auth_method = \"apikey\"\npersonality = \"pragmatic\"\nnetwork_access = \"enabled\"\n\n[mcp_servers.sqlite-site-db]\nargs = [\"-y\", \"mcp-sqlite\"]\ncommand = \"npx\"\nenabled = true\n\n[model_providers.Xiavier]\nname = \"Xiavier\"\nbase_url = \"https://api.xiavier.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
    snippets: [
      {
        key: "base",
        label: "入口",
        target: "base",
        language: "text",
        content: "https://xiavier.com"
      },
      {
        key: "auth",
        label: "auth.json",
        target: "~/.codex/auth.json",
        language: "json",
        content: "{\n  \"OPENAI_API_KEY\": \"sk-<替换为你的 Xiavier API Key>\"\n}"
      },
      {
        key: "config",
        label: "config.toml",
        target: "~/.codex/config.toml",
        language: "toml",
        primary: true,
        content: "model_provider = \"Xiavier\"\nmodel = \"gpt-5.5\"\nmodel_reasoning_effort = \"xhigh\"\npreferred_auth_method = \"apikey\"\npersonality = \"pragmatic\"\nnetwork_access = \"enabled\"\n\n[mcp_servers.sqlite-site-db]\nargs = [\"-y\", \"mcp-sqlite\"]\ncommand = \"npx\"\nenabled = true\n\n[model_providers.Xiavier]\nname = \"Xiavier\"\nbase_url = \"https://api.xiavier.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true"
      }
    ],
    note: "真实 API Key 不要写进网站源码或 Git 仓库；如果密钥已经暴露，建议在中转站后台重新生成。",
    noteEn: "Never commit a real API key to this site or Git. Rotate the key if it has been exposed.",
    tags: ["ai", "codex", "api-relay", "xiavier", "config"]
  },
  {
    id: "links-workstation-stack",
    module: "links",
    title: "Workstation 技术栈入口",
    titleEn: "Workstation stack links",
    category: "links",
    risk: "Safe",
    scenario: "把这个站点常用后台入口放在一起，换设备时不用到处找。",
    scenarioEn: "Keep common project admin links together for quick access on any device.",
    command: "GitHub: https://github.com/ggbondgh/nanstar-workstation\nCloudflare: https://dash.cloudflare.com/\nSupabase: https://supabase.com/dashboard",
    note: "后面可以把链接做成真正可点击的模块，现在先保留可复制文本。",
    noteEn: "These can become real clickable links later; for now they are copyable text.",
    tags: ["links", "github", "cloudflare", "supabase"]
  },
  {
    id: "templates-commit-message",
    module: "templates",
    title: "提交说明模板",
    titleEn: "Commit message template",
    category: "templates",
    risk: "Safe",
    scenario: "不想每次临时想 commit message 时，直接套这个格式。",
    scenarioEn: "Use when you do not want to invent a commit message format every time.",
    command: "类型：简短说明\n\n改动：\n- \n\n验证：\n- ",
    note: "模板模块以后可以放日报、复盘、PR 描述、AI 提示词等常用文本。",
    noteEn: "The template module can later hold daily logs, reviews, PR descriptions, and prompts.",
    tags: ["template", "commit", "work"]
  },
  {
    id: "wk-flow-clone-build",
    client: "wk",
    module: "clients",
    title: "拉取代码与编译入口",
    titleEn: "Clone and build entry",
    category: "wk-flow",
    risk: "Safe",
    scenario: "微克项目换环境、重新拉仓库或进入编译前先看这张。",
    scenarioEn: "Use this when setting up the WK project or entering the build flow.",
    command: "git clone --recurse-submodules <微克项目 Git 地址>\ncd WK-TG0732-1\npython git_auto_pull.py\npython wk_build_menu.py",
    note: "原笔记里的真实内网 Git 地址已脱敏。Windows 下通常用 python，Linux 下可按环境使用 python3。",
    noteEn: "The original internal Git URL is redacted. Use python on Windows or python3 where appropriate.",
    tags: ["wk", "clone", "submodules", "build"]
  },
  {
    id: "wk-flow-package-paths",
    client: "wk",
    module: "clients",
    title: "烧录包与输出路径",
    titleEn: "Firmware package and output paths",
    category: "wk-flow",
    risk: "Safe",
    scenario: "编译后找烧录包、output 产物或服务器备份目录时使用。",
    scenarioEn: "Use this to locate firmware packages, output artifacts, and server backup folders.",
    command: "本地相对路径：\nWK-TG0732-1\\hisilicon_sdk\\tools\\pkg\\fwpkg\\brandy\n\n服务器路径模板：\n<共享盘>\\<日期>\\WK-TG0732-1\\hisilicon_sdk\\tools\\pkg\\fwpkg\\brandy\n<共享盘>\\<日期>\\WK-TG0732-1\\hisilicon_sdk\\output\\brandy\\acore\\brandy-ssb-native-js",
    note: "真实共享盘盘符、日期目录和人员目录建议保留在私有笔记里，工作台只放路径结构。",
    noteEn: "Keep real drive letters, date folders, and personal directories in private notes.",
    tags: ["wk", "fwpkg", "output", "brandy", "烧录"]
  },
  {
    id: "wk-flow-clean-build-error",
    client: "wk",
    module: "clients",
    title: "编译报错后清理缓存",
    titleEn: "Clean build cache after errors",
    category: "wk-flow",
    risk: "Check First",
    scenario: "编译异常、文件系统镜像或 output 状态不干净时，先按这两个位置清理。",
    scenarioEn: "Use when build artifacts or filesystem image state appears stale.",
    command: "删除文件系统目录：\nWK-TG0732-1/hisilicon_sdk/build/config/target_config/brandy/mk_fs_image/fs\n\n删除编译输出目录：\nWK-TG0732-1/hisilicon_sdk/output",
    note: "删除前确认没有需要保留的本地构建产物。",
    noteEn: "Confirm no local build artifacts need to be kept before deleting.",
    tags: ["wk", "clean", "output", "build error"]
  },
  {
    id: "wk-flow-dump-package",
    client: "wk",
    module: "clients",
    title: "Dump 目录与 ELF 对应关系",
    titleEn: "Dump folder and ELF matching",
    category: "wk-flow",
    risk: "Safe",
    scenario: "需要给 dump 分析环境准备对应版本 ELF 时使用。",
    scenarioEn: "Use when preparing matching ELF files for dump analysis.",
    command: "设备 dump 目录：\n/user/temp/exc/\n\n共享目录模板：\n\\\\<服务器IP>\\中转站\\hisiDump\n\n需要放入：\nWK-TG0732-1\\bin_bak\\<烧录的对应版本文件夹>\\application.elf",
    note: "真实服务器 IP 已脱敏。关键是 dump 要配对应烧录版本的 application.elf。",
    noteEn: "The real server IP is redacted. Match the dump with the exact flashed application.elf.",
    tags: ["wk", "dump", "elf", "application"]
  },
  {
    id: "wk-paths-common-changes",
    client: "wk",
    module: "clients",
    title: "常用修改位置",
    titleEn: "Common edit locations",
    category: "wk-paths",
    risk: "Check First",
    scenario: "改蓝牙 MAC、蓝牙名称、屏幕常亮时快速定位文件。",
    scenarioEn: "Use to quickly find common Bluetooth and display edit points.",
    command: "蓝牙 MAC：\nWK-TG0732-1/wk_framework/component/bluetooth/bt_addr.h\n#define BT_MAC_ADDR 0x12, 0x34, 0x56, 0x66, 0x66, 0x99\n\n音频蓝牙名称：\nWK-TG0732-1/wk_framework/component/bluetooth/bt_comm.c\n#define BR_NAME CONFIG_BLE_DEVICE_NAME\" <名称>\"\n\n屏幕常亮：\nWK-TG0732-1/hisilicon_sdk/application/wearable/service/power_manager/src/power_display_service.c\n#define DISPLAY_AUTO_POWER_OFF_PERIOD_MS UINT32_MAX",
    note: "示例里的蓝牙名已替换成占位符，避免把临时测试名写进正式资料。",
    noteEn: "The Bluetooth name is represented as a placeholder.",
    tags: ["wk", "bluetooth", "screen", "path"]
  },
  {
    id: "wk-paths-ui-launcher",
    client: "wk",
    module: "clients",
    title: "UI 控件与主菜单位置",
    titleEn: "UI components and launcher paths",
    category: "wk-paths",
    risk: "Safe",
    scenario: "找公共控件、加载控件、主菜单应用注册或排序时使用。",
    scenarioEn: "Use when finding common UI components or launcher registration order.",
    command: "公共控件：\nWK-TG0732-1/hisilicon_sdk/wk_application/wk_display_comm/element/\n\n加载控件示例：\nwk_Loading.cpp\n\n主菜单应用注册/排序：\nWK-TG0732-1/hisilicon_sdk/application/wearable/nativeapp/nativelauncher/include/AppViewIDs.h",
    note: "这一类路径很适合工作台，因为搜索路径比临时翻笔记更快。",
    noteEn: "Paths like these fit the workstation well because search is faster than browsing notes.",
    tags: ["wk", "ui", "launcher", "AppViewIDs"]
  },
  {
    id: "wk-paths-flash-optimization",
    client: "wk",
    module: "clients",
    title: "优化烧录相关配置",
    titleEn: "Flash optimization config files",
    category: "wk-paths",
    risk: "Check First",
    scenario: "需要调整烧录、文件系统或 nandflash 配置时快速定位。",
    scenarioEn: "Use when adjusting flash, filesystem, or NAND configuration.",
    command: "config.py\ncommon_config.py\nnandflash_config.c\n\n路径模板：\nWK-TG0732-1/hisilicon_sdk/build/config/target_config/brandy/config.py\nWK-TG0732-1/hisilicon_sdk/build/config/target_config/common_config.py\nWK-TG0732-1/hisilicon_sdk/bootloader/flashboot/brandy/nandflash/nandflash_config.c",
    note: "改这类配置前建议先记录当前版本和差异。",
    noteEn: "Record the current version and diff before editing these files.",
    tags: ["wk", "flash", "config", "nandflash"]
  },
  {
    id: "wk-interfaces-screen-size",
    client: "wk",
    module: "clients",
    title: "获取全屏尺寸",
    titleEn: "Get full screen size",
    category: "wk-interfaces",
    risk: "Safe",
    scenario: "写 UI 布局或适配屏幕宽高时使用。",
    scenarioEn: "Use when writing UI layout or adapting to screen dimensions.",
    command: '#include "common/screen.h"\n\nuint16_t hor_pixel = OHOS::Screen::GetInstance().GetWidth();\nuint16_t ver_pixel = OHOS::Screen::GetInstance().GetHeight();',
    note: "适合放成可复制代码片段。",
    noteEn: "Good as a copyable snippet.",
    tags: ["wk", "screen", "ui", "OHOS"]
  },
  {
    id: "wk-interfaces-hardware",
    client: "wk",
    module: "clients",
    title: "震动、亮屏、蓝牙连接接口",
    titleEn: "Motor, screen, and Bluetooth APIs",
    category: "wk-interfaces",
    risk: "Safe",
    scenario: "需要调用震动、亮屏/灭屏、判断蓝牙连接状态时快速定位。",
    scenarioEn: "Use to find motor, screen, and Bluetooth connection APIs.",
    command: "震动：\nuapi_motor_control_equal_cycle\nWK-TG0732-1/hisilicon_sdk/drivers/drivers/driver/motor/motor_api.c\n\n亮屏/灭屏：\nScreenKeepOnTimeout\nScreenTurnOnOrExitAod\nScreenTurnOffOrEnterAod\nWK-TG0732-1/hisilicon_sdk/application/wearable/ntiveapp/nativeui/uiservice/src/ui_service.cpp\n\n蓝牙是否连接：\napp_is_connect(void)\nWK-TG0732-1/hisilicon_sdk/wk_framework/service/service_comm/service_comm.cpp",
    note: "原笔记里 ui_service 路径写作 ntiveapp，先按原路径保留；如果项目里实际是 nativeapp，后续可校正。",
    noteEn: "The ui_service path follows the original note and can be corrected later if needed.",
    tags: ["wk", "motor", "screen", "bluetooth", "api"]
  },
  {
    id: "wk-interfaces-slice-previous",
    client: "wk",
    module: "clients",
    title: "Slice 获取上一个页面 ID",
    titleEn: "Get previous Slice ID",
    category: "wk-interfaces",
    risk: "Safe",
    scenario: "需要判断上一页是否有效时使用。",
    scenarioEn: "Use when checking whether the previous Slice is valid.",
    command: "uint16_t preSliceId = NativeAbility::GetInstance().GetPreSliceId();\n\nif (preSliceId != gSliceInvalid && preSliceId != 0) {\n    // 有效\n} else {\n    // 无效\n}",
    note: "这是典型项目经验片段，适合工作台长期保存。",
    noteEn: "This is project-specific knowledge worth keeping in the workstation.",
    tags: ["wk", "Slice", "NativeAbility", "ui"]
  },
  {
    id: "wk-snippets-headers",
    client: "wk",
    module: "clients",
    title: "常用头文件",
    titleEn: "Common headers",
    category: "wk-snippets",
    risk: "Safe",
    scenario: "新建或补功能文件时快速复制常见 include。",
    scenarioEn: "Use when creating or extending feature files.",
    command: '#include "ble_wearfit_manager.h"\n#include "ble_wearfit_features.h"\n#include "ble_wearfit_protocol.h"\n#include "wearable_log.h"\n#include "errcode.h"\n#include "nv.h"\n#include "wk_nv_id.h"\n#include "app_nv_id.h"\n#include "wk_uidatasubs.h"',
    note: "后续可以再按功能拆成蓝牙/NV/UI 三类头文件。",
    noteEn: "Can later be split into Bluetooth, NV, and UI header groups.",
    tags: ["wk", "headers", "include"]
  },
  {
    id: "wk-snippets-nv-storage",
    client: "wk",
    module: "clients",
    title: "NV 存储读写模板",
    titleEn: "NV storage template",
    category: "wk-snippets",
    risk: "Safe",
    scenario: "新增配置项，需要 set/get/init 三件套时直接套用。",
    scenarioEn: "Use when adding a config item with set/get/init helpers.",
    command: "errcode_t sn_cfg_set(sn_cfg_t *data)\n{\n    errcode_t ret = uapi_nv_write(SETTING_NV_ID_NOT_DISTURB_CFG, (uint8_t*)data, sizeof(sn_cfg_t));\n    return ret;\n}\n\nerrcode_t sn_cfg_get(sn_cfg_t *data)\n{\n    uint16_t nvsize = 0;\n    errcode_t ret = uapi_nv_read(SETTING_NV_ID_NOT_DISTURB_CFG, sizeof(sn_cfg_t), &nvsize, (uint8_t*)data);\n    return ret;\n}\n\nerrcode_t sn_cfg_init(void)\n{\n    sn_cfg_t data = {0};\n    uint16_t nvsize = 0;\n    errcode_t ret = uapi_nv_read(SETTING_NV_ID_NOT_DISTURB_CFG, sizeof(sn_cfg_t), &nvsize, (uint8_t*)&data);\n    if (ret != ERRCODE_SUCC && nvsize != sizeof(sn_cfg_t)) {\n        ret = uapi_nv_write(SETTING_NV_ID_NOT_DISTURB_CFG, (uint8_t*)&data, sizeof(sn_cfg_t));\n    }\n    return ret;\n}",
    note: "实际使用时替换结构体、NV ID 和默认值。",
    noteEn: "Replace the struct, NV ID, and defaults before use.",
    tags: ["wk", "nv", "storage", "template"]
  },
  {
    id: "wk-snippets-compile-guards",
    client: "wk",
    module: "clients",
    title: "编译保护模板",
    titleEn: "Compile guard templates",
    category: "wk-snippets",
    risk: "Safe",
    scenario: "C/C++ 混编、模拟器环境隔离或底层硬件调用保护时使用。",
    scenarioEn: "Use for C/C++ linkage and simulator/hardware guards.",
    command: "extern \"C\" {\n\n} // extern \"C\"\n\n#ifdef __cplusplus\nextern \"C\" {\n#endif\n\n#ifdef __cplusplus\n}\n#endif\n\n#if !defined(_WIN32)\n// 调用底层硬件，防止模拟器/Windows 环境编译\n#endif",
    note: "这类片段适合放工作台，因为每次临时写容易漏括号或宏。",
    noteEn: "Good workstation material because it is easy to mistype these guards.",
    tags: ["wk", "extern C", "_WIN32", "compile"]
  },
  {
    id: "wk-test-monkey-at",
    client: "wk",
    module: "clients",
    title: "Monkey / AT 测试命令",
    titleEn: "Monkey and AT commands",
    category: "wk-test",
    risk: "Safe",
    scenario: "测试所有应用、停止测试、模拟消息通知或指定应用测试时使用。",
    scenarioEn: "Use to test all apps, stop tests, simulate notifications, or target a specific app.",
    command: "AT^UIKIT_DFX=testapp start\nAT^UIKIT_DFX=testapp all\nAT^UIKIT_DFX=testapp STOP\nAT^UIKIT_DFX=testapp VIEW_CONTACTS_WK\nAT^UIKIT_DFX=sms 7 hello:kkk\nAT^UIKIT_DFX=testapp VIEW_BAIDU_MAPS_WK\nAT^UIKIT_DFX=testapp VIEW_WECHAT_MSG_WK",
    note: "短信命令里 7 表示 QQ 类型，冒号用于分隔发件人和内容。",
    noteEn: "In the SMS command, 7 represents QQ type and colon separates sender from content.",
    tags: ["wk", "monkey", "AT", "testapp", "sms"]
  },
  {
    id: "wk-ops-vscode-ssh",
    client: "wk",
    module: "clients",
    title: "VS Code Remote-SSH 模板",
    titleEn: "VS Code Remote-SSH template",
    category: "wk-ops",
    risk: "Safe",
    scenario: "重新添加 SSH 目标或换网口后连接混乱时使用。",
    scenarioEn: "Use when re-adding SSH targets or when network changes cause wrong server selection.",
    command: "Ctrl + Shift + P\nRemote-SSH: Add New SSH Host\nssh <用户名>@<服务器IP>\n\n或编辑 SSH 配置：\nHost company-server\n    HostName <服务器IP>\n    User <用户名>\n    Port 22\n    ServerAliveInterval 60\n    ServerAliveCountMax 3",
    note: "真实服务器 IP、用户名、RemoteForward 端口已脱敏。不要把客户账号密码写进公开仓库。",
    noteEn: "Real IP, username, and forwarding details are redacted. Do not commit customer credentials.",
    tags: ["wk", "ssh", "vscode", "remote"]
  },
  {
    id: "wk-ops-share-transfer",
    client: "wk",
    module: "clients",
    title: "共享目录访问模板",
    titleEn: "Shared folder access template",
    category: "wk-ops",
    risk: "Safe",
    scenario: "需要通过 Windows 访问中转站、dump 目录或临时共享文件时使用。",
    scenarioEn: "Use when accessing transfer folders, dump directories, or temporary shares from Windows.",
    command: "Win + R\n\\\\<服务器IP>\n\n常见目录模板：\n\\\\<服务器IP>\\中转站\\hisiDump",
    note: "这里只保留操作方式和目录结构，真实 IP 不进站点源码。",
    noteEn: "Only the workflow and folder pattern are kept; the real IP is not stored in source.",
    tags: ["wk", "share", "windows", "dump"]
  },
  {
    id: "wk-checklist-exit-cleanup",
    client: "wk",
    module: "clients",
    title: "临时设备退出清单",
    titleEn: "Temporary device exit checklist",
    category: "wk-checklist",
    risk: "Check First",
    scenario: "离开客户设备、临时电脑或共享电脑前检查。",
    scenarioEn: "Use before leaving a customer, temporary, or shared device.",
    command: "1. 退出微软账号、OneDrive、微信、钉钉\n2. 删除微信聊天记录、钉钉缓存、OneDrive 挂载目录等\n3. 卸载临时安装的软件\n4. 转移并删除资料\n5. 清空回收站\n6. 检查浏览器登录状态和下载目录",
    note: "这是适合放工作台的清单，但不应该附带任何账号密码。",
    noteEn: "This checklist fits the workstation, but must not include account credentials.",
    tags: ["wk", "checklist", "cleanup", "exit"]
  }
];

const celestialCopy = {
  Sun: {
    cn: "太阳",
    desc: "太阳是太阳系中心，提供光与能量。这个模块里它代表整个工作站的核心入口。",
    descEn: "The Sun anchors the system. Here it represents the core entry of the workstation."
  },
  Mercury: {
    cn: "水星",
    desc: "水星离太阳最近、节奏最快，适合代表高频、轻量、随手就用的命令。",
    descEn: "Mercury is fast and close to the Sun, fitting quick commands used often."
  },
  Venus: {
    cn: "金星",
    desc: "金星明亮、稳定，适合承载配置、身份、模板这类基础设置。",
    descEn: "Venus feels bright and steady, fitting identity, config, and setup cards."
  },
  Earth: {
    cn: "地球",
    desc: "地球代表当前工作坐标，对应远程同步、项目环境和日常协作。",
    descEn: "Earth marks the current working coordinate: remotes, sync, and collaboration."
  },
  Mars: {
    cn: "火星",
    desc: "火星带有警示感，适合撤销、恢复、修复这些需要谨慎处理的操作。",
    descEn: "Mars carries a warning tone, fitting undo, recovery, and repair actions."
  },
  Jupiter: {
    cn: "木星",
    desc: "木星体量最大，可以代表大型工具、主项目和承载力最强的模块。",
    descEn: "Jupiter is the largest planet, fitting major tools and heavy modules."
  },
  Saturn: {
    cn: "土星",
    desc: "土星有清晰的环，适合归档、边界、规则和暂存现场。",
    descEn: "Saturn's rings fit boundaries, rules, archives, and stash context."
  },
  Uranus: {
    cn: "天王星",
    desc: "天王星冷静疏离，适合外部入口、链接地图和低频但重要的路径。",
    descEn: "Uranus feels quiet and distant, fitting external links and low-frequency paths."
  },
  Neptune: {
    cn: "海王星",
    desc: "海王星深远安静，适合高风险操作、长期项目和系统外层边界。",
    descEn: "Neptune feels deep and remote, fitting careful operations and outer boundaries."
  }
};

const elements = {
  toast: document.getElementById("toast"),
  pageEyebrow: document.getElementById("pageEyebrow"),
  pageTitle: document.getElementById("pageTitle"),
  starscape: document.querySelector(".starscape"),
  main: document.getElementById("mainScroll"),
  themeToggle: document.getElementById("themeToggle"),
  languageToggle: document.getElementById("languageToggle"),
  themeMeta: document.querySelector('meta[name="theme-color"]'),
  brandSub: document.querySelector(".brand p"),
  nav: document.querySelector(".nav"),
  addModuleButton: document.getElementById("addModuleButton"),
  moduleMenu: document.getElementById("moduleMenu"),
  moduleDialog: document.getElementById("moduleDialog"),
  moduleForm: document.getElementById("moduleForm"),
  moduleDialogEyebrow: document.getElementById("moduleDialogEyebrow"),
  moduleDialogTitle: document.getElementById("moduleDialogTitle"),
  moduleSubmitButton: document.getElementById("moduleSubmitButton"),
  clientSelect: null,
  quickSearch: document.getElementById("quickSearch"),
  clearSearch: document.getElementById("clearSearch"),
  quickFilters: document.getElementById("quickFilters"),
  totalCount: document.getElementById("totalCount"),
  favoriteCount: document.getElementById("favoriteCount"),
  customCount: document.getElementById("customCount"),
  visibleCount: document.getElementById("visibleCount"),
  resultEyebrow: document.getElementById("resultEyebrow"),
  resultTitle: document.getElementById("resultTitle"),
  resultCount: document.getElementById("resultCount"),
  cardGrid: document.getElementById("cardGrid"),
  detailPanel: document.getElementById("detailPanel"),
  showFavorites: document.getElementById("showFavorites"),
  addCardButton: document.getElementById("addCardButton"),
  syncButton: document.getElementById("syncButton"),
  syncDot: document.getElementById("syncDot"),
  syncDialog: document.getElementById("syncDialog"),
  syncForm: document.getElementById("syncForm"),
  syncStatusText: document.getElementById("syncStatusText"),
  syncSignIn: document.getElementById("syncSignIn"),
  syncSignUp: document.getElementById("syncSignUp"),
  syncSignOut: document.getElementById("syncSignOut"),
  syncNow: document.getElementById("syncNow"),
  cardDialog: document.getElementById("cardDialog"),
  cardForm: document.getElementById("cardForm"),
  solarExpand: document.getElementById("solarExpand"),
  solarClose: document.getElementById("solarClose"),
  solarOverlay: document.getElementById("solarOverlay"),
  solarSystemLarge: document.getElementById("solarSystemLarge"),
  celestialInfo: document.getElementById("celestialInfo"),
  detailContent: document.getElementById("detailContent")
};

const state = {
  module: "git",
  client: "wk",
  category: "all",
  search: "",
  favoritesOnly: false,
  selectedId: null,
  editingId: null,
  editingLayout: null,
  language: localStorage.getItem(storageKeys.language) === "en" ? "en" : "zh",
  syncUser: null,
  syncStatus: "offline",
  isSyncing: false,
  suppressSync: false,
  draggedModule: null,
  dragMoved: false,
  navPressTimer: null,
  navPressButton: null,
  navPointerId: null,
  navPointerActive: false,
  navStartX: 0,
  navStartY: 0,
  moduleMenuTarget: null,
  editingModuleId: null
};

let favorites = new Set(readJson(storageKeys.favorites, []));
let customCards = readJson(storageKeys.customCards, []).filter(isValidCustomCard);
let editedCards = readJson(storageKeys.editedCards, []).filter(isValidCustomCard);
let deletedCards = new Set(readJson(storageKeys.deletedCards, []));
let recentCards = readJson(storageKeys.recentCards, []);
let cardFrequency = readJson(storageKeys.cardFrequency, {});
let customModules = readJson(storageKeys.customModules, []).filter(isValidCustomModule);
let moduleOrder = normalizeModuleOrder(readJson(storageKeys.moduleOrder, defaultModuleOrder));

const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
renderNav();
applyTheme(localStorage.getItem(storageKeys.theme) || systemTheme);
applyLanguage(state.language);
bindEvents();
render();
initSync();

function bindEvents() {
  elements.nav?.addEventListener("click", (event) => {
    const button = event.target.closest(".nav-item");
    if (!button) return;
    if (state.dragMoved) {
      state.dragMoved = false;
      return;
    }
    const nextModule = moduleMeta[button.dataset.module] ? button.dataset.module : "git";
    if (state.module !== nextModule) {
      state.search = "";
      if (elements.quickSearch) elements.quickSearch.value = "";
    }
    state.module = nextModule;
    state.category = "all";
    state.favoritesOnly = false;
    syncCategoryUi();
    render();
    scrollMainTop();
  });

  elements.nav?.addEventListener("contextmenu", (event) => {
    const button = event.target.closest(".nav-item");
    if (!button) return;
    event.preventDefault();
    openModuleMenu(button.dataset.module || "", event.clientX, event.clientY);
  });

  elements.nav?.addEventListener("pointerdown", (event) => {
    const handle = event.target.closest(".nav-drag-handle");
    const button = event.target.closest(".nav-item");
    if (!button || event.button !== 0) return;
    state.navPointerActive = true;
    state.navPointerId = event.pointerId;
    state.navPressButton = button;
    state.navStartX = event.clientX;
    state.navStartY = event.clientY;
    try {
      button.setPointerCapture?.(event.pointerId);
    } catch (error) {
      // Pointer capture can fail if the browser already released the pointer.
    }
    if (handle) {
      event.preventDefault();
      startNavSort(button, event.pointerId);
      return;
    }
    clearTimeout(state.navPressTimer);
    state.navPressTimer = setTimeout(() => {
      if (!state.navPointerActive || state.navPressButton !== button) return;
      startNavSort(button, event.pointerId);
    }, 260);
  });

  window.addEventListener("pointermove", (event) => {
    if (!state.navPointerActive || event.pointerId !== state.navPointerId) return;
    if (!state.draggedModule) return;
    event.preventDefault?.();
    const target = getNavItemAtPoint(event.clientX, event.clientY);
    if (!target || target.dataset.module === state.draggedModule) return;
    const rect = target.getBoundingClientRect();
    const placeAfter = event.clientY > rect.top + rect.height / 2;
    moveNavItem(state.draggedModule, target.dataset.module || "", placeAfter);
  });

  window.addEventListener("pointerup", (event) => {
    if (state.navPointerId !== null && event.pointerId !== state.navPointerId) return;
    finishNavSort();
  });

  window.addEventListener("pointercancel", (event) => {
    if (state.navPointerId !== null && event.pointerId !== state.navPointerId) return;
    cancelNavSort();
  });

  elements.quickSearch?.addEventListener("input", debounce((event) => {
    state.search = event.target.value.trim();
    render();
  }, 180));

  elements.clearSearch?.addEventListener("click", () => {
    state.search = "";
    elements.quickSearch.value = "";
    render();
  });

  elements.quickFilters?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    if (state.module !== "git" && state.module !== "clients") return;
    const nextCategory = button.dataset.filter || "all";
    state.category = state.category === nextCategory ? "all" : nextCategory;
    state.favoritesOnly = false;
    syncCategoryUi();
    render();
    scrollMainTop();
  });

  elements.showFavorites?.addEventListener("click", () => {
    state.favoritesOnly = !state.favoritesOnly;
    render();
    scrollMainTop();
  });

  elements.addCardButton?.addEventListener("click", () => {
    openCardDialog();
  });

  elements.addModuleButton?.addEventListener("click", () => {
    openModuleDialog();
  });

  elements.moduleForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.submitter?.value === "cancel") {
      elements.moduleDialog?.close("cancel");
      resetModuleDialog();
      return;
    }
    saveModuleForm(new FormData(elements.moduleForm));
  });

  elements.moduleMenu?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-module-action]");
    const action = button?.dataset.moduleAction;
    if (!button || !action || !state.moduleMenuTarget) return;
    if (action === "rename") {
      openModuleDialog(state.moduleMenuTarget);
      closeModuleMenu();
    }
    if (action === "delete") handleDeleteModuleMenu(button, state.moduleMenuTarget);
  });

  document.addEventListener("click", (event) => {
    if (!elements.moduleMenu || elements.moduleMenu.hidden) return;
    if (event.target.closest("#moduleMenu")) return;
    closeModuleMenu();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModuleMenu();
  });

  elements.syncButton?.addEventListener("click", () => {
    elements.syncDialog?.showModal();
    elements.syncForm?.elements.email?.focus();
    renderSyncUi();
  });

  elements.syncDialog?.addEventListener("close", () => {
    elements.syncForm?.elements.password && (elements.syncForm.elements.password.value = "");
  });

  elements.syncForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.submitter?.value === "cancel") {
      elements.syncDialog?.close("cancel");
    }
  });

  elements.syncSignIn?.addEventListener("click", () => signInSync());
  elements.syncSignUp?.addEventListener("click", () => signUpSync());
  elements.syncSignOut?.addEventListener("click", () => signOutSync());
  elements.syncNow?.addEventListener("click", () => syncCloudState({ showDoneToast: true, preferLocal: true }));

  elements.cardDialog?.addEventListener("close", () => {
    if (elements.cardDialog.returnValue !== "default") {
      resetCardDialog();
    }
  });

  elements.cardForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitter = event.submitter;
    if (submitter?.value === "cancel") {
      elements.cardDialog.close("cancel");
      return;
    }
    saveCardForm(new FormData(elements.cardForm));
  });

  elements.themeToggle?.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("theme-light") ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem(storageKeys.theme, nextTheme);
    touchLocalState();
    scheduleCloudSync({ preferLocal: true });
  });

  elements.languageToggle?.addEventListener("click", () => {
    state.language = state.language === "zh" ? "en" : "zh";
    localStorage.setItem(storageKeys.language, state.language);
    touchLocalState();
    applyLanguage(state.language);
    render();
    scheduleCloudSync({ preferLocal: true });
  });

  elements.cardGrid?.addEventListener("click", async (event) => {
    const copyLineButton = event.target.closest("[data-action='copy-line']");
    const copyButton = event.target.closest("[data-action='copy']");
    const favoriteButton = event.target.closest("[data-action='favorite']");
    const editButton = event.target.closest("[data-action='edit']");
    const deleteButton = event.target.closest("[data-action='delete']");
    const card = event.target.closest(".command-card");
    const commandBlock = event.target.closest(".command-block");

    if (copyLineButton) {
      event.stopPropagation();
      const cardId = copyLineButton.closest(".command-card")?.dataset.id;
      const copied = await copyText(copyLineButton.dataset.command || "");
      if (copied && cardId) recordCardUsage(cardId);
      return;
    }

    if (copyButton) {
      event.stopPropagation();
      const cardId = copyButton.dataset.id;
      const copied = await copyText(copyButton.dataset.command || "");
      if (copied && cardId) recordCardUsage(cardId);
      return;
    }

    if (favoriteButton) {
      event.stopPropagation();
      toggleFavorite(favoriteButton.dataset.id || "");
      return;
    }

    if (editButton) {
      event.stopPropagation();
      openEditCardDialog(editButton.dataset.id || "");
      return;
    }

    if (deleteButton) {
      event.stopPropagation();
      handleDeleteCard(deleteButton);
      return;
    }

    if (commandBlock || hasTextSelection()) {
      return;
    }

    if (card?.dataset.id) {
      state.selectedId = card.dataset.id;
      render();
    }
  });

  elements.detailPanel?.addEventListener("click", async (event) => {
    const copyButton = event.target.closest("[data-action='copy']");

    if (copyButton) {
      event.stopPropagation();
      const copied = await copyText(copyButton.dataset.command || "");
      if (copied && state.selectedId) recordCardUsage(state.selectedId);
    }
  });

  elements.cardGrid?.addEventListener("keydown", (event) => {
    const card = event.target.closest(".command-card");
    if (!card) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      state.selectedId = card.dataset.id || null;
      render();
    }
  });

  elements.solarExpand?.addEventListener("click", openSolarOverlay);
  elements.solarClose?.addEventListener("click", closeSolarOverlay);

  elements.solarOverlay?.addEventListener("click", (event) => {
    const clickedControl = event.target.closest("button");
    const clickedInfo = event.target.closest(".celestial-info");
    const clickedSolarSystem = event.target.closest("#solarSystemLarge");
    if (clickedControl || clickedInfo || clickedSolarSystem) return;
    clearCelestialSelection();
  });

  elements.solarSystemLarge?.addEventListener("click", (event) => {
    const target = findClosestCelestial(event, Array.from(elements.solarSystemLarge.querySelectorAll("[data-celestial-en]")));
    if (!target) {
      clearCelestialSelection();
      return;
    }
    selectCelestial(target);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("solar-open")) {
      closeSolarOverlay();
    }
  });

  window.addEventListener("mousemove", (event) => {
    if (!elements.starscape) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 8;
    elements.starscape.style.transform = `translate(${x * -0.35}px, ${y * -0.28}px) scale(1.025)`;
  });

  window.addEventListener("mouseleave", () => {
    if (elements.starscape) elements.starscape.style.transform = "translate(0, 0) scale(1)";
  });
}

function render() {
  const cards = getAllCards();
  const visibleCards = filterCards(cards);
  const moduleCards = cards.filter((card) => isCardInCurrentModuleForCount(card, state.module));
  if (state.selectedId && !visibleCards.some((card) => card.id === state.selectedId)) {
    state.selectedId = visibleCards[0]?.id || null;
  }
  if (state.selectedId && !cards.some((card) => card.id === state.selectedId)) {
    state.selectedId = null;
  }
  if (!state.selectedId && visibleCards.length) {
    state.selectedId = visibleCards[0].id;
  }

  renderHeader(visibleCards.length, moduleCards.length);
  renderCards(visibleCards);
  renderDetail(cards.find((card) => card.id === state.selectedId));
}

function renderHeader(visibleCount, totalCount) {
  const module = moduleMeta[state.module] || moduleMeta.git;
  const category = state.module === "clients" ? clientCategoryMeta[state.category] || clientCategoryMeta.all : categoryMeta[state.category] || categoryMeta.all;
  const t = getText();
  const modeLabel = state.favoritesOnly ? t.favorites : null;
  elements.pageEyebrow.textContent = modeLabel ? `${localizeMeta(module, "label")} / ${modeLabel}` : module.eyebrow;
  elements.pageTitle.textContent = modeLabel ? t.favoriteCards : localizeMeta(module, "title");
  elements.resultEyebrow.textContent = modeLabel ? t.favoriteCards : t.resultEyebrow;
  elements.resultTitle.textContent = getResultTitle(module, category, modeLabel, t);
  renderClientControls();
  renderQuickFilters();
  elements.resultCount.textContent = `${visibleCount} ${t.cardsUnit}`;
  if (elements.totalCount) elements.totalCount.textContent = String(totalCount);
  if (elements.favoriteCount) elements.favoriteCount.textContent = String(getModuleFavoriteCount(state.module));
  if (elements.customCount) elements.customCount.textContent = String(customCards.length);
  if (elements.visibleCount) elements.visibleCount.textContent = String(visibleCount);
  elements.showFavorites?.classList.toggle("active", state.favoritesOnly);
  if (elements.showFavorites) elements.showFavorites.textContent = state.favoritesOnly ? t.exitFavorites : t.favorites;
  if (elements.quickSearch) elements.quickSearch.placeholder = localizeMeta(module, "searchPlaceholder") || t.searchPlaceholder;
  document.querySelector(".focus-copy h3").textContent = localizeMeta(module, "focusTitle") || t.focusTitle;
  syncCategoryUi();
}

function renderCards(cards) {
  const t = getText();
  if (!cards.length) {
    elements.cardGrid.innerHTML = `
      <div class="empty-state">
        <strong>${escapeHtml(t.noMatchTitle)}</strong>
        <p>${escapeHtml(t.noMatchBody)}</p>
      </div>
    `;
    return;
  }

  elements.cardGrid.innerHTML = cards.map((card) => {
    const isFavorite = favorites.has(card.id);
    const module = moduleMeta[getCardModule(card)] || moduleMeta.git;
    const categoryLabel = getCardCategoryLabel(card);
    const moduleLabel = getCardModuleLabel(card, module, t);
    const title = localizeCard(card, "title");
    const scenario = localizeCard(card, "scenario");
    const titleHtml = state.search ? highlightText(title, state.search) : escapeHtml(title);
    const noteHtml = state.search ? highlightText(scenario, state.search) : escapeHtml(scenario);
    const snippetHtml = card.layout === "config"
      ? renderConfigSnippets(card, t)
      : renderCommandBlock(card, t);
    const commandLineCount = String(card.command || "").split("\n").length;
    const copyLabel = card.layout === "config" ? t.copyConfig : commandLineCount > 1 ? t.copyAll : t.copy;
    return `
      <article class="command-card ${getCardClass(card)} ${state.selectedId === card.id ? "selected" : ""}" data-id="${escapeAttr(card.id)}" tabindex="0">
        <header>
          <div class="card-head">
            <span class="card-type">${escapeHtml(categoryLabel)} / ${card.custom ? t.custom : moduleLabel}</span>
            <h4>${titleHtml}</h4>
          </div>
        </header>
        <div class="card-body">
          <p class="card-note">${noteHtml}</p>
          ${snippetHtml}
        </div>
        <footer class="card-meta">
          <div class="actions">
            <button class="copy-button favorite-button ${isFavorite ? "is-favorite" : ""}" type="button" data-action="favorite" data-id="${escapeAttr(card.id)}" aria-label="${escapeAttr(t.favoriteAction)} ${escapeAttr(title)}">${isFavorite ? "★" : "☆"}</button>
            <button class="copy-button" type="button" data-action="copy" data-command="${escapeAttr(card.command)}" data-id="${escapeAttr(card.id)}">${escapeHtml(copyLabel)}</button>
            <button class="copy-button edit-button" type="button" data-action="edit" data-id="${escapeAttr(card.id)}" aria-label="${escapeAttr(t.editAction)} ${escapeAttr(title)}">${escapeHtml(t.editAction)}</button>
            <button class="copy-button delete-button" type="button" data-action="delete" data-id="${escapeAttr(card.id)}" aria-label="${escapeAttr(t.deleteAction)} ${escapeAttr(title)}">${escapeHtml(t.deleteAction)}</button>
          </div>
        </footer>
      </article>
    `;
  }).join("");
}

function renderCommandBlock(card, t) {
  if (shouldRenderPlainCommandBlock(card)) {
    return `<pre class="command-block command-block-plain"><code>${escapeHtml(card.command || "")}</code></pre>`;
  }

  const commandLines = String(card.command || "").split("\n");
  const commandHtml = commandLines.map((line) =>
    `<div class="command-line"><span class="line-text">${escapeHtml(line)}</span><button class="copy-line-button" type="button" data-action="copy-line" data-command="${escapeAttr(line)}" title="${escapeAttr(t.copyLine)}">${escapeHtml(t.copy)}</button></div>`
  ).join("");
  return `<pre class="command-block">${commandHtml}</pre>`;
}

function shouldRenderPlainCommandBlock(card) {
  const module = getCardModule(card);
  return card?.category === "wk-snippets" || Boolean(card?.custom && module !== "git");
}

function renderConfigSnippets(card, t) {
  const snippets = Array.isArray(card.snippets) && card.snippets.length
    ? card.snippets
    : [{
        label: "配置",
        target: card.target || "",
        language: card.language || "toml",
        content: card.command || "",
        primary: true
      }];
  return `
    <div class="snippet-stack">
      ${snippets.map((snippet) => renderSnippet(snippet, card, t)).join("")}
    </div>
  `;
}

function renderSnippet(snippet, card, t) {
  const target = clean(snippet.target);
  const label = clean(snippet.label);
  const language = clean(snippet.language) || "text";
  const content = String(snippet.content || "");
  const title = target ? `${label} · ${target}` : label;
  return `
    <section class="snippet-block ${snippet.primary ? "is-primary" : ""}">
      <div class="snippet-head">
        <div>
          <strong>${escapeHtml(label)}</strong>
          ${target ? `<span>${escapeHtml(target)}</span>` : ""}
        </div>
        <button class="copy-button snippet-copy" type="button" data-action="copy" data-command="${escapeAttr(content)}" data-id="${escapeAttr(card.id)}" aria-label="${escapeAttr(title)}">${escapeHtml(t.copySnippet)}</button>
      </div>
      <pre class="command-block"><code class="language-${escapeAttr(language)}">${escapeHtml(content)}</code></pre>
    </section>
  `;
}

function renderDetail(card) {
  const t = getText();
  if (!card) {
    const detailContent = elements.detailPanel?.querySelector(".detail-content");
    if (detailContent) {
      detailContent.innerHTML = `
        <h3>${escapeHtml(t.pickCardTitle)}</h3>
        <p>${escapeHtml(t.pickCardBody)}</p>
      `;
    }
    return;
  }

  const categoryLabel = getCardCategoryLabel(card);
  const title = localizeCard(card, "title");
  const note = localizeCard(card, "note");
  const scenario = localizeCard(card, "scenario");

  const detailContent = elements.detailPanel?.querySelector(".detail-content");
  if (detailContent) {
    detailContent.innerHTML = `
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(note || scenario)}</p>
      <div class="detail-summary">
        <div><span>${escapeHtml(t.category)}</span><strong>${escapeHtml(categoryLabel)}</strong></div>
      </div>
      <div class="detail-note">
        <span>${escapeHtml(t.scenario)}</span>
        <strong>${escapeHtml(scenario)}</strong>
      </div>
      <button class="copy-button copy-all-button" type="button" data-action="copy" data-command="${escapeAttr(card.command)}">${escapeHtml(card.layout === "config" ? t.copyConfig : t.copyGroup)}</button>
    `;
  }
}

function getAllCards() {
  const edits = new Map(editedCards.map((card) => [card.id, card]));
  return [...seedCards, ...customCards]
    .filter((card) => !deletedCards.has(card.id))
    .map((card) => {
      const edited = edits.get(card.id);
      return edited ? { ...card, ...edited, id: card.id, custom: Boolean(card.custom || edited.custom), edited: true } : card;
    });
}

function getCardClient(card) {
  return clientMeta[card?.client] ? card.client : null;
}

function getText() {
  return uiText[state.language] || uiText.zh;
}

function localizeClientCategory(category, fallback = "") {
  return localizeMeta(clientCategoryMeta[category], "label") || fallback || category;
}

function localizeMeta(meta, key) {
  if (!meta) return "";
  if (state.language === "en") return meta[`${key}En`] || meta[key] || "";
  return meta[key] || "";
}

function localizeCard(card, key) {
  if (!card) return "";
  if (card.edited) return card[key] || card[`${key}En`] || "";
  if (state.language === "en" && !card.custom) return card[`${key}En`] || card[key] || "";
  return card[key] || "";
}

function getCardModule(card) {
  return moduleMeta[card?.module] ? card.module : "git";
}

function getCardClass(card) {
  return cardClassByCategory[card.category] || cardClassByCategory[getCardModule(card)] || "mercury-card";
}

function getCardCategoryLabel(card) {
  if (getCardModule(card) === "clients") return localizeClientCategory(card.category);
  const category = categoryMeta[card.category];
  if (category) return localizeMeta(category, "label");
  const module = moduleMeta[getCardModule(card)];
  return localizeMeta(module, "label") || card.category || "";
}

function getCardModuleLabel(card, module, t) {
  if (getCardModule(card) === "clients") {
    const client = clientMeta[getCardClient(card)] || clientMeta.wk;
    return localizeMeta(client, "label");
  }
  return localizeMeta(module, "label") || t.git;
}

function getModuleFavoriteCount(moduleKey) {
  return getAllCards().filter((card) => isCardInCurrentModuleForCount(card, moduleKey) && favorites.has(card.id)).length;
}

function isCardInCurrentModuleForCount(card, moduleKey) {
  if (moduleKey === "clients") return getCardModule(card) === "clients" && getCardClient(card) === state.client;
  return getCardModule(card) === moduleKey;
}

function getResultTitle(module, category, modeLabel, t) {
  if (modeLabel) return t.favoritedCommands;
  if (state.module === "git") {
    return state.category === "all"
      ? t.frequentGit
      : `${localizeMeta(category, "label")}${state.language === "zh" ? "卡片" : " Cards"}`;
  }
  if (state.module === "clients") {
    const client = clientMeta[state.client] || clientMeta.wk;
    if (state.category === "all") return state.language === "zh" ? `${localizeMeta(client, "label")}资料` : `${localizeMeta(client, "label")} Notes`;
    return state.language === "zh"
      ? `${localizeClientCategory(state.category)}卡片`
      : `${localizeClientCategory(state.category)} Cards`;
  }
  return state.language === "zh"
    ? `${localizeMeta(module, "label")}卡片`
    : `${localizeMeta(module, "label")} Cards`;
}

function renderCardCategoryOptions() {
  const select = elements.cardForm?.elements.category;
  if (!select) return;

  const editingCard = state.editingId ? getAllCards().find((card) => card.id === state.editingId) : null;
  const activeModule = editingCard ? getCardModule(editingCard) : state.module;
  const options = activeModule === "git"
    ? moduleCategoryOptions.filter((key) => key !== "all")
    : activeModule === "clients"
      ? clientCategoryOptions.filter((key) => key !== "all")
      : [activeModule];
  select.innerHTML = options.map((key) => {
    const label = activeModule === "git"
      ? localizeMeta(categoryMeta[key], "label")
      : activeModule === "clients"
        ? localizeClientCategory(key)
        : localizeMeta(categoryMeta[key], "label") || localizeMeta(moduleMeta[key], "label");
    return `<option value="${escapeAttr(key)}">${escapeHtml(label)}</option>`;
  }).join("");
}

function renderQuickFilters() {
  if (!elements.quickFilters) return;
  if (state.module !== "git" && state.module !== "clients") {
    elements.quickFilters.innerHTML = "";
    elements.quickFilters.hidden = true;
    elements.quickFilters.setAttribute("aria-hidden", "true");
    return;
  }
  const options = state.module === "clients" ? clientCategoryOptions : moduleCategoryOptions;
  elements.quickFilters.innerHTML = options.map((key) => {
    const label = state.module === "clients"
      ? localizeClientCategory(key)
      : localizeMeta(categoryMeta[key] || categoryMeta.all, "label");
    return `<button type="button" data-filter="${escapeAttr(key)}">${escapeHtml(label)}</button>`;
  }).join("");
}

function renderClientControls() {
  const host = document.querySelector(".focus-panel");
  if (!host) return;
  let controls = document.getElementById("clientControls");
  host.classList.toggle("has-client-controls", state.module === "clients");
  if (state.module !== "clients") {
    controls?.remove();
    elements.clientSelect = null;
    return;
  }

  if (!controls) {
    controls = document.createElement("div");
    controls.className = "client-controls";
    controls.id = "clientControls";
  }
  if (controls.parentElement !== host) {
    host.appendChild(controls);
  }

  const options = Object.entries(clientMeta).map(([key, client]) =>
    `<option value="${escapeAttr(key)}" ${state.client === key ? "selected" : ""}>${escapeHtml(localizeMeta(client, "label"))}</option>`
  ).join("");
  controls.innerHTML = `
    <label for="clientSelect">${state.language === "zh" ? "客户" : "Client"}</label>
    <select id="clientSelect">${options}</select>
  `;
  elements.clientSelect = controls.querySelector("#clientSelect");
  elements.clientSelect?.addEventListener("change", (event) => {
    state.client = clientMeta[event.target.value] ? event.target.value : "wk";
    state.category = "all";
    state.selectedId = null;
    render();
  });
}

function filterCards(cards) {
  const query = state.search.toLowerCase();
  const filtered = cards.filter((card) => {
    const matchesModule = state.module === "clients"
      ? getCardModule(card) === "clients" && getCardClient(card) === state.client
      : getCardModule(card) === state.module;
    const matchesCategory = state.module === "clients"
      ? state.category === "all" || card.category === state.category
      : state.module !== "git" || state.category === "all" || card.category === state.category;
    const matchesFavorite = !state.favoritesOnly || favorites.has(card.id);
    const haystack = [
      card.title,
      card.titleEn,
      card.category,
      getCardClient(card),
      getCardModule(card),
      card.scenario,
      card.scenarioEn,
      card.command,
      card.note,
      card.noteEn,
      card.tags.join(" ")
    ].join(" ").toLowerCase();
    const matchesSearch = !query || haystack.includes(query);
    return matchesModule && matchesCategory && matchesFavorite && matchesSearch;
  });

  if (query) {
    filtered.sort((a, b) => relevanceScore(b, query) - relevanceScore(a, query));
  }

  return filtered;
}

function relevanceScore(card, query) {
  const title = `${card.title || ""} ${card.titleEn || ""}`.toLowerCase();
  const command = card.command.toLowerCase();
  const tags = card.tags.join(" ").toLowerCase();
  const scenario = `${card.scenario || ""} ${card.scenarioEn || ""}`.toLowerCase();
  const note = `${card.note || ""} ${card.noteEn || ""}`.toLowerCase();
  let score = 0;
  if (title.includes(query)) score += 90;
  if (command.includes(query)) score += 80;
  if (tags.includes(query)) score += 30;
  if (scenario.includes(query)) score += 18;
  if (note.includes(query)) score += 6;
  return score;
}

function syncCategoryUi() {
  getNavItems().forEach((button) => {
    button.classList.toggle("active", (button.dataset.module || "git") === state.module);
  });
  if (elements.quickFilters) {
    const showFilters = state.module === "git" || state.module === "clients";
    elements.quickFilters.hidden = !showFilters;
    elements.quickFilters.setAttribute("aria-hidden", String(!showFilters));
  }
  elements.quickFilters?.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("active", (button.dataset.filter || "") === state.category);
  });
}

function applyLanguage(language) {
  state.language = language === "en" ? "en" : "zh";
  const t = getText();
  document.documentElement.lang = t.htmlLang;

  if (elements.brandSub) elements.brandSub.textContent = t.brandSub;
  elements.syncButton?.querySelector(".sync-text") && (elements.syncButton.querySelector(".sync-text").textContent = t.sync);
  if (elements.languageToggle) {
    elements.languageToggle.setAttribute("aria-label", t.langLabel);
    elements.languageToggle.querySelector(".language-text").textContent = t.langButton;
    elements.languageToggle.querySelector(".language-icon").textContent = state.language === "zh" ? "文" : "A";
  }
  document.querySelector(".focus-copy .eyebrow").textContent = t.focusEyebrow;
  const currentModule = moduleMeta[state.module] || moduleMeta.git;
  document.querySelector(".focus-copy h3").textContent = localizeMeta(currentModule, "focusTitle") || t.focusTitle;
  elements.quickSearch.placeholder = localizeMeta(currentModule, "searchPlaceholder") || t.searchPlaceholder;
  elements.quickSearch.setAttribute("aria-label", t.searchAria);
  elements.clearSearch.textContent = t.clear;
  elements.addCardButton.textContent = t.newCard;
  if (elements.addModuleButton) {
    elements.addModuleButton.querySelector("strong").textContent = t.addModule;
    elements.addModuleButton.setAttribute("aria-label", t.addModule);
  }

  renderNav();

  renderQuickFilters();

  document.querySelector("#detailPanel .panel-head .eyebrow").textContent = t.selectedEyebrow;
  document.querySelector(".solar-panel .eyebrow").textContent = t.solarEyebrow;
  document.querySelector(".solar-panel h3").textContent = t.solarTitle;
  elements.solarExpand?.setAttribute("aria-label", t.solarFullLabel);
  elements.solarExpand?.setAttribute("title", t.solarFullTitle);
  document.querySelector(".solar-overlay-top .eyebrow").textContent = t.solarOverlayEyebrow;
  document.querySelector(".solar-overlay-top h2").textContent = t.solarOverlayTitle;
  elements.solarClose.textContent = t.close;
  elements.solarClose.setAttribute("aria-label", t.closeSolar);

  applyCardDialogText();
  applyModuleDialogText();
  document.querySelector(".card-form button[value='cancel']").textContent = t.formClose;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (t[key]) node.textContent = t[key];
  });

  const form = elements.cardForm;
  form.elements.title.placeholder = t.titlePlaceholder;
  form.elements.scenario.placeholder = t.scenarioPlaceholder;
  form.elements.command.placeholder = t.commandPlaceholder || "git status";
  form.elements.note.placeholder = t.notePlaceholder;
  form.elements.tags.placeholder = t.tagsPlaceholder;
  renderCardCategoryOptions();
  if (state.editingId && state.editingLayout === "config") {
    const card = getAllCards().find((item) => item.id === state.editingId);
    renderSnippetEditor(card);
  }

  renderSyncUi();
  clearCelestialSelection();
  applyTheme(document.body.classList.contains("theme-light") ? "light" : "dark");
}

function applyModuleDialogText() {
  const t = getText();
  if (elements.moduleDialogTitle) elements.moduleDialogTitle.textContent = state.editingModuleId ? t.moduleEditTitle : t.moduleAddTitle;
  if (elements.moduleSubmitButton) elements.moduleSubmitButton.textContent = t.moduleSave;
  if (elements.moduleForm?.elements.name) {
    elements.moduleForm.elements.name.placeholder = state.language === "zh" ? "例如：AI 工具" : "Example: AI Tools";
  }
}

async function initSync() {
  renderSyncUi();
  if (!supabaseClient) return;

  try {
    const savedEmail = localStorage.getItem(storageKeys.syncEmail);
    if (savedEmail && elements.syncForm?.elements.email) {
      elements.syncForm.elements.email.value = savedEmail;
    }

    const { data } = await supabaseClient.auth.getSession();
    state.syncUser = data.session?.user || null;
    renderSyncUi();

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      state.syncUser = session?.user || null;
      renderSyncUi();
    });

    if (state.syncUser) {
      await syncCloudState({ showDoneToast: false });
    }
  } catch {
    setSyncStatus("failed");
  }
}

async function signInSync() {
  const t = getText();
  if (!supabaseClient) {
    showToast(t.syncSdkMissing);
    return;
  }

  const { email, password } = getSyncCredentials();
  if (!email || !password) {
    showToast(t.syncLoginRequired);
    return;
  }

  setSyncStatus("busy");
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    setSyncStatus("offline");
    showToast(error.message || t.syncFailed);
    return;
  }

  localStorage.setItem(storageKeys.syncEmail, email);
  state.syncUser = data.user || null;
  await syncCloudState({ showDoneToast: false });
  showToast(t.syncSignInDone);
}

async function signUpSync() {
  const t = getText();
  if (!supabaseClient) {
    showToast(t.syncSdkMissing);
    return;
  }

  const { email, password } = getSyncCredentials();
  if (!email || !password) {
    showToast(t.syncLoginRequired);
    return;
  }

  setSyncStatus("busy");
  const { data, error } = await supabaseClient.auth.signUp({ email, password });
  if (error) {
    setSyncStatus("offline");
    showToast(error.message || t.syncFailed);
    return;
  }

  localStorage.setItem(storageKeys.syncEmail, email);
  state.syncUser = data.session?.user || null;
  if (state.syncUser) await syncCloudState({ showDoneToast: false });
  setSyncStatus(state.syncUser ? "ready" : "offline");
  showToast(t.syncSignUpDone);
}

async function signOutSync() {
  const t = getText();
  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();
  state.syncUser = null;
  setSyncStatus("offline");
  showToast(t.syncSignOutDone);
}

async function syncCloudState(options = {}) {
  const t = getText();
  if (!supabaseClient || !state.syncUser || state.isSyncing) return false;

  state.isSyncing = true;
  setSyncStatus("busy");

  try {
    const { data, error } = await supabaseClient
      .from("workstation_state")
      .select("payload, updated_at")
      .eq("user_id", state.syncUser.id)
      .maybeSingle();

    if (error) throw error;

    const merged = mergeCloudPayload(data?.payload || {}, getLocalPayload(), options);
    applyCloudPayload(merged);

    const { error: upsertError } = await supabaseClient
      .from("workstation_state")
      .upsert({
        user_id: state.syncUser.id,
        payload: merged,
        updated_at: new Date().toISOString()
      });

    if (upsertError) throw upsertError;

    setSyncStatus("ready");
    if (options.showDoneToast) showToast(t.syncSaved);
    return true;
  } catch (error) {
    setSyncStatus("failed");
    showToast(error?.message || t.syncFailed);
    return false;
  } finally {
    state.isSyncing = false;
  }
}

function scheduleCloudSync(options = {}) {
  if (state.suppressSync || !state.syncUser || !supabaseClient) return;
  clearTimeout(scheduleCloudSync.timer);
  scheduleCloudSync.timer = setTimeout(() => {
    syncCloudState({ showDoneToast: !options.silent, preferLocal: options.preferLocal });
  }, options.silent ? 900 : 350);
}

function getSyncCredentials() {
  return {
    email: clean(elements.syncForm?.elements.email?.value).toLowerCase(),
    password: String(elements.syncForm?.elements.password?.value || "")
  };
}

function getLocalPayload() {
  return {
    version: 1,
    theme: document.body.classList.contains("theme-light") ? "light" : "dark",
    language: state.language,
    favorites: Array.from(favorites),
    customCards,
    editedCards,
    deletedCards: Array.from(deletedCards),
    recentCards,
    cardFrequency,
    customModules,
    moduleOrder,
    clientUpdatedAt: localStorage.getItem(storageKeys.localUpdatedAt) || new Date().toISOString(),
    savedAt: new Date().toISOString()
  };
}

function mergeCloudPayload(cloudPayload, localPayload, options = {}) {
  const preferLocal = options.preferLocal || isLocalNewer(localPayload, cloudPayload);
  const preferenceSource = preferLocal ? localPayload : cloudPayload;
  const primaryCards = preferLocal ? localPayload : cloudPayload;
  const secondaryCards = preferLocal ? cloudPayload : localPayload;
  const mergedCustomModules = normalizeCustomModules(preferenceSource.customModules || localPayload.customModules || []);
  const deletedCards = normalizeStringArray([
    ...normalizeStringArray(cloudPayload.deletedCards),
    ...normalizeStringArray(localPayload.deletedCards)
  ]);

  return {
    version: 1,
    theme: preferenceSource.theme || localPayload.theme,
    language: preferenceSource.language || localPayload.language,
    favorites: normalizeStringArray(preferenceSource.favorites || localPayload.favorites),
    customCards: mergeCards(primaryCards.customCards || [], secondaryCards.customCards || [], deletedCards),
    editedCards: mergeCards(primaryCards.editedCards || [], secondaryCards.editedCards || [], deletedCards),
    deletedCards,
    recentCards: normalizeStringArray(preferenceSource.recentCards || localPayload.recentCards).slice(0, 20),
    cardFrequency: mergeFrequency(cloudPayload.cardFrequency || {}, localPayload.cardFrequency || {}),
    customModules: mergedCustomModules,
    moduleOrder: normalizeModuleOrderFor(preferenceSource.moduleOrder || localPayload.moduleOrder, mergedCustomModules),
    clientUpdatedAt: preferLocal ? localPayload.clientUpdatedAt : cloudPayload.clientUpdatedAt || localPayload.clientUpdatedAt,
    savedAt: new Date().toISOString()
  };
}

function applyCloudPayload(payload) {
  state.suppressSync = true;

  favorites = new Set(Array.isArray(payload.favorites) ? payload.favorites : []);
  customCards = (Array.isArray(payload.customCards) ? payload.customCards : []).filter(isValidCustomCard);
  editedCards = (Array.isArray(payload.editedCards) ? payload.editedCards : []).filter(isValidCustomCard);
  deletedCards = new Set(normalizeStringArray(payload.deletedCards));
  recentCards = Array.isArray(payload.recentCards) ? payload.recentCards.slice(0, 20) : [];
  cardFrequency = payload.cardFrequency && typeof payload.cardFrequency === "object" ? payload.cardFrequency : {};
  customModules = normalizeCustomModules(payload.customModules || []);
  moduleOrder = normalizeModuleOrder(payload.moduleOrder || moduleOrder);
  if (!moduleMeta[state.module]) state.module = "git";
  state.language = payload.language === "en" ? "en" : "zh";
  state.category = "all";

  writeJson(storageKeys.favorites, Array.from(favorites));
  writeJson(storageKeys.customCards, customCards);
  writeJson(storageKeys.editedCards, editedCards);
  writeJson(storageKeys.deletedCards, Array.from(deletedCards));
  writeJson(storageKeys.recentCards, recentCards);
  writeJson(storageKeys.cardFrequency, cardFrequency);
  writeJson(storageKeys.customModules, customModules);
  writeJson(storageKeys.moduleOrder, moduleOrder);
  localStorage.setItem(storageKeys.language, state.language);
  if (payload.clientUpdatedAt) localStorage.setItem(storageKeys.localUpdatedAt, payload.clientUpdatedAt);
  if (payload.theme === "light" || payload.theme === "dark") {
    localStorage.setItem(storageKeys.theme, payload.theme);
    applyTheme(payload.theme);
  }

  applyLanguage(state.language);
  renderNav();
  render();
  state.suppressSync = false;
}

function mergeCards(primaryCards, secondaryCards, deletedIds = []) {
  const deleted = new Set(deletedIds);
  const byId = new Map();
  [...secondaryCards, ...primaryCards].forEach((card) => {
    if (isValidCustomCard(card) && !deleted.has(card.id)) byId.set(card.id, card);
  });
  return Array.from(byId.values()).sort((a, b) => String(b.id).localeCompare(String(a.id)));
}

function normalizeCustomModules(modules) {
  const byId = new Map();
  (Array.isArray(modules) ? modules : []).forEach((module) => {
    if (isValidCustomModule(module)) byId.set(module.id, normalizeCustomModule(module));
  });
  return Array.from(byId.values());
}

function normalizeStringArray(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
}

function mergeFrequency(primaryFrequency, secondaryFrequency) {
  const merged = { ...secondaryFrequency };
  Object.entries(primaryFrequency).forEach(([id, count]) => {
    merged[id] = Math.max(Number(merged[id]) || 0, Number(count) || 0);
  });
  return merged;
}

function touchLocalState() {
  localStorage.setItem(storageKeys.localUpdatedAt, new Date().toISOString());
}

function isLocalNewer(localPayload, cloudPayload) {
  const localTime = Date.parse(localPayload.clientUpdatedAt || localPayload.savedAt || "");
  const cloudTime = Date.parse(cloudPayload.clientUpdatedAt || cloudPayload.savedAt || "");
  if (Number.isNaN(localTime)) return false;
  if (Number.isNaN(cloudTime)) return true;
  return localTime >= cloudTime;
}

function setSyncStatus(status) {
  state.syncStatus = status;
  renderSyncUi();
}

function renderSyncUi() {
  const t = getText();
  const hasUser = Boolean(state.syncUser);
  const statusText = {
    offline: hasUser ? t.syncOnline : t.syncOffline,
    busy: t.syncBusy,
    ready: hasUser ? t.syncReady : t.syncOffline,
    failed: t.syncFailed
  }[state.syncStatus] || (hasUser ? t.syncOnline : t.syncOffline);

  const dots = [elements.syncDot, elements.syncStatusText?.parentElement?.querySelector(".sync-dot")].filter(Boolean);
  dots.forEach((dot) => {
    dot.classList.toggle("is-online", hasUser && state.syncStatus !== "busy" && state.syncStatus !== "failed");
    dot.classList.toggle("is-busy", state.syncStatus === "busy");
  });

  if (elements.syncStatusText) elements.syncStatusText.textContent = statusText;
  if (elements.syncButton) {
    elements.syncButton.setAttribute("aria-label", `${t.sync}: ${statusText}`);
    const text = elements.syncButton.querySelector(".sync-text");
    if (text) text.textContent = t.sync;
  }

  elements.syncSignIn && (elements.syncSignIn.textContent = t.syncSignIn);
  elements.syncSignUp && (elements.syncSignUp.textContent = t.syncSignUp);
  elements.syncSignOut && (elements.syncSignOut.textContent = t.syncSignOut);
  elements.syncNow && (elements.syncNow.textContent = t.syncNow);
  elements.syncNow && (elements.syncNow.disabled = !hasUser || state.isSyncing);
  elements.syncSignOut && (elements.syncSignOut.disabled = !hasUser);
  elements.syncSignIn && (elements.syncSignIn.disabled = !supabaseClient || state.isSyncing);
  elements.syncSignUp && (elements.syncSignUp.disabled = !supabaseClient || state.isSyncing);
}

function getOrderedModules() {
  return normalizeModuleOrder(moduleOrder);
}

function buildModuleMeta() {
  const customMeta = Object.fromEntries(customModules.map((module) => [module.id, normalizeCustomModule(module)]));
  return { ...builtInModuleMeta, ...customMeta };
}

function renderNav() {
  if (!elements.nav) return;
  moduleMeta = buildModuleMeta();
  moduleOrder = normalizeModuleOrder(moduleOrder);
  elements.nav.innerHTML = getOrderedModules().map((module, index) => renderNavItem(module, index)).join("");
  syncCategoryUi();
}

function renderNavItem(module, index) {
  const meta = moduleMeta[module] || moduleMeta.git;
  const className = module === "git"
    ? "mercury-nav"
    : module === "clients"
      ? "jupiter-nav"
      : customModuleClasses[index % customModuleClasses.length];
  const isActive = state.module === module ? " active" : "";
  const customAttr = isCustomModule(module) ? ' data-custom-module="true"' : "";
  return `
    <button class="nav-item ${className}${isActive}" type="button" data-module="${escapeAttr(module)}"${customAttr}>
      <span class="nav-label">${escapeHtml(localizeMeta(meta, "label"))}</span>
      <small>${escapeHtml(localizeMeta(meta, "sub"))}</small>
      <span class="nav-drag-handle" aria-hidden="true"></span>
    </button>
  `;
}

function commitModuleOrder() {
  if (!elements.nav) return;
  const nextOrder = Array.from(elements.nav.querySelectorAll(".nav-item")).map((button) => button.dataset.module || "git");
  moduleOrder = normalizeModuleOrder(nextOrder);
  writeJson(storageKeys.moduleOrder, moduleOrder);
  touchLocalState();
  scheduleCloudSync({ preferLocal: true });
}

function persistCustomModules() {
  customModules = customModules.filter(isValidCustomModule).map(normalizeCustomModule);
  writeJson(storageKeys.customModules, customModules);
  moduleOrder = normalizeModuleOrder(moduleOrder);
  writeJson(storageKeys.moduleOrder, moduleOrder);
  touchLocalState();
  scheduleCloudSync({ preferLocal: true });
}

function openModuleDialog(moduleId = null) {
  const t = getText();
  const module = moduleId ? customModules.find((item) => item.id === moduleId) : null;
  state.editingModuleId = module?.id || null;
  elements.moduleForm?.reset();
  if (elements.moduleForm?.elements.name) {
    elements.moduleForm.elements.name.value = module?.label || "";
    elements.moduleForm.elements.name.placeholder = state.language === "zh" ? "例如：AI 工具" : "Example: AI Tools";
  }
  if (elements.moduleDialogEyebrow) elements.moduleDialogEyebrow.textContent = module ? "Module / Rename" : "Module / New";
  if (elements.moduleDialogTitle) elements.moduleDialogTitle.textContent = module ? t.moduleEditTitle : t.moduleAddTitle;
  if (elements.moduleSubmitButton) elements.moduleSubmitButton.textContent = t.moduleSave;
  elements.moduleDialog?.showModal();
  elements.moduleForm?.elements.name?.focus();
}

function resetModuleDialog() {
  state.editingModuleId = null;
  elements.moduleForm?.reset();
}

function saveModuleForm(formData) {
  const t = getText();
  const name = clean(formData.get("name"));
  if (!name) {
    showToast(t.moduleNameRequired);
    return;
  }

  if (state.editingModuleId && isCustomModule(state.editingModuleId)) {
    renameCustomModule(state.editingModuleId, name);
    elements.moduleDialog?.close("saved");
    resetModuleDialog();
    return;
  }

  addCustomModule(name);
  elements.moduleDialog?.close("saved");
  resetModuleDialog();
}

function addCustomModule(name) {
  const module = createCustomModule(name);
  customModules = [...customModules, module];
  moduleOrder = normalizeModuleOrder([...moduleOrder, module.id]);
  state.module = module.id;
  state.category = "all";
  state.favoritesOnly = false;
  state.selectedId = null;
  persistCustomModules();
  renderNav();
  render();
  scrollMainTop();
  showToast(getText().moduleCreated);
}

function renameCustomModule(moduleId, nextName) {
  if (!isCustomModule(moduleId)) return;
  customModules = customModules.map((module) => (
    module.id === moduleId
      ? normalizeCustomModule({ ...module, label: nextName, labelEn: nextName, title: nextName, titleEn: nextName, focusTitle: `快速定位${nextName}`, focusTitleEn: `Find ${nextName} Fast` })
      : module
  ));
  persistCustomModules();
  renderNav();
  render();
  showToast(getText().moduleRenamed);
}

function handleDeleteModuleMenu(button, moduleId) {
  const t = getText();
  if (button.dataset.confirm !== "true") {
    button.dataset.confirm = "true";
    button.textContent = t.moduleDeleteHint;
    button.classList.add("is-confirming");
    clearTimeout(handleDeleteModuleMenu.timer);
    handleDeleteModuleMenu.timer = setTimeout(() => {
      button.dataset.confirm = "false";
      button.textContent = t.deleteModule;
      button.classList.remove("is-confirming");
    }, 2200);
    showToast(t.moduleDeleteHint);
    return;
  }
  deleteCustomModule(moduleId);
  closeModuleMenu();
}

function deleteCustomModule(moduleId) {
  if (!isCustomModule(moduleId)) return;
  const t = getText();
  const moduleCards = customCards.filter((card) => card.module === moduleId).map((card) => card.id);
  customCards = customCards.filter((card) => card.module !== moduleId);
  editedCards = editedCards.filter((card) => card.module !== moduleId);
  moduleCards.forEach((id) => {
    favorites.delete(id);
    recentCards = recentCards.filter((cardId) => cardId !== id);
    delete cardFrequency[id];
  });
  customModules = customModules.filter((module) => module.id !== moduleId);
  moduleOrder = normalizeModuleOrder(moduleOrder.filter((module) => module !== moduleId));
  if (state.module === moduleId) {
    state.module = "git";
    state.category = "all";
    state.selectedId = null;
  }
  writeJson(storageKeys.customCards, customCards);
  writeJson(storageKeys.editedCards, editedCards);
  writeJson(storageKeys.favorites, Array.from(favorites));
  writeJson(storageKeys.recentCards, recentCards);
  writeJson(storageKeys.cardFrequency, cardFrequency);
  persistCustomModules();
  renderNav();
  render();
  showToast(t.moduleDeleted);
}

function openModuleMenu(moduleId, x, y) {
  if (!elements.moduleMenu || !moduleMeta[moduleId]) return;
  const t = getText();
  state.moduleMenuTarget = moduleId;
  const canDelete = isCustomModule(moduleId);
  elements.moduleMenu.innerHTML = canDelete
    ? `
      <button type="button" data-module-action="rename">${escapeHtml(t.renameModule)}</button>
      <button class="danger" type="button" data-module-action="delete">${escapeHtml(t.deleteModule)}</button>
    `
    : `<span class="module-menu-note">${escapeHtml(t.coreModuleLocked)}</span>`;
  elements.moduleMenu.hidden = false;
  const rect = elements.moduleMenu.getBoundingClientRect();
  const left = Math.min(x, window.innerWidth - rect.width - 12);
  const top = Math.min(y, window.innerHeight - rect.height - 12);
  elements.moduleMenu.style.left = `${Math.max(12, left)}px`;
  elements.moduleMenu.style.top = `${Math.max(12, top)}px`;
}

function closeModuleMenu() {
  state.moduleMenuTarget = null;
  if (elements.moduleMenu) elements.moduleMenu.hidden = true;
}

function startNavSort(button, pointerId) {
  if (!elements.nav || !button?.classList?.contains("nav-item")) return;
  const module = button.dataset.module;
  if (!module || !moduleMeta[module]) return;
  clearTimeout(state.navPressTimer);
  state.navPressTimer = null;
  state.draggedModule = module;
  state.dragMoved = true;
  elements.nav.classList.add("is-sorting");
  getNavItems().forEach((item) => item.classList.toggle("is-dragging", item === button));
  try {
    if (pointerId !== undefined && pointerId !== null) button.setPointerCapture?.(pointerId);
  } catch (error) {
    // Pointer capture can fail if the browser already released the pointer.
  }
}

function finishNavSort() {
  const shouldCommit = Boolean(state.draggedModule);
  cleanupNavSort();
  if (shouldCommit) commitModuleOrder();
  window.setTimeout(() => {
    state.dragMoved = false;
  }, 180);
}

function cancelNavSort() {
  cleanupNavSort();
  window.setTimeout(() => {
    state.dragMoved = false;
  }, 180);
}

function cleanupNavSort() {
  clearTimeout(state.navPressTimer);
  state.navPressTimer = null;
  state.navPointerActive = false;
  state.navPointerId = null;
  state.navPressButton = null;
  state.draggedModule = null;
  elements.nav?.classList.remove("is-sorting");
  getNavItems().forEach((item) => item.classList.remove("is-dragging"));
}

function moveNavItem(module, targetModule, after = false) {
  if (!elements.nav || !module || !targetModule || module === targetModule) return;
  const dragging = elements.nav.querySelector(`.nav-item[data-module="${cssEscape(module)}"]`);
  const target = elements.nav.querySelector(`.nav-item[data-module="${cssEscape(targetModule)}"]`);
  if (!dragging || !target) return;
  const beforeRects = new Map(getNavItems().map((item) => [item, item.getBoundingClientRect()]));
  elements.nav.insertBefore(dragging, after ? target.nextSibling : target);
  animateNavShift(beforeRects);
  state.dragMoved = true;
}

function animateNavShift(beforeRects) {
  getNavItems().forEach((item) => {
    if (item.classList.contains("is-dragging")) return;
    const before = beforeRects.get(item);
    if (!before) return;
    const after = item.getBoundingClientRect();
    const deltaY = before.top - after.top;
    if (!deltaY) return;
    item.animate([
      { transform: `translateY(${deltaY}px) scale(0.985)` },
      { transform: "translateY(0) scale(1.01)", offset: 0.72 },
      { transform: "translateY(0) scale(1)" }
    ], {
      duration: 260,
      easing: "cubic-bezier(0.2, 0.9, 0.2, 1)",
      fill: "both"
    });
  });
}

function normalizeModuleOrder(list = []) {
  return normalizeModuleOrderFor(list, customModules);
}

function normalizeModuleOrderFor(list = [], modules = customModules) {
  const seen = new Set();
  const order = [];
  const visibleModules = [...coreModuleOrder, ...normalizeCustomModules(modules).map((module) => module.id)];
  [...list, ...visibleModules].forEach((module) => {
    if (!visibleModules.includes(module) || seen.has(module)) return;
    seen.add(module);
    order.push(module);
  });
  return order;
}

function getNavItems() {
  return Array.from(elements.nav?.querySelectorAll(".nav-item") || []);
}

function getNavItemAtPoint(x, y) {
  return getNavItems().find((button) => {
    if (button.dataset.module === state.draggedModule) return false;
    const rect = button.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }) || null;
}

function openCardDialog(card = null) {
  state.editingId = card?.id || null;
  state.editingLayout = card?.layout || null;
  const t = getText();
  const form = elements.cardForm;
  if (!form) return;
  form.reset();
  renderCardCategoryOptions();
  if (!card && form.elements.category.options.length) {
    form.elements.category.value = state.module === "git"
      ? (state.category !== "all" ? state.category : "daily")
      : form.elements.category.options[0].value;
  }

  const eyebrow = form.querySelector(".eyebrow");
  const title = form.querySelector(".section-head h3");
  const submit = form.querySelector(".primary-button");
  if (eyebrow) eyebrow.textContent = card ? t.formEditEyebrow : t.formCustomEyebrow;
  if (title) title.textContent = card ? t.formEditTitle : t.formCustomTitle;
  if (submit) submit.textContent = card ? t.updateCard : t.saveCard;

  if (card) {
    form.elements.title.value = card.title || "";
    form.elements.category.value = card.category || form.elements.category.value;
    form.elements.scenario.value = card.scenario || "";
    form.elements.command.value = getEditableCommand(card);
    form.elements.note.value = card.note || "";
    form.elements.tags.value = Array.isArray(card.tags) ? card.tags.join(", ") : "";
  }

  renderSnippetEditor(card);
  syncCardDialogMode(card?.layout === "config");

  elements.cardDialog?.showModal();
  form.elements.title?.focus();
}

function openEditCardDialog(id) {
  const card = getAllCards().find((item) => item.id === id);
  if (!card) return;
  openCardDialog(card);
}

function getEditableCommand(card) {
  if (card?.layout !== "config" || !Array.isArray(card.snippets)) return card?.command || "";
  const primarySnippet = card.snippets.find((snippet) => snippet.primary) || card.snippets[card.snippets.length - 1];
  return primarySnippet?.content || card.command || "";
}

function getConfigSnippetsFromForm(formData, baseCard) {
  const source = Array.isArray(baseCard?.snippets) && baseCard.snippets.length ? baseCard.snippets : getDefaultConfigSnippets(baseCard);
  return source.map((snippet, index) => {
    const key = snippet.key || `snippet-${index}`;
    return {
      ...snippet,
      content: normalizeMultilineInput(formData.get(`snippet-${key}`)),
      primary: Boolean(snippet.primary),
      key
    };
  });
}

function resetCardDialog() {
  state.editingId = null;
  state.editingLayout = null;
  elements.cardForm?.reset();
  syncCardDialogMode(false);
  const editor = document.getElementById("snippetEditor");
  if (editor) editor.innerHTML = "";
  applyCardDialogText();
}

function applyCardDialogText() {
  const t = getText();
  const form = elements.cardForm;
  if (!form) return;
  const eyebrow = form.querySelector(".eyebrow");
  const title = form.querySelector(".section-head h3");
  const submit = form.querySelector(".primary-button");
  if (eyebrow) eyebrow.textContent = state.editingId ? t.formEditEyebrow : t.formCustomEyebrow;
  if (title) title.textContent = state.editingId ? t.formEditTitle : t.formCustomTitle;
  if (submit) submit.textContent = state.editingId ? t.updateCard : t.saveCard;
}

function syncCardDialogMode(isConfig) {
  const commandField = elements.cardForm?.querySelector(".command-field");
  const editor = document.getElementById("snippetEditor");
  if (commandField) commandField.hidden = Boolean(isConfig);
  if (editor) editor.hidden = !isConfig;
}

function renderSnippetEditor(card) {
  const editor = document.getElementById("snippetEditor");
  if (!editor) return;
  if (!card || card.layout !== "config") {
    editor.innerHTML = "";
    editor.hidden = true;
    return;
  }

  const snippets = Array.isArray(card.snippets) && card.snippets.length ? card.snippets : getDefaultConfigSnippets(card);
  const t = getText();
  editor.hidden = false;
  editor.innerHTML = snippets.map((snippet, index) => {
    const key = snippet.key || `snippet-${index}`;
    return `
      <section class="snippet-edit-block ${snippet.primary ? "is-primary" : ""}" data-snippet-key="${escapeAttr(key)}">
        <div class="snippet-head">
          <div>
            <strong>${escapeHtml(clean(snippet.label) || `片段 ${index + 1}`)}</strong>
            ${clean(snippet.target) ? `<span>${escapeHtml(clean(snippet.target))}</span>` : ""}
          </div>
        </div>
        <label class="snippet-edit-field">
          <span>${escapeHtml(t.formSnippetContent)}</span>
          <textarea name="snippet-${escapeAttr(key)}" rows="${snippet.primary ? 10 : 5}" data-snippet-key="${escapeAttr(key)}" placeholder="片段内容">${escapeHtml(snippet.content || "")}</textarea>
        </label>
      </section>
    `;
  }).join("");
}

function getDefaultConfigSnippets(card) {
  return [
    { key: "base", label: "入口", target: "base", language: "text", content: "https://xiavier.com" },
    { key: "auth", label: "auth.json", target: "~/.codex/auth.json", language: "json", content: "{\n  \"OPENAI_API_KEY\": \"sk-<替换为你的 Xiavier API Key>\"\n}" },
    {
      key: "config",
      label: "config.toml",
      target: "~/.codex/config.toml",
      language: "toml",
      primary: true,
      content: card?.command || ""
    }
  ];
}

function saveCardForm(formData) {
  if (state.editingId) {
    updateCard(state.editingId, formData);
    return;
  }
  saveCustomCard(formData);
}

function getCardInput(formData, baseCard = null) {
  const t = getText();
  const title = clean(formData.get("title"));
  const isConfigCard = baseCard?.layout === "config";
  const snippets = isConfigCard ? getConfigSnippetsFromForm(formData, baseCard) : null;
  const command = isConfigCard
    ? clean(snippets?.find((snippet) => snippet.primary)?.content || snippets?.[snippets.length - 1]?.content || "")
    : normalizeMultilineInput(formData.get("command"));
  if (!title || !command) {
    showToast(t.titleRequired);
    return null;
  }

  const activeModule = baseCard
    ? getCardModule(baseCard)
    : moduleMeta[state.module] && state.module !== "clients" ? state.module : "git";
  const rawCategory = clean(formData.get("category"));
  const category = activeModule === "git"
    ? (categoryMeta[rawCategory] && rawCategory !== "all" ? rawCategory : "daily")
    : activeModule === "clients"
      ? (clientCategoryMeta[rawCategory] && rawCategory !== "all" ? rawCategory : baseCard?.category || "wk-flow")
      : activeModule;
  const tags = clean(formData.get("tags"))
    .split(/[,\uFF0C]/)
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    activeModule,
    category,
    title,
    command,
    scenario: clean(formData.get("scenario")) || t.customScenario,
    note: clean(formData.get("note")),
    tags: tags.length ? tags : ["custom"],
    snippets
  };
}

function saveCustomCard(formData) {
  const input = getCardInput(formData);
  if (!input) return;

  const card = {
    id: `custom-${Date.now()}`,
    module: input.activeModule,
    title: input.title,
    category: input.category,
    risk: "Safe",
    scenario: input.scenario,
    command: input.command,
    note: input.note,
    tags: input.tags,
    custom: true
  };

  if (input.snippets) {
    card.layout = "config";
    card.snippets = input.snippets;
  }

  customCards = [card, ...customCards];
  writeJson(storageKeys.customCards, customCards);
  state.selectedId = card.id;
  state.module = input.activeModule;
  state.category = card.category;
  if (input.activeModule !== "git") state.category = "all";
  state.favoritesOnly = false;
  elements.cardForm.reset();
  elements.cardDialog.close("saved");
  showToast(getText().savedCard);
  render();
  touchLocalState();
  scheduleCloudSync({ preferLocal: true });
}

function updateCard(id, formData) {
  const currentCard = getAllCards().find((card) => card.id === id);
  if (!currentCard) return;
  const input = getCardInput(formData, currentCard);
  if (!input) return;

  const patch = {
    id,
    module: getCardModule(currentCard),
    client: getCardClient(currentCard) || undefined,
    title: input.title,
    category: input.category,
    risk: currentCard.risk || "Safe",
    scenario: input.scenario,
    command: input.command,
    note: input.note,
    tags: input.tags,
    custom: Boolean(currentCard.custom)
  };

  if (currentCard.layout) patch.layout = currentCard.layout;
  if (currentCard.layout === "config") {
    patch.snippets = input.snippets || updatePrimarySnippet(currentCard, input.command);
  }

  if (currentCard.custom) {
    customCards = customCards.map((card) => card.id === id ? { ...card, ...patch, custom: true } : card);
    writeJson(storageKeys.customCards, customCards);
  } else {
    editedCards = [
      { ...patch, custom: false },
      ...editedCards.filter((card) => card.id !== id)
    ];
    writeJson(storageKeys.editedCards, editedCards);
  }

  state.selectedId = id;
  state.editingId = null;
  state.module = getCardModule(patch);
  state.category = state.module === "git" ? patch.category : "all";
  state.favoritesOnly = false;
  elements.cardForm.reset();
  elements.cardDialog.close("saved");
  showToast(getText().updatedCard);
  render();
  touchLocalState();
  scheduleCloudSync({ preferLocal: true });
}

function updatePrimarySnippet(card, command) {
  const sourceSnippets = Array.isArray(card.snippets) && card.snippets.length
    ? card.snippets
    : [{
        label: "配置",
        target: card.target || "",
        language: card.language || "toml",
        primary: true,
        content: card.command || ""
      }];
  const primaryIndex = sourceSnippets.findIndex((snippet) => snippet.primary);
  const targetIndex = primaryIndex >= 0 ? primaryIndex : sourceSnippets.length - 1;
  return sourceSnippets.map((snippet, index) => (
    index === targetIndex ? { ...snippet, content: command, primary: true } : { ...snippet }
  ));
}

function toggleFavorite(id) {
  const t = getText();
  if (!id) return;
  if (favorites.has(id)) {
    favorites.delete(id);
    showToast(t.favoriteRemoved);
  } else {
    favorites.add(id);
    showToast(t.favoriteAdded);
  }
  writeJson(storageKeys.favorites, Array.from(favorites));
  render();
  touchLocalState();
  scheduleCloudSync({ preferLocal: true });
}

function handleDeleteCard(button) {
  const id = button.dataset.id || "";
  if (!id) return;
  const t = getText();
  if (button.dataset.confirm !== "true") {
    button.dataset.confirm = "true";
    button.classList.add("is-confirming");
    button.textContent = t.deleteConfirm;
    button.setAttribute("title", t.deleteHint);
    clearTimeout(handleDeleteCard.timer);
    handleDeleteCard.timer = setTimeout(() => {
      button.dataset.confirm = "false";
      button.classList.remove("is-confirming");
      button.textContent = t.deleteAction;
      button.removeAttribute("title");
    }, 2400);
    showToast(t.deleteHint);
    return;
  }

  deleteCard(id);
}

function deleteCard(id) {
  const t = getText();
  const card = getAllCards().find((item) => item.id === id);
  if (!card) return;

  deletedCards.add(id);
  writeJson(storageKeys.deletedCards, Array.from(deletedCards));

  if (card.custom) {
    customCards = customCards.filter((item) => item.id !== id);
    writeJson(storageKeys.customCards, customCards);
  }

  editedCards = editedCards.filter((item) => item.id !== id);
  writeJson(storageKeys.editedCards, editedCards);
  favorites.delete(id);
  recentCards = recentCards.filter((cid) => cid !== id);
  delete cardFrequency[id];
  if (state.selectedId === id) state.selectedId = null;

  writeJson(storageKeys.favorites, Array.from(favorites));
  writeJson(storageKeys.recentCards, recentCards);
  writeJson(storageKeys.cardFrequency, cardFrequency);
  showToast(t.deletedCard);
  render();
  touchLocalState();
  scheduleCloudSync({ preferLocal: true });
}

function recordCardUsage(id) {
  if (!id) return;
  cardFrequency[id] = (cardFrequency[id] || 0) + 1;
  writeJson(storageKeys.cardFrequency, cardFrequency);

  recentCards = recentCards.filter((cid) => cid !== id);
  recentCards.unshift(id);
  if (recentCards.length > 20) recentCards = recentCards.slice(0, 20);
  writeJson(storageKeys.recentCards, recentCards);
  touchLocalState();
  scheduleCloudSync({ silent: true, preferLocal: true });
}

async function copyText(text) {
  const t = getText();
  try {
    await navigator.clipboard.writeText(text);
    showToast(t.copied);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    showToast(ok ? t.copied : t.copyUnavailable);
    return ok;
  }
}

function openSolarOverlay() {
  document.body.classList.add("solar-open");
  elements.solarOverlay?.setAttribute("aria-hidden", "false");
  clearCelestialSelection();
}

function closeSolarOverlay() {
  document.body.classList.remove("solar-open");
  elements.solarOverlay?.setAttribute("aria-hidden", "true");
  clearCelestialSelection();
}

function selectCelestial(target) {
  const t = getText();
  const en = target.dataset.celestialEn || "";
  const cn = target.dataset.celestialCn || celestialCopy[en]?.cn || en;
  const copy = celestialCopy[en] || {};
  const desc = state.language === "en"
    ? copy.descEn || copy.desc || "This body adds a stronger spatial identity to the workstation."
    : copy.desc || "这个星体用于增强工作站的空间识别感。";
  const title = state.language === "en" ? en : cn;
  const subtitle = state.language === "en" ? cn : en;

  elements.solarSystemLarge?.classList.add("is-paused");
  elements.solarSystemLarge?.querySelectorAll("[data-celestial-en]").forEach((body) => {
    body.classList.toggle("is-hovered", body === target);
  });

  elements.celestialInfo?.classList.add("is-active");
  elements.celestialInfo.innerHTML = `
    <p class="eyebrow">${escapeHtml(t.selectedBody)}</p>
    <h3>${escapeHtml(title)}</h3>
    <strong>${escapeHtml(subtitle)}</strong>
    <p>${escapeHtml(desc)}</p>
  `;
}

function clearCelestialSelection() {
  elements.solarSystemLarge?.classList.remove("is-paused");
  elements.solarSystemLarge?.querySelectorAll("[data-celestial-en]").forEach((body) => {
    body.classList.remove("is-hovered");
  });

  elements.celestialInfo?.classList.remove("is-active");
  if (elements.celestialInfo) {
    const t = getText();
    elements.celestialInfo.innerHTML = `
      <p class="eyebrow">${escapeHtml(t.selectedBody)}</p>
      <h3>${escapeHtml(t.clickPlanet)}</h3>
      <strong>${escapeHtml(t.clickBody)}</strong>
      <p>${escapeHtml(t.planetHint)}</p>
    `;
  }
}

function findClosestCelestial(event, celestialBodies) {
  let closest = null;
  let closestDistance = Infinity;

  celestialBodies.forEach((body) => {
    const rect = body.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
    const hitRadius = Math.max(rect.width, rect.height) / 2 + 12;
    if (distance <= hitRadius && distance < closestDistance) {
      closest = body;
      closestDistance = distance;
    }
  });

  return closest;
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2500);
}

function applyTheme(theme) {
  const isLight = theme === "light";
  const t = getText();
  document.body.classList.toggle("theme-light", isLight);
  elements.themeToggle?.setAttribute("aria-pressed", String(isLight));
  elements.themeToggle?.setAttribute("aria-label", isLight ? t.themeToDark : t.themeToLight);
  const icon = elements.themeToggle?.querySelector(".theme-icon");
  const text = elements.themeToggle?.querySelector(".theme-text");
  if (icon) icon.textContent = isLight ? "☾" : "☀";
  if (text) text.textContent = isLight ? t.themeDark : t.themeLight;
  elements.themeMeta?.setAttribute("content", isLight ? "#e8f7ff" : "#10131f");
}

function clean(value) {
  return String(value || "").trim();
}

function normalizeMultilineInput(value) {
  return String(value ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
}

function hasTextSelection() {
  const selection = window.getSelection?.();
  return Boolean(selection && !selection.isCollapsed && String(selection.toString()).trim());
}

function cssEscape(value) {
  if (window.CSS?.escape) return window.CSS.escape(String(value));
  return String(value).replace(/["\\]/g, "\\$&");
}

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    showToast(getText().storageFull);
  }
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function scrollMainTop() {
  if (elements.main) {
    elements.main.scrollTo({ top: 0, behavior: "smooth" });
    if (window.matchMedia("(max-width: 1160px)").matches) {
      elements.main.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function isValidCustomCard(card) {
  return Boolean(card && typeof card.id === "string" && typeof card.title === "string" && typeof card.command === "string");
}

function isValidCustomModule(module) {
  return Boolean(module && typeof module.id === "string" && module.id.startsWith("module-") && typeof module.label === "string" && module.label.trim());
}

function normalizeCustomModule(module) {
  const label = clean(module.label);
  return {
    id: clean(module.id),
    label,
    labelEn: clean(module.labelEn) || label,
    sub: clean(module.sub) || "自定义模块",
    subEn: clean(module.subEn) || "Custom module",
    eyebrow: clean(module.eyebrow) || "Custom Orbit / Work Module",
    eyebrowEn: clean(module.eyebrowEn) || "Custom Orbit / Work Module",
    title: clean(module.title) || label,
    titleEn: clean(module.titleEn) || clean(module.labelEn) || label,
    focusTitle: clean(module.focusTitle) || `快速定位${label}`,
    focusTitleEn: clean(module.focusTitleEn) || `Find ${clean(module.labelEn) || label} Fast`,
    searchPlaceholder: clean(module.searchPlaceholder) || `搜：${label}`,
    searchPlaceholderEn: clean(module.searchPlaceholderEn) || `Search: ${clean(module.labelEn) || label}`
  };
}

function createCustomModule(label) {
  const id = `module-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  return normalizeCustomModule({ id, label });
}

function isCustomModule(moduleId) {
  return customModules.some((module) => module.id === moduleId);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("\n", "&#10;");
}

function highlightText(text, query) {
  if (!query) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return escaped.replace(regex, '<mark class="search-highlight">$1</mark>');
}
