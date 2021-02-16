import express from "express";
import bodyparser from "body-parser";
import vision from "@google-cloud/vision";
import multer from "multer";

const server = express();
const client = new vision.ImageAnnotatorClient();
const upload = multer({ dest: "uploads/" });

server.use(bodyparser.json());

server.get("/", (peticion, respuesta) => {
  respuesta.json({
    mensaje: "Estamos en google",
    peticion: peticion.headers,
  });
});

server.post("/", (peticion, respuesta) => {
  respuesta.json({
    edad: peticion.body.edad,
  });
});

server.post(
  "/inferencia",
  upload.single("imagen"),
  async (peticion, respuesta) => {
    const [result] = await client.labelDetection(
      peticion.file.destination + peticion.file.filename
    );
    const labels = result.labelAnnotations;
    respuesta.json({
      resultado: labels,
    });
  }
);

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log("Escuchando en http://localhost:" + port);
});
