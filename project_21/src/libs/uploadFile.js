import {createWriteStream} from "node:fs";
import path, {parse, join} from "node:path";
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


/**
 * upload a Single File
 * @param {Object} file the file to upload
 * @returns {Promise<String>} the URL of the file
 */
export const readFile = async (file) => {
    const {createReadStream, filename} = await file;
    const stream = createReadStream();
    let {ext, name} = parse(filename);
    name = `single${Math.floor(Math.random() * 10000 + 1)}`;
    let url = join(__dirname, `../../uploads/${name}-${Date.now()}${ext}`);
    const imageStream = createWriteStream(url);
    await stream.pipe(imageStream);
    const baseUrl = process.env.BASE_URL;
    const port = process.env.PORT;
    url = `${baseUrl}:${port}/${url.split("uploads"+path.sep)[1]}`;
    return url;
};


export const multipleFileUploads = async (files) => {
    let fileURLs = [];

    for (let i = 0; i < files.length; i++) {
        // exact same code for single upload
        const {createReadStream, filename} = await files[i];
        const stream = createReadStream();
        let {ext, name} = parse(filename);
        name = `single${Math.floor(Math.random() * 10000 + 1)}`;
        let url = join(__dirname, `../../uploads/${name}-${Date.now()}${ext}`);
        const imageStream = createWriteStream(url);
        await stream.pipe(imageStream);
        const baseUrl = process.env.BASE_URL;
        const port = process.env.PORT;
        url = `${baseUrl}:${port}/${url.split("uploads"+path.sep)[1]}`;
        fileURLs.push({url});
    }
    return fileURLs;
};
