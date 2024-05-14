import express, { Request, Response } from 'express';
import multer from 'multer';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('pdf'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send('No file uploaded');
  } else {
    res.send('File uploaded successfully');
  }
});

app.get('/download/:filename', (req: Request, res: Response) => {
  const { filename } = req.params;
  const file = `uploads/${filename}`;
  res.download(file);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
