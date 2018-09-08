#!/usr/bin/env node
"use strict";	

const prompter=require('./lib/prompter');
const file=require('./lib/file');
const chalk= require('chalk');
const clear= require('clear');
const figlet= require('figlet');
const github=require('./lib/git');
const repo=require('./lib/repo');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Git on Steroids', { horizontalLayout: 'full' })
  )
);

const getGithubToken = async () => {
  let token = github.getStoredGithubToken();
  if(token) {
    return token;
  }
  await github.setGithubCredentials();

  token = await github.registerNewToken();
  return token;
}



const run = async () => {
  try {
    // Retrieve & Set Authentication Token
    const token = await getGithubToken();
    github.githubAuth(token);

    // Create remote repository
    const url = await repo.createRemoteRepo();

    // Create .gitignore file
    await repo.createGitignore();

    // Set up local repository and push to remote
    const done = await repo.setupRepo(url);
    if(done) {
      console.log(chalk.green('All done!'));
    }
  } catch(err) {
      if (err) {
        switch (err.code) {
          case 401:
            console.log(chalk.red('Couldn\'t log you in. Please provide correct credentials/token.'));
            break;
          case 422:
            console.log(chalk.red('There already exists a remote repository with the same name'));
            break;
          default:
            console.log(err);
        }
      }
  }
}


run();

// if(file.directoryExists('.git')){
//     console.log(chalk.red('Exists'))
//     process.exit();
// }

