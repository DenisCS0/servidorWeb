'use strict'
class Obj {

    constructor () {
    }

    // Inicia l'objecte
    init () {
        // TODO
    }

    async llistat (db, utils, data, result) {

        let sql = '',
            taulaProductesExisteix = false,
            taula = null
    
        // Forçem una espera al fer login amb codi, perquè es vegi la càrrega (TODO: esborrar-ho)
        await utils.promiseWait(1800) 
        
        // Mira si la taula "productes" existeix
        try {
            taulaProductesExisteix = await db.promiseTableExists('productes')
        } catch (e) {
            console.warn('Avis, funció login: la taula "productes" no existeix')
        }
    
        // Si la taula "productes" no existeix, en crea una i afegeix productes
        if (!taulaProductesExisteix) {
            try {
                sql = 'CREATE TABLE productes (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(50) NOT NULL, descripcio TEXT, preu INT(6), imatge VARCHAR(255))'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Visas y permisos", "Olvidate de los tramites interminables cuando viajas a otro pais, aqui te lo ponemos mas facil que nunca", 79.99, "/web/imatges/alojamiento.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Guia turistica", "El conocimiento es poder, conoce hasta el ultimo detalle de tu ciudad preferida ", 59.99, "/web/imatges/paquete.jpeg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Seguro de viaje", "Comprando nuestro seguro de viaje, olvidate de las preocupaciones y las sorpresas desagradables, nosotros nos encargamos de todo ", 149.99, "/web/imatges/seguro.jpeg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Transporte local", "Acceso gratuito a todos los medios de transporte publicos en la ciudad de destino, ampliable a más ciudades ", 199.99, "/web/imatges/transporte.jpeg")'
                await db.promiseQuery(sql)
            } catch (e) {
                console.error(e)
                return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: no s'ha pogut crear la taula productes"})  
            }
        }
    
         // Demana la informació de productes
         if (data.id) {
            try {
                sql = 'SELECT * FROM productes WHERE id=' + data.id
                taula = await db.promiseQuery(sql)
            } catch (e) {
                console.error(e)
                return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: ha fallat la crida a les dades"})  
            }
        } else {
            try {
                sql = 'SELECT * FROM productes'
                taula = await db.promiseQuery(sql)
            } catch (e) {
                console.error(e)
                return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: ha fallat la crida a les dades"})  
            }
        }
    
        // Si hem aconseguit dades corectament, tornem la taula resultant
        if (typeof taula === 'object' && typeof taula.length === 'number') {
            result.json({ resultat: "ok", missatge: taula })
        } else {
            result.json({ resultat: "ko", missatge: [] })
        }
    }
}

// Export
module.exports = Obj

