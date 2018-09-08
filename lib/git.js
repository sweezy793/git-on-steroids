const octokit=require('@octokit/rest')();
const configstore=require('configstore');
const package=require('../package.json');
const conf=new configstore(package.name);
const lodash=require('lodash');
const clui=require('clui');
const Spinner=clui.Spinner;
const chalk=require('chalk');
const prompter=require('./prompter');

module.exports = {

    getInstance: () => {
      return octokit;
    },
  
    getStoredGithubToken : () => {
      return conf.get('github.token');
    },
  
    setGithubCredentials : async () => {

        const credentials=await prompter.checkGitDetails();
        octokit.authenticate(
            lodash.extend(
                {
                    type:'basic',
                },
                credentials
            )
        );
    },
  
    registerNewToken : async () => {
        const status = new Spinner('Checking your details, please wait...');
        status.start();
        try{

        }
        catch(err)
        {
            throw err;
        }
        finally{
            status.stop();
        }
    }
  
  }