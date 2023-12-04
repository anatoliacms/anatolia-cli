import AbstractCommand from "../base/abstract.command";

export default class AppModuleCommand extends AbstractCommand {
    getFileExtension(): string {
        return "module";
    }

}