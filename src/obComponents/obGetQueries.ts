import { moment, TFile } from 'obsidian';
import appStore from '../stores/appStore';
import { QUERY_FILE_NAME } from '../helpers/consts';
import { getDailyNotePath } from '../helpers/utils';

export const findQuery = async (): Promise<unknown[]> => {
  const { metadataCache, vault } = appStore.getState().dailyNotesState.app;

  const queryList = [];

  const filePath = getDailyNotePath();
  const absolutePath = filePath + '/' + QUERY_FILE_NAME + '.md';

  const queryFile = metadataCache.getFirstLinkpathDest('', absolutePath);
  if (queryFile instanceof TFile) {
    const fileContents = await vault.read(queryFile);
    const fileLines = getAllLinesFromFile(fileContents);
    if (fileLines && fileLines.length != 0) {
      for (let i = 0; i < fileLines.length; i++) {
        if (fileLines[i] === '') continue;
        const createdDateString = getCreatedDateFromLine(fileLines[i]);
        const createdDate = moment(createdDateString, 'YYYYMMDDHHmmss').format('YYYY/MM/DD HH:mm:ss');
        const updatedDate = createdDate;
        const id = createdDateString + getIDFromLine(fileLines[i]);
        const querystring = getStringFromLine(fileLines[i]);
        const title = getTitleFromLine(fileLines[i]);
        let pinnedDate;

        if (/^(.+)pinnedAt(.+)$/.test(fileLines[i])) {
          pinnedDate = moment(getPinnedDateFromLine(fileLines[i]), 'YYYYMMDDHHmmss');
          queryList.push({
            createdAt: createdDate,
            id: id,
            pinnedAt: pinnedDate.format('YYYY/MM/DD HH:mm:ss'),
            querystring: querystring,
            title: title,
            updatedAt: updatedDate,
            userId: '',
          });
        } else if (/^(.+)\[\](.+)?$/.test(fileLines[i])) {
          queryList.push({
            createdAt: createdDate,
            id: id,
            pinnedAt: '',
            querystring: '',
            title: title,
            updatedAt: updatedDate,
            userId: '',
          });
        } else {
          queryList.push({
            createdAt: createdDate,
            id: id,
            pinnedAt: '',
            querystring: querystring,
            title: title,
            updatedAt: updatedDate,
            userId: '',
          });
        }
      }
    }
  }

  return queryList;
};

const getAllLinesFromFile = (cache: string) => cache.split(/\r?\n/);
const getCreatedDateFromLine = (line: string) => /^(\d{14})/.exec(line)?.[1];
const getIDFromLine = (line: string) => /^(\d{14})(\d{1,})\s/.exec(line)?.[2];
const getStringFromLine = (line: string) => /^(\d{14})(\d{1,})\s(.+)\s(\[(.+)?\])/.exec(line)?.[4];
const getTitleFromLine = (line: string) => /^(\d{14})(\d{1,})\s(.+)\s(\[(.+)\])/.exec(line)?.[3];
const getPinnedDateFromLine = (line: string) =>
  /^(\d{14})(\d{1,})\s(.+)\s(\[(.+)\])\s(pinnedAt: (\d{14}))/.exec(line)?.[7];
