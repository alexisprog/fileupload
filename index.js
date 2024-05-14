const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Verificar si la carpeta 'uploads' existe, y si no, crearla
const uploadsFolderPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsFolderPath)) {
  fs.mkdirSync(uploadsFolderPath);
}

// Ruta para servir la página de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', upload.single('pdf'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded');
  } else {
    res.send('File uploaded successfully');
  }
});

app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const file = `uploads/${filename}`;
  res.download(file);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});