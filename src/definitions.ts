import fs from "fs";
import {join} from "path";
import DefinitionCommand from "./commands/definition.command";

export const getAllFiles = (dirPath: any, arrayOfModules?: any) => {
    let files = fs.readdirSync(dirPath)

    arrayOfModules = arrayOfModules || []

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfModules = getAllFiles(dirPath + "/" + file, arrayOfModules)
        } else {
            if (file.includes('.module.') && !file.includes('app.module.') && !file.includes('content-type.')) {
                const rawModuleName = file.split('.')[0];
                const preparedModuleName = `${rawModuleName.charAt(0).toUpperCase() + rawModuleName.slice(1)}Module`

                arrayOfModules.push({
                    rawModuleName: rawModuleName,
                    preparedModuleName: preparedModuleName,
                    path: `./${rawModuleName}/${rawModuleName}.module`
                })
            }
        }
    })

    return arrayOfModules
}

export const updateDefinitions = () => {
    const moduleDefinitions = getAllFiles(join(process.cwd()));

    new DefinitionCommand().builder({
        data: {
            className: 'module',
            modules: moduleDefinitions
        },
        templatePath: "../../templates/definition.template.hbs",
        outDir: "./"
    }).execute();
}