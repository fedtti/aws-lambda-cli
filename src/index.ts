#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { input, confirm, checkbox } from '@inquirer/prompts';
import {
  CreateFolder,
  GitInit,
  CreateNpmConfigFile,
  InstallPackageDeps,
  CreateSlsConfigFile,
  CreateLambdaHandlerFile,
  CopyConfigFiles
} from './lib/utils/index.js';

/**
 * Print the tool description in the console.
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
 * Sanitize the user input to turn it into a valid kebab-case string.
 * @param {string} name - The given package name.
 * @returns {string}
 */
const sanitizePackageName = (name: string): string => {
  return name.match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)!
             .filter(Boolean)
             .map(string => string.toLowerCase())
             .join('-');
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
        transformer: (string) => sanitizePackageName(string)
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
    answers.packageName = sanitizePackageName(answers.packageName);
    const folderName: string = await CreateFolder();
    await GitInit(folderName);

    const packageOptions: PackageOptions = {
      
    };

    await CreateNpmConfigFile(folderName, answers.packageName, packageOptions);

    const devDependencies: string[] = [],
             dependencies: string[] = [];
    !!answers.typeScriptSupport ? (devDependencies.push('@types/node', '@types/express') && devDependencies.push('typescript')): 0; // Add TypeScript support (default, optional) to the package.
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
