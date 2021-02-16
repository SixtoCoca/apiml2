import express from "express";
import bodyparser from "body-parser";
const server = express();
server.use(bodyparser.json());

server.get("/", (peticion, respuesta) => {
  respuesta.json({
    mensaje: "hola",
    peticion: peticion.headers,
  });
});

server.post("/", (peticion, respuesta) => {
  respuesta.json({
    edad: peticion.body.edad,
  });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log("Escuchando en http://localhost:" + port);
});
