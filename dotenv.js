//
// cloud-full-stack-kurssi-2-frontend
//
// Esimerkkipalvelin, joka tarjoilee frontendin käyttäjän selaimeen
//


import path         from 'node:path'
import dotenv       from 'dotenv'


// Käytä .env tiedostoa vain ei-tuotantoympäristössä
// Tuotantoympäristössä ympäristömuuttujat tulisi asettaa palvelimen ympäristön tasolla
if(process.env.NODE_ENV !== 'production') {
    const __dirname = path.dirname(new URL(import.meta.url).pathname)
    const dotenvPath = path.join(__dirname, '.env')

    const result = dotenv.config({ path: dotenvPath })
    
    if (result.error) {
        console.error(`Cannot find dotenv file at ${dotenvPath}, please add or set environment variables in console`)
    } else {
        console.log('Environment variables read from .env', result.parsed)
    }
}
