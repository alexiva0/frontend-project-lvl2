import { fileURLToPath } from 'url';
import { dirname } from 'path';

const getDirname = (fileUrl) => dirname(fileURLToPath(fileUrl));

export default getDirname;
