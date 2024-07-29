import { exec, spawn } from 'child_process';

/**
 * Initialize a new Git empty repository in the target folder with the default options.
 * @param {string} folder - The target folder.
 */
export const GitInit: any = (folder: string): any => {
  exec('git init -q', { cwd: `./${folder}` }, (error, stderr) => {
    if (!!error) {
      // TODO @fedtti - Throw new error.
      console.dir(error);
      return;
    }
    if (!!stderr) {
      // TODO @fedtti - Throw new error.
      console.dir(stderr);
    }
  });
};

/**
 * Install package development dependencies and dependencies in the target folder.
 * @param {string} folder - The target folder.
 * @param {string[]} dependencies - The package dependencies.
 * @param {string[]} devDependencies - The package develompent dependencies.
 */
export const InstallPackageDeps: any = (folder: string, dependencies: string[], devDependencies: string[]): any => {

};