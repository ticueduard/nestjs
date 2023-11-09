import { diskStorage } from 'multer';
import { extname } from 'path';


 export const storage = diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const extension = extname(file.originalname);
        const randomName = Array(6).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${name}-${randomName}${extension}`);
    },
});