import fs from 'fs';

/**
 * Create a new empty folder of the given name, if available, or fallback to a default one.
 * @returns {string}
 */
export const CreateFolder: any = (): string => {
  const folderName: string = (process.argv.length > 2) ? process.argv[2] : 'my-lambda';
  if (!fs.existsSync(`./${folderName}`)){
    fs.mkdirSync(folderName);
  }
  return folderName;
};

/**
 * Copy all of the provided configuration files to the target folder.
 * @param {string} folder - The target folder.
 */
export const CopyConfigFiles: any = (folder: string): any => {
  try {
    fs.readdirSync(`./dist/lib/data`)
      .forEach(file => {
        const data = fs.readFileSync(`./dist/lib/data/${file}`);
        fs.writeFileSync(`./${folder}/${file}`, data);
      });
  } catch (error: any) {
    console.error(`${error.name}: ${error.message}.`);
    console.dir(error);
  }
};
