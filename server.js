// importaciones, instanciar express y generar servidor
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express()
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log("Servidor Express en el puerto " + PORT);
})

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(express.json());
// Middleware para parsear los datos de los formularios
app.use(express.urlencoded({ extended: true }));



// Paso 1
app.get("/usuarios", (req, res) => {
    // Paso 2 extraer con destructuring parametro de querystrings
    const{ rut } = req.query
    // Paso 3 buscar el rut de la ruta en el arreglos
    const usuarioEncontrado = users.find(u => u.rut == Number(rut))

    // Paso 4 tomar accion si encontrado el rut o no
    if(usuarioEncontrado) {
        const { nombre, apellido } = usuarioEncontrado
        res.send(`¡Usuario encontrado! Nombre: ${nombre} - Apellido: ${apellido}`)
    } else{
        res.send(`No se encontró ningún usuario con el rut ${rut}`)
    }
})