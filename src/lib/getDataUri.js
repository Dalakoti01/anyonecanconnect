import fs from "fs";

export const getDataUri = (file) => {
  const fileBuffer = fs.readFileSync(file.filepath);
  const base64 = fileBuffer.toString("base64");
  const mimeType = file.mimetype;
  return {
    content: `data:${mimeType};base64,${base64}`,
  };
};
