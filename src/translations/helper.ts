// Code from https://github.com/valentine195/obsidian-admonition/blob/master/src/lang/helpers.ts

import { moment } from 'obsidian';

import ar from './locale/ar';
import cz from './locale/cz';
import da from './locale/da';
import de from './locale/de';
import en from './locale/en';
import enGB from './locale/en-gb';
import es from './locale/es';
import fr from './locale/fr';
import hi from './locale/hi';
import id from './locale/id';
import it from './locale/it';
import ja from './locale/ja';
import ko from './locale/ko';
import nl from './locale/nl';
import no from './locale/no';
import pl from './locale/pl';
import pt from './locale/pt';
import ptBR from './locale/pt-br';
import ro from './locale/ro';
import ru from './locale/ru';
import tr from './locale/tr';
import zhCN from './locale/zh-cn';
import zhTW from './locale/zh-tw';

const localeMap: { [k: string]: Partial<typeof en> } = {
  ar,
  cs: cz,
  da,
  de,
  en,
  'en-gb': enGB,
  es,
  fr,
  hi,
  id,
  it,
  ja,
  ko,
  nl,
  nn: no,
  pl,
  pt,
  'pt-br': ptBR,
  ro,
  ru,
  tr,
  'zh-cn': zhCN,
  'zh-tw': zhTW,
};

const locale = localeMap[moment.locale()];

export function t(str: keyof typeof en): string {
  // 兜底返回 key 本身：缺词条时显示英文键，而不是 undefined（undefined 会让 .replace 之类的调用直接抛错白屏）
  return (locale && locale[str]) || en[str] || str;
}

/** 带占位符的词条：{name} 用 vars 填充（体检页/迁移提示等多处带计数） */
export function tf(str: keyof typeof en, vars: Record<string, string | number>): string {
  const template = t(str);
  return typeof template === 'string'
    ? template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''))
    : String(str);
}
