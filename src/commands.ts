import AppModuleCommand from "./commands/app-module.command";
import ControllerCommand from "./commands/controller.command";
import DtoCommand from "./commands/dto.command";
import EntityCommand from "./commands/entity.command";
import MapperCommand from "./commands/mapper.command";
import ModuleCommand from "./commands/module.command";
import ServiceCommand from "./commands/service.command";

export const commands = (columns: string, className: string, updateDefinitions: Function) => {
    new EntityCommand().builder({
        data: {
            className: className,
            entityName: `${className.toLowerCase()}s`,
            columns: JSON.parse(columns)
        },
        templatePath: "../../templates/entity.template.hbs",
        outDir: `${className.toLowerCase()}`
    }).execute();

    new ControllerCommand().builder({
        data: {
            className: className,
            entityName: className,
            entityFileName: `./${className.toLowerCase()}.entity`,
            dtoName: `${className}DTO`,
            dtoFileName: `./${className.toLowerCase()}.dto`,
            mapperName: `${className}Mapper`,
            mapperVariableName: `${className.toLowerCase()}Mapper`,
            mapperFileName: `./${className.toLowerCase()}.mapper`,
            serviceName: `${className}Service`,
            serviceVariableName: `${className.toLowerCase()}Service`,
            serviceFileName: `./${className.toLowerCase()}.service`,
            controllerPathName: `${className.toLowerCase()}s`
        },
        templatePath: "../../templates/controller.template.hbs",
        outDir: `${className.toLowerCase()}`
    }).execute();

    new DtoCommand().builder({
        data: {
            className: className,
            columns: JSON.parse(columns)
        },
        templatePath: "../../templates/dto.template.hbs",
        outDir: `${className.toLowerCase()}`
    }).execute();

    new ServiceCommand().builder({
        data: {
            className: className,
            entityName: className,
            entityFileName: `./${className.toLowerCase()}.entity`,
            dtoName: `${className}DTO`,
            dtoFileName: `./${className.toLowerCase()}.dto`,
            mapperName: `${className}Mapper`,
            mapperVariableName: `${className.toLowerCase()}Mapper`,
            mapperFileName: `./${className.toLowerCase()}.mapper`,
            serviceName: `${className}Service`,
            repositoryName: `${className.toLowerCase()}Repository`
        },
        templatePath: "../../templates/service.template.hbs",
        outDir: `${className.toLowerCase()}`
    }).execute();

    new ModuleCommand().builder({
        data: {
            className: className,
            entityName: className,
            entityFileName: `./${className.toLowerCase()}.entity`,
            mapperName: `${className}Mapper`,
            mapperFileName: `./${className.toLowerCase()}.mapper`,
            serviceName: `${className}Service`,
            serviceFileName: `./${className.toLowerCase()}.service`,
            controllerName: `${className.charAt(0).toUpperCase() + className.slice(1)}Controller`,
            controllerFileName: `./${className.toLowerCase()}.controller`,
            moduleName: `${className.charAt(0).toUpperCase() + className.slice(1)}Module`,
        },
        templatePath: "../../templates/module.template.hbs",
        outDir: `${className.toLowerCase()}`
    }).execute((err: any) => {
        updateDefinitions();
    });

    new MapperCommand().builder({
        data: {
            className: className,
            entityName: className,
            entityFileName: `./${className.toLowerCase()}.entity`,
            dtoName: `${className}DTO`,
            dtoFileName: `./${className.toLowerCase()}.dto`,
            mapperName: `${className}Mapper`,
            columns: JSON.parse(columns)
        },
        templatePath: "../../templates/mapper.template.hbs",
        outDir: `${className.toLowerCase()}`
    }).execute();
}

export const appModuleCommand = (databaseOptions: string) => {
    new AppModuleCommand().builder({
        data: {
            className: 'app',
            databaseOptions: JSON.parse(databaseOptions),
        },
        templatePath: "../../templates/app-module.template.hbs",
        outDir: `./`
    }).execute((err: any) => {
    });
}
