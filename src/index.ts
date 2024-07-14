#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { input } from '@inquirer/prompts';
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

const devDependencies: string[] = [
  '@types/node',
  '@types/express'
];

const dependencies: string[] = [];

/**
 * 
 */
const run: any = async (): Promise<any> => {
  init();
  try {
    const answers: UserAnswers = {
      packageName: await input({ message: 'Enter a name for the new package:' })
    };
    const folderName: string = await CreateFolder();
    await GitInit(folderName);
    const packageOptions: PackageOptions = {
      
    };
    await NpmInit(folderName, answers.packageName, packageOptions);
    await InstallPackageDeps(folderName, devDependencies, dependencies);
    await CopyConfigFiles(folderName);
    console.info('');
  } catch (error: any) {
    console.error(`${error.name}: ${error.message}.`);
    console.dir(error);
  }
};
run();
