import { exec, spawn } from 'child_process';

/**
 * Initialize a new Git empty repository in the target folder with the default options.
 * @param {string} folder - The target folder.
 */
export const GitInit: any = (folder: string): any => {
  exec('git init -q', { cwd: `${folder}/` }, (error, stderr) => {
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
 * Initialize a new npm package of the chosen name in the target folder with the (optional) selected options.
 * @param {string} name - The chosen name.
 * @param {string} folder - The target folder.
 * @param {NpmOptions} options - The (optional) selected options.
 */
export const NpmInit: any = (folder: string, name: string, options?: NpmOptions): any => {
  // spawn();
};
