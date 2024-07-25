#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { input, confirm, checkbox } from '@inquirer/prompts';
import {
  SanitizeInput,
  CreateFolder,
  GitInit,
  CreateNpmConfigFile,
  InstallPackageDeps,
  CreateSlsConfigFile,
  CreateAwsLambdaHandlerFile,
  CopyConfigFiles,
  RemoveTsConfigFile
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
 * Prompt the user to configure the available options and create the starter project.
 */
const run: any = async (): Promise<any> => {
  init();
  try {
    const answers: UserAnswers = {
      packageName: await input({
        message: 'Enter a name (kebab-case):',
        transformer: (string) => SanitizeInput(string)
      }),
      packageDescription: await input({ message: 'Enter a description:' }),
      typeScriptSupport: await confirm({ message: 'Add TypeScript support?', default: true }),
      additionalFeatures: await checkbox({
        message: 'Select additional features:',
        choices: [
          { name: 'DynamoDB', value: 'dynamodb' },
          { name: 'Secrets Manager', value: 'secrets-manager'}
        ]
      },
      { clearPromptOnDone: true })
    };
    answers.packageName = SanitizeInput(answers.packageName);
    const folderName: string = await CreateFolder();
    await GitInit(folderName);
    const packageOptions: PackageOptions = {
      
    };

    await CreateNpmConfigFile(folderName, answers, packageOptions);
    const devDependencies: string[] = [],
             dependencies: string[] = [];
    !!answers.typeScriptSupport ? (devDependencies.push('@types/node', '@types/express') && devDependencies.push('typescript')): 0; // Add TypeScript support (default, optional) to the package.
    await InstallPackageDeps(folderName, devDependencies, dependencies);
    await CreateSlsConfigFile(folderName, answers);
    await CreateAwsLambdaHandlerFile(folderName, answers);
    await CopyConfigFiles(folderName);
    await RemoveTsConfigFile(folderName, answers.typeScriptSupport); // Remove TypeScript support (default, optional) from the package if not required.
    console.info('');
  } catch (error: any) {
    console.error(`${error.name}: ${error.message}.`);
    console.dir(error);
  }
};
run();
