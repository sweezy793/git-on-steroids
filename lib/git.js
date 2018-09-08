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

            const response=await octokit.authorization.create({
                scopes:['user','public_repo','repo','repo:status'],
                note:'Git on Steroids-tool to ease up your git experience'
            });
            const token=response.data.token;
            if(token){
                conf.set('github.token',token);
                return token;
            }
            else{
                throw new Error('Missing token');
            }
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