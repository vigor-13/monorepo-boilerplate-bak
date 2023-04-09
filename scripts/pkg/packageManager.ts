import { Command } from 'commander';
import * as readline from 'readline';
import * as prettier from 'prettier';
import * as fs from 'fs';
import * as path from 'path';
import PackageJson from '../../package.json';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const program = new Command();

program.name('Project Package Manager').description('');

/**
 * Test command
 */
program
  .command('test')
  .description('test')
  .action(() => {
    console.log('test!!!');
  });

/**
 * Create package command
 */
program
  .command('create')
  .description('create package')
  .action(() => {
    rl.question('Package name: ', (name) => {
      const dir = path.join(__dirname, '..', '..', 'packages', name);

      if (fs.existsSync(dir)) return;

      fs.mkdirSync(dir);

      const packageName = PackageJson.name.replace('root', name);

      const content = `
        {
          "name": "${packageName}",
          "version": "0.1.0",
          "description": "",
          "author": "",
          "license": "ISC",
          "main": "index.js",
          "scripts": {
            "test": "echo test"
          }
        }      
      `;

      const packageJson = prettier.format(content, {
        parser: 'json',
      });

      fs.writeFile(`${dir}/package.json`, packageJson, () => null);

      rl.close();
    });
  });

program.parse();
