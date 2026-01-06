import {exec} from "child_process";
import { error } from "console";
import fs from "fs";
import path from "path";
import { stderr, stdout } from "process";

export function runJestTest(testCode){
    const testDir = path.join(process.cwd(), "__tests__");
    const testFile = path.join(testDir, "ai.generated.tests.js");

    if(!fs.existsSync(testDir)){
        fs.mkdirSync(testDir);
    }

    fs.writeFileSync(testFile, testCode);

    return new Promise((resolve) => {
        exec("npx jest --runInBand", (error,stdout,stderr) =>{
            if(error){
                resolve(stderr || stdout);
            }else{
                resolve(stdout);
            }
        })
    })
}