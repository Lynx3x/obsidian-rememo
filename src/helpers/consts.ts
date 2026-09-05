// 移动端样式适配额外类名
export const SHOW_SIDERBAR_MOBILE_CLASSNAME = 'mobile-show-sidebar';

// 默认动画持续时长
export const ANIMATION_DURATION = 200;

// toast 动画持续时长
export const TOAST_ANIMATION_DURATION = 400;

// 一天的毫秒数
export const DAILY_TIMESTAMP = 3600 * 24 * 1000;

// 格式化时间

// 标签 正则
//eslint-disable-next-line
export const TAG_REG = /\s#([\p{Letter}\p{Emoji_Presentation}\p{Number}\/_-]+)/gu;
//eslint-disable-next-line
export const FIRST_TAG_REG = /(<p>|<br>)#([\p{Letter}\p{Emoji_Presentation}\p{Number}\/_-]+)/gu;
//eslint-disable-next-line
export const NOP_FIRST_TAG_REG = /^#([\p{Letter}\p{Emoji_Presentation}\p{Number}\/_-]+)/gu;
//eslint-disable-next-line
export const ALL_TAG_REG = /([\p{Letter}\p{Emoji_Presentation}\p{Number}\/_-]+)/u;

// URL 正则
//eslint-disable-next-line
export const LINK_REG =
  /(\s|：|>|^)((http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]))/g;

// export const CHECK_LINK_REG = /(\((\s*))(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
// export const LINK_REG = /(https?:\/\/[^\s<\\*>']+)/g;

// MARKDOWN URL 正则
//eslint-disable-next-line
export const MD_LINK_REG = /\[([\s\S]*?)\]\(([\s\S]*?)\)/gu;

// 图片 正则
// 带参数扩展名（webp/bmp）也识别；用于"内容里是否含图"的门控判断
export const IMAGE_URL_REG = /([^\s<\\*>']+\.(jpeg|jpg|gif|png|svg|webp|bmp))(\]\])?(\))?/g;

// Markdown 内部图片正则
// Group 1 为图片
// Group 2 为缩放比例
export const MARKDOWN_URL_REG = /(!\[([^\]]*)(\|)?(.*?)\]\((.*?)("(?:.*[^"])")?\s*\))/g;

// 检测是否为外部图片
// 扩展名后允许查询串/锚点（?size=1024&x=1），避免 URL 被截断
//eslint-disable-next-line
export const MARKDOWN_WEB_URL_REG = /(\s|：|^)(http[s]?:\/\/)([^\/\s]+\/)(\S*?\.(?:jpeg|jpg|gif|png|svg|bmp|webp)(?:[?#][^\s)]*)?)(?!\))/g;

// Wiki 图片正则
// Group 1 为图片
// Group 5 为缩放比例
export const WIKI_IMAGE_URL_REG = /!\[\[((.*?)\.(jpeg|jpg|gif|png|svg|bmp|webp))?(\|)?(.*?)\]\]/g;

// memo 关联正则
/** MEMO_LINK：[@标签](目标) 或 [@](目标)（P3 空标签——展示文本渲染时取目标 memo 内容，标签不用存） */
export const MEMO_LINK_REG = /\[@(.*?)\]\((.+?)\)/g;

// Internal
