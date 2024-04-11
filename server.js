   
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
    //const { archivo, contenido } = req.query
    const archivo=req.query.archivo
    const contenido=req.query.contenido
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
    console.log("valor de parametro archivo : ",archivo);
    console.log("tipo de dato de parametro archivo : ",typeof archivo);
    try {
        const data = await fs.readFile(archivo)
        //res.send(data)
        res.sendFile(__dirname + "/" + archivo)
    }
    catch (error) {
        if (archivo==""){
            res.status(500).send("Algo salió mal... no se recibio archivo")
        } else {
            res.status(500).send("Algo salió mal... no existe el archivo: " + archivo)
        }
        
    }
})
// Ruta renombrar
app.get("/renombrar", async (req, res) => {
    const { nombre, nuevoNombre } = req.query; // Ahora se usa req.body en lugar de req.query
    try {
        await fs.rename(nombre, nuevoNombre);
        res.send(`Archivo ${nombre} renombrado por ${nuevoNombre}`);
    } catch (error) {
        res.status(500).send("Algo salió mal...");
    }
});
// Ruta eliminar       

app.get("/eliminar", async (req, res) => {
    const { archivo } = req.query;
    if (!archivo) {
        return res.status(400).send("Nombre de archivo no proporcionado");
    }
    try {
        // Add path validation or restriction here to avoid deletion of sensitive files
        await fs.unlink(archivo);
        res.send(`Archivo ${archivo} eliminado con éxito`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Algo salió mal...");
    }
});