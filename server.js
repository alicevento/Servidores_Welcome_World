// importaciones, instanciar express y generar servidor
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express()
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log("Servidor Express en el puerto " + PORT);
})

// Paso 1
app.get("/crear", async (req, res) => {
    // Paso 2
    const { archivo, contenido } = req.query
    fs.writeFile(archivo, contenido, () => {
        res.status(200).send('Archivo creado con éxito!')
    })
})

// Paso 4
app.get("/leer", (req, res) => {
    // Paso 5
    const {archivo } = req.query
    //console.log("Valor de parametro nombre: ", nombre)
    //console.log("Tipo de dato parametro nombre: ", typeof nombre)
    
    // Paso 6
    fs.readFile(archivo, (err, data) => {

        let mensaje=""
        if (err) {

            (nombre)
              ? mensaje = nombre + " No existe, "
              : mensaje = "Falta archivo, "

          return res.status(500).send(mensaje+err)
        }

        //console.log(data.toString())
        //res.send(nombre + " ha sido leido con exito")
        //res.send(data)
        res.sendFile(__dirname + "/" + nombre)
    })
})


// Paso 1
app.get("/renombrar", (req, res) => {

    // Paso 2
    const{ nombre, nuevo } = req.query
    //console.log("Valor de parametro nombre: ", nombre)
    //console.log("Valor de parametro nombre: ", nuevo)
    

    // Paso 3
    fs.rename(nombre, nuevo, (err) => {
        let mensaje=""
        if (err) {

            (nombre)
              ? mensaje = nombre + " No existe, "
              : mensaje = "Falta archivo, "
    
          return res.status(500).send(mensaje+err)
        }
        res.status(200).send(`Archivo ${nombre} fue renombrado como ${nuevo}`)
    })
})

// Paso 4
app.get("/eliminar", (req, res) => {

    // Paso 5
    const{ nombre } = req.query

    // Paso 6
    fs.unlink(nombre, (err) => {
        let mensaje=""
        if (err) {

            (nombre)
              ? mensaje = nombre + " No existe, "
              : mensaje = "Falta archivo, "
    
          return res.status(500).send(mensaje+err)
        }
        res.status(200).send(`Archivo ${nombre} eliminado con éxito`);
    })
})

