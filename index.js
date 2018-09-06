#!/usr/bin/env node
"use strict";	

const file=require('./lib/file');
const chalk= require('chalk');
const clear= require('clear');
const figlet= require('figlet');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Git on Steroids', { horizontalLayout: 'full' })
  )
);

// if(file.directoryExists('.git')){
//     console.log(chalk.red('Exists'))
//     process.exit();
// }

