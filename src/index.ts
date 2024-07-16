#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { input, confirm, checkbox } from '@inquirer/prompts';
import {
  CreateFolder,
  GitInit,
  NpmInit,
  InstallPackageDeps,
  CreateSlsConfigFile,
  CreateLambdaHandlerFile,
  CopyConfigFiles
} from './lib/utils/index.js';

/**
 * Print the package description in the console.
 */
const init: any = (): any => {
  console.info(
    chalk.green(
      figlet.textSync('Create AWS Lambda', {
        font: 'Ghost'
      })
    )
  );
};

/**
 * 
 */
const run: any = async (): Promise<any> => {
  init();
  try {
    const answers: UserAnswers = {
      packageName: await input({ 
        message: 'Enter a name (kebab-case) for the new package:',
        transformer: (string): string => { // Transform the raw user input into a valid kebab-case string.
          return string.match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)!
                       .filter(Boolean)
                       .map(string => string.toLowerCase())
                       .join('-');
          }
        }),
      packageDescription: await input({ message: 'Enter a description for the new package:' }),
      typeScriptSupport: await confirm({ message: 'Add TypeScript support?', default: true }),
      additionalFeatures: await checkbox({
        message: 'Select additional features:',
        choices: [
          { name: 'DynamoDB', value: 'dynamodb' },
          { name: 'Secrets Manager', value: 'secrets-manager'}
        ]
      })
    };
    const folderName: string = await CreateFolder();
    await GitInit(folderName);
    const packageOptions: PackageOptions = {
      
    };
    await NpmInit(folderName, answers.packageName, packageOptions);
    const devDependencies: string[] = [],
             dependencies: string[] = [];
    !!answers.typeScriptSupport ? (devDependencies.push('@types/node') && dependencies.push('typescript')): 0; // Add TypeScript support (default) to the package.
    await InstallPackageDeps(folderName, devDependencies, dependencies);
    await CreateSlsConfigFile(folderName, answers);
    await CreateLambdaHandlerFile(folderName, answers);
    await CopyConfigFiles(folderName);
    console.info('');
  } catch (error: any) {
    console.error(`${error.name}: ${error.message}.`);
    console.dir(error);
  }
};
run();
