    const inquirer=require('inquirer');
    const file=require('./file');

    function checkGitDetails(){
        const questions=[
            {
                name:'username',
                type:'input',
                message:'Enter your GitHub username or email ID',
                validate:function(value){
                    if(value.length)
                    {
                        return true;
                    }
                    else
                    {
                        return `username or email can't be empty`
                    }
                    
                }
            },
            {
                name:'password',
                type:'password',
                validate:function(value){
                    if(value.length){
                        return true;
                    }
                    else{
                        return `Password can't be empty`
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    }

    function askRepoDetails(){
        const argv=require('minimist')(process.argv.slice(2));

        const questions=[
            {
                type:'input',
                name:'name',
                message:'Enter a name for the repository:',
                default:argv._[0]||file.directoryExists(),
                validate:function(value){
                    if(value.length){
                        return true;
                    }
                    else{
                        return 'Please enter a repo name';
                    }
                }
            },
            {
                type:'input',
                name:'description',
                default:argv._[1]||null,
                message:'Enter a description for repo(Optional)'
            },
            {
                type:'list',
                name:'visibility',
                message:'Public or Private',
                choices:['public','private'],
                default:'public'
            }
        ];
        return inquirer.prompt(questions);
    }

    function askIgnoreFiles(filelist){
        const questions = [
          {
            type: 'checkbox',
            name: 'ignore',
            message: 'Select the files and/or folders you wish to ignore:',
            choices: filelist,
            default: ['node_modules']
          }
        ];
        return inquirer.prompt(questions);
      }

    module.exports={checkGitDetails,askRepoDetails,askIgnoreFiles};