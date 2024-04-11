   
   const express = require('express')
   const app = express()
   const fs = require('fs').promises
   app.listen(3000, console.log("SERVER ON"))
   // Vamos a utilizar levantar el index.html desde el servidor cuando se visite la ruta raíz
   app.get("/", (req, res) => {
       res.sendFile(__dirname + "/index.html")
   })

   // Ruta crear
app.get("/crear", async (req, res) => {
    const { archivo, contenido } = req.query
    try {
        await fs.writeFile(archivo, contenido)
        res.send("Archivo creado con éxito!")
    } catch (error) {
        res.status(500).send("Algo salió mal...")
    }
})
// Ruta leer
app.get("/leer", async (req, res) => {
    const { archivo } = req.query
    try {
        const data = await fs.readFile(archivo)
        //res.send(data)
        res.sendFile(__dirname + "/" + archivo)
    }
    catch (error) {
        res.status(500).send("Algo salió mal...")
    }
})
// Ruta renombrar
app.get("/renombrar", async (req, res) => {
    const {archivo, nuevoNombre} = req.query
    try {
        await fs.rename(archivo, nuevoNombre)
        res.send(`Archivo ${archivo} renombrado por ${nuevoNombre}`)
    } catch (error) {
        res.status(500).send("Algo salió mal...")
    }
})
// Ruta eliminar       
app.get("/eliminar", async (req, res) => {
    const { archivo } = req.query
    try {
        await fs.unlink(archivo)
        res.send(`Archivo ${archivo} eliminado con éxito`)
    } catch (error) {
        res.status(500).send("Algo salió mal...")
    }
})