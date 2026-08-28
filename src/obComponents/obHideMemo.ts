import { moment } from 'obsidian';
import { getDailyNote } from 'obsidian-daily-notes-interface';
import dailyNotesService from '../services/dailyNotesService';
import appStore from '../stores/appStore';
import { extractTextFromTodoLine } from '../helpers/memoLine';
import { sendMemoToDelete } from './obDeleteMemo';

export async function obHideMemo(memoid: string): Promise<Model.Memo> {
  const { dailyNotes } = dailyNotesService.getState();
  if (/\d{14,}/.test(memoid)) {
    const { vault } = appStore.getState().dailyNotesState.app;
    const timeString = memoid.slice(0, 13);
    const idString = parseInt(memoid.slice(14));
    const changeDate = moment(timeString, 'YYYYMMDDHHmmSS');
    const dailyNote = getDailyNote(changeDate, dailyNotes);
    const fileContent = await vault.read(dailyNote);
    const fileLines = getAllLinesFromFile(fileContent);
    const content = extractTextFromTodoLine(fileLines[idString]);
    const originalLine = '- ' + memoid + ' ' + content;
    const newLine = fileLines[idString];
    const newFileContent = fileContent.replace(newLine, '');
    await vault.modify(dailyNote, newFileContent);
    const deleteDate = await sendMemoToDelete(originalLine);
    return deleteDate;
  }
}

const getAllLinesFromFile = (cache: string) => cache.split(/\r?\n/);
