import { exec, spawn } from 'child_process';

/**
 * Initialize a new Git repository in the specified folder.
 * @param {string} folder - 
 */
export const GitInit: any = (folder: string): any => {
  exec(`git init`, { cwd: `${folder}/` }, (error, stderr, stdout) => {

  });
};
