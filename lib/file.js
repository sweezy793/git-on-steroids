//get the current directory and repo name
//check if directory exists

const fs = require('fs');
const path = require('path');

function getCurrentDirectoryBase(){
    return path.basename(process.cwd());
  };

function directoryExists (filePath){
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  };


module.exports = {getCurrentDirectoryBase,directoryExists};