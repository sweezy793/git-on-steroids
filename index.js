#!/usr/bin/env node
"use strict";	

const prompter=require('./lib/prompter');
const file=require('./lib/file');
const chalk= require('chalk');
const clear= require('clear');
const figlet= require('figlet');
const github=require('./lib/git');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Git on Steroids', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  let token = github.getStoredGithubToken();
  if(!token) {
    await github.setGithubCredentials();
    token = await github.registerNewToken();    
  }
  console.log(token);
}

run();

// if(file.directoryExists('.git')){
//     console.log(chalk.red('Exists'))
//     process.exit();
// }

