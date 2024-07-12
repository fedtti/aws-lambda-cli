import { exec, spawn } from 'child_process';

/**
 * Initialize a new Git repository in the specified folder.
 * @param {string} folder - Target folder.
 */
export const GitInit: any = (folder: string): any => {
  exec(`git init -q`, { cwd: `${folder}/` }, (error, stderr) => {
    if (!!error) {
      console.error(error);
      return;
    }
    if (!!stderr) {
      console.error(stderr);
    }
  });
};

/**
 * Initialize a new npm package in the specified folder with the (optional) defined options.
 */
export const NpmInit: any = (folder: string, options?: any): any => {

};
