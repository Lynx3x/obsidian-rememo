// Credits go to Liam's Periodic Notes Plugin: https://github.com/liamcain/obsidian-periodic-notes
import { TAbstractFile, TFile } from 'obsidian';
import dailyNotesService from '../services/dailyNotesService';

/**
 * [[ 文件名联想（类 Obsidian 原生）：
 * 匹配优先级 = basename 前缀 > basename 包含 > 全路径包含；同分按路径字典序。
 * rta 的 dataProvider 收到的 token 仍带 '['（如 '[ob'），这里统一剥掉。
 */
export const getSuggestions = (inputStr: string) => {
  const { app } = dailyNotesService.getState();
  const query = (inputStr.startsWith('[') ? inputStr.slice(1) : inputStr).toLowerCase();
  const results: { name: string; char: string; file: TFile; score: number }[] = [];

  app.vault.getAllLoadedFiles().forEach((file: TAbstractFile) => {
    if (!(file instanceof TFile)) return;
    const ext = file.extension;
    if (!(ext === 'md' || ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'gif')) return;

    const base = file.basename.toLowerCase();
    const path = file.path.toLowerCase();
    let score = 0;
    if (!query) {
      // 刚输入 [[ 未打字：全量列出（Obsidian 同款），按路径排序即可
      score = 1;
    } else if (base === query) {
      score = 100;
    } else if (base.startsWith(query)) {
      score = 60;
    } else if (base.includes(query)) {
      score = 40;
    } else if (path.includes(query)) {
      score = 20;
    } else {
      return;
    }
    results.push({
      name: file.basename as string,
      char: file.name as string,
      file: file as TFile,
      score,
    });
  });

  results.sort((a, b) => b.score - a.score || a.file.path.localeCompare(b.file.path));
  return results.map(({ score, ...item }) => item);
};
