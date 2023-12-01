#!/usr/bin/env node
import chalk from "chalk";
import {program} from 'commander';
import fs from 'fs';
import path from "path";
import {commands} from "./commands";
import {updateDefinitions} from "./definitions";
import {mkdirAsync, writeFileAsync} from "./utils";


async function commandRunner() {
    program
        .name('nest-crud-cli')
        .description('nest-crud-cli')
        .version('0.0.28');

    program
        .option('-n, --name', 'entity name', 'SampleCLIEntity')
        .option('-c, --columns', 'entity columns')
        .option('-s, --sync', 'sync modules');

    program.parse(process.argv);
    const options = program.opts();

    const className = program.args[0];
    const columns= program.args[1];

    // Sync modules
    if (options.sync) {
        updateDefinitions();
        return;
    }

    const folderPath = path.join(process.cwd(), `${className.toLowerCase()}`);

    if (fs.existsSync(folderPath)) {
        fs.rmdirSync(folderPath, {recursive: true});
    }

    // Create a module folder
    mkdirAsync(folderPath).then((folderPath) => {
        //Execute command to create module's files
        commands(columns, className, updateDefinitions);

        //Create database schema as json file
        writeFileAsync(path.join(process.cwd(), `${className.toLowerCase()}/${className.toLowerCase()}.schema.json`), columns).then((res) => {
            console.log(chalk.green(
                'Creating file ' +
                chalk.blue.underline.bold(`${className.toLowerCase()}.schema.json`) +
                ' has been successful!'
            ));
        }).catch((err) => {
            console.log(chalk.red(`-----Schema Creation Error----- : ${err}`));
        })
    }).catch((err) => {
        return console.log(chalk.red(`-----Module Folder Creation Error----- : ${err}`));
    })

    console.log(chalk.yellow(`Working directory is ${process.cwd()}`));
}

commandRunner();
