import fs from 'fs';
import { SanitizeInput } from './tools.js';

/**
 * Create a new empty folder of the given name, if available, or fallback to a default one.
 * @returns {string}
 */
export const CreateFolder: any = (): string => {
  let folderName: string = (process.argv.length > 2) ? process.argv[2] : 'my-lambda';
  folderName = SanitizeInput(folderName);
  if (!fs.existsSync(`./${folderName}`)) {
    fs.mkdirSync(folderName);
  }
  // TODO: @fedtti - Sanitize the folder name.
  return folderName;
};

/**
 * Initialize a new npm package of the chosen name in the target folder with the (optional) selected options.
 * @param {string} folder - The target folder.
 * @param {string} name - The chosen name.
 * @param {PackageOptions} options - The (optional) selected options.
 */
export const CreateNpmConfigFile: any = (folder: string, answers: UserAnswers, options?: PackageOptions): any => {
  let data: string = '{\n';
  data += `  "name": "${answers.packageName}",\n  "version": "0.1.0",\n  "description": "${answers.packageDescription}",\n`;
  // TODO: @fedtti - Add sections.
  data += `"license": "${answers.license}"`;
  data += `  "main": "./dist/index.js",\n  "bin": {\n    "${answers.packageName}: "./dist.index.js"\n  },\n`;
  data += '}\n'
  fs.writeFileSync(`./${folder}/package.json`, data);
};

/**
 * Create the proper Serverless configuration file in the target folder, based on the user answers.
 * @param {string} folder - The target folder.
 * @param {UserAnswers} answers - The user answers.
 */
export const CreateSlsConfigFile: any = (folder: string, answers: UserAnswers): any => {
  let data: string = '# serverless.yml\n\n';
  const service: string = `service: ${answers.packageName}\n\nprovider:\n  name: aws\n  runtime: nodejs20.x\n  stage: dev\n  region: ${process.env.AWS_DEFAULT_REGION || process.env.AWS_REGION || 'eu-south-1'}\n  timeout: 30`;
  const functions: string = `functions:\n  ${answers.packageName}:\n  name:  ${answers.packageName}-\${self:provider.stage}\n  description: ${answers.packageDescription}\n  handler: ./dist/index.handler\n  timeout: 30\n  environment:\n    NODE_ENV: ${process.env.NODE_ENV || 'development'}\n    DEBUG: '*,-body-parser:*,-express:*,-*:trace'\n  events:\n    - http: 'ANY /'\n    - http: 'ANY /{proxy+}'`;
  let packageSection: string = `package:\n  individually: true\n  patterns:\n    - dist/**\n    - '!src/**'\n    - '!.git/**'\n    - '!.DS_Store'\n    - '!.env'\n    - '!.gitignore'\n    - '!.npmrc'\n    - '!.nvmrc'\n    - '!.vscode'\n    - '!README.md'`; // Set to `packageSection` because `package` is a reserved word.
  !!answers.typeScriptSupport ? packageSection += `\n    - '!tsconfig.json'` : 0;
  data += `${service}\n\n${functions}\n\n${packageSection}\n\n`;
  data += `configValidationMode: error\n`;
  fs.writeFileSync(`./${folder}/serverless.yml`, data);
};

/**
 * Create the AWS Lambda handler file in the target folder, based on the user answers.
 * @param {string} folder - The target folder.
 * @param {UserAnswers} answers - The user answers.
 */
export const CreateAwsLambdaHandlerFile: any = (folder: string, answers: UserAnswers): any => {

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

/**
 * Remove TypeScript support (default, optional) configuration file from the target folder if not required.
 * @param {string} folder - The target folder.
 * @param {boolean} support - False, if TypeScript is not required.
 */
export const RemoveTsConfigFile: any = (folder: string, support: boolean): any => {
  if (!support) {
    try {
      fs.unlinkSync(`./${folder}/tsconfig.json`);
    } catch (error: any) {
      console.error(`${error.name}: ${error.message}.`);
      console.dir(error);
    }
  }
};