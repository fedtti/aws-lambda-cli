import fs from 'fs';

/**
 * Create a new empty folder of the given name, if available, or fallback to a default one.
 * @returns {string}
 */
export const CreateFolder: any = (): string => {
  const folderName: string = (process.argv.length > 2) ? process.argv[2] : 'my-lambda';
  if (!fs.existsSync(`./${folderName}`)) {
    fs.mkdirSync(folderName);
  }
  return folderName;
};

/**
 * Create the proper Serverless configuration file in the target folder, based on the user answers.
 * @param {string} folder - The target folder.
 * @param {UserAnswers} answers - The user answers.
 */
export const CreateSlsConfigFile: any = (folder: string, answers: UserAnswers): any => {
  let data: string = '# serverless.yml\n\n';
  const service = `service: ${answers.packageName}\n\nprovider:\n  name: aws\n  runtime: nodejs20.x\n  stage: dev\n  region: ${process.env.AWS_DEFAULT_REGION || process.env.AWS_REGION || 'eu-south-1'}\n  timeout: 30\n\n`;
  const functions = `functions:\n  ${answers.packageName}:\n  name:  ${answers.packageName}-\${self:provider.stage}\n  description: ${answers.packageDescription}`;
  data += `configValidationMode: error\n`;
  fs.writeFileSync(`./${folder}/serverless.yml`, data);
};

/**
 * 
 * @param {string} folder - The target folder.
 * @param {UserAnswers} answers - The user answers.
 */
export const CreateLambdaHandlerFile: any = (folder: string, answers: UserAnswers): any => {

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
