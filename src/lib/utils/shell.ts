import { exec, spawn } from 'child_process';

export const GitInit: any = (folder: string): any => {
  const commands: string[] = [`cd ${folder}`, 'git init -q'];
};