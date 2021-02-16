import express from "express";
const server = express();
const mostrarPantalla = (peticion, respuesta) => {
  respuesta.json({
    mensaje: "hola",
    peticion: peticion.headers,
  });
};
server.get("/", mostrarPantalla);

server.listen(3000);
