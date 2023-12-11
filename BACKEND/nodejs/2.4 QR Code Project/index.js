import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";
const prompt = inquirer.createPromptModule()

prompt({type:"input",name:"userInput", message:"Your link here:"}).then((answers) => {
   //QR CODE
   var qr_png = qr.image(answers.userInput, { type: 'png' });
   qr_png.pipe(fs.createWriteStream('userURL.png'))
    
   var svg_string = qr.imageSync(answers.userInput, { type: 'png' });
    // QR CODE
    //TEXT

    fs.writeFile('userUrl.txt',answers.userInput,(err)=>{
        if (err) throw err;
        console.log(err)
    })
    
    console.log(answers.userInput)
    //TEXT
})



/* 
3. Create a txt file to save the user input using the native fs node module.
 */