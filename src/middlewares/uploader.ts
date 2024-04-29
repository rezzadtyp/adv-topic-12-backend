import { Request } from "express";
import multer from "multer";
import { join } from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, destination: string) => void;

export const uploader = (filePrefix: string, folderName?: string) => {
  const defaultDir = join(__dirname, "../../public");

  const storage = multer.diskStorage({
    // untuk menentukan destination file kita
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback
    ) => {
      const destination = folderName ? defaultDir + folderName : defaultDir;
      cb(null, destination);
    },

    // untuk mengubah nama default file kita menjadi ada prefix yang kita masukin
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: FilenameCallback
    ) => {
      const originalnameParts = file.originalname.split(".");
      const fileExtension = originalnameParts[originalnameParts.length - 1];
      const newFileName = filePrefix + Date.now() + "." + fileExtension;

      cb(null, newFileName);
    },
  });

  return multer({ storage });
};
