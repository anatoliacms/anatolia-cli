import fs from "fs";

export const mkdirAsync = (folderPath: string) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(folderPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(folderPath);
        });
    })
}

export const writeFileAsync = (fileName: string, content: string) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, content, function (err) {
            if (err) {
                reject(err);
            }

            resolve({fileName: fileName, content: content});
        });
    })
}