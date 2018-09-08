const lodash=require('lodash');
const fs=require('fs');
const git=require('simple-git')();
const cli=require('clui');
const spinner=cli.Spinner;
const inquirer=require('./prompter');
const ghub=require('./git');


module.exports={
    createRemoteRepo: async () => {
        const github = ghub.getInstance();
        const answers = await inquirer.askRepoDetails();

        const data={
            name:answers.name,
            description:answers.description,
            private:(answers.visibility=='private')
        };
        const status = new Spinner('Creating remote repository...');
        status.start();
        
        try{
            const response=await github.repos.create(data);
            return response.data.ssh_url;
        }
        catch(err)
        {
            throw err;
        }
        finally
        {
            status.stop();
        }
    },
    createGitignore: async () => {
        const filelist = lodash.without(fs.readdirSync('.'), '.git', '.gitignore');
    
        if (filelist.length) {
          const answers = await inquirer.askIgnoreFiles(filelist);
          if (answers.ignore.length) {
            fs.writeFileSync( '.gitignore', answers.ignore.join( '\n' ) );
          } else {
            touch( '.gitignore' );
          }
        } else {
            touch('.gitignore');
        }
      },
      setupRepo: async (url) => {
        const status = new Spinner('Initializing local repository and pushing to remote...');
        status.start();
    
        try {
          await git
            .init()
            .add('.gitignore')
            .add('./*')
            .commit('Initial commit')
            .addRemote('origin', url)
            .push('origin', 'master');
          return true;
        } catch(err) {
          throw err;
        } finally {
          status.stop();
        }
      }

}