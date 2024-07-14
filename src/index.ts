#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { input, confirm, checkbox } from '@inquirer/prompts';
import {
  CreateFolder,
  GitInit,
  NpmInit,
  InstallPackageDeps,
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
      packageName: await input({ message: 'Enter a name for the new package:' }),
      typeScriptSupport: await confirm({ message: 'Add TypeScript support?', default: true }),
      otherFeatures: await checkbox({ message: 'Select other features:', choices: [{ name: 'DynamoDB', value: 'dynamodb' }] })
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
    await CopyConfigFiles(folderName);
    console.info('');
  } catch (error: any) {
    console.error(`${error.name}: ${error.message}.`);
    console.dir(error);
  }
};
run();
