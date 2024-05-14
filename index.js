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

// Ruta para el manejo de subida de archivos (POST /upload)
app.post('/upload', upload.single('pdf'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded');
  } else {
    const { originalname } = req.file;
    const { filename } = req.body;
    const filePath = path.join(__dirname, 'uploads', filename);
    
    fs.renameSync(req.file.path, filePath); // Renombrar el archivo
    
    res.send('File uploaded successfully');
  }
});

// Ruta para la descarga de archivos (GET /download/:filename)
app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const file = path.join(__dirname, 'uploads', filename);
  res.download(file);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});