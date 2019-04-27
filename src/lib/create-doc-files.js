import chalk from 'chalk';

import { createFile, createDirectory, formatRequestPath } from './utils';
import { writeMarkdown } from './write-markdown';

export const buildFileName = (folderPath, request) =>
  `${folderPath}/[${request.method.toLowerCase()}]${formatRequestPath(request.originalPath)}.md`

export const createDocFiles = (docs) => {
  let err = null;

  const folderPath = `${process.cwd()}/docs`;
  err = createDirectory(folderPath);
  if (err) return err;

  const [ doc ] = docs;
  const fileName = buildFileName(folderPath, doc.request);
  const content = writeMarkdown(docs);
  err = createFile(fileName, content);
  if (err) return err;

  // TODO: document it
  if (process.env.THE_OWL_LOG_MESSAGES) console.info(getSuccessMessage(fileName));

  return null;
};

export const getSuccessMessage = (fileName) =>
  `${chalk.white.bgHex('#046824')('\r\n SUCCESS ')} Doc created on "${chalk.gray(fileName)}" path.`;

export default createDocFiles;
