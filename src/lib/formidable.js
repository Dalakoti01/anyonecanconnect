import formidable from "formidable";

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true, keepExtensions: true });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}
