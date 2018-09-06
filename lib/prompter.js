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

    module.exports={checkGitDetails};