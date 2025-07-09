import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import nextConnect from "next-connect";
import path from "path";
import fs from "fs";

// Define onde salvar os arquivos e como nomear
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = "./public/uploads"; // salva dentro do public para poder acessar pela URL
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      // Mantém o nome original do arquivo, pode mudar se quiser
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Middleware multer para upload único (campo "image")
apiRoute.use(upload.single("image"));

apiRoute.post((req, res) => {
  // req.file contém info do arquivo enviado
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  // Retorna o caminho público para acessar a imagem
  const imageUrl = `/uploads/${req.file.filename}`;

  res.status(200).json({ imageUrl });
});

export default apiRoute;

// Next.js por padrão rejeita bodyParser para lidar com multer
export const config = {
  api: {
    bodyParser: false,
  },
};
