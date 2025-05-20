import { v4 } from "uuid";

export const changeFileName = (file : File) : File => {
  const extension = file.name.split('.').pop();
  const newFileName = `${v4()}.${extension}`;

  return new File([file], newFileName, {
    type: file.type,
    lastModified: file.lastModified,
  });

}