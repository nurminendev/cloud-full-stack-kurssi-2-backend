//
// cloud-full-stack-kurssi-2-backend
//
// REST API backend esimerkki
//


import './dotenv.js'

import express        from 'express'
import mongoose       from 'mongoose'
import cors           from 'cors'
import nocache        from 'nocache'

import apiRoutes      from './api/index.js'

import logger         from './logger.js'


//
// Tarkista vaaditut ympäristömuuttujat
//
if(!process.env.TODO_AVAIN) {
  logger.fatal('Aseta TODO_AVAIN ympäristömuuttuja')
  process.exit(1)
}

const mongoUri = process.env.MONGO_URI

if(!mongoUri) {
  logger.fatal('Aseta MONGO_URI ympäristömuuttuja')
  process.exit(1)
}


//
// Yhdistä MongoDB
//
const mongoClient = await mongoose.connect(mongoUri)

const dbHost = mongoClient.connection.host
const dbPort = mongoClient.connection.port
const dbName = mongoClient.connection.name

logger.info(`Mongoose: Connected to ${dbHost}:${dbPort}/${dbName}`)


//
// Konfiguroi Express
//
const port = process.env.PORT || 4000

const app = express()

// Poista mm. Cloudflaren välimuisti käytöstä esimerkkisovelluksen resursseilta, jotta pystymme 
// testaamaan koodimuutoksia. Oikeassa sovelluksessa poista tämä ja tutustu "HTTP caching" sekä
// "cloudflare caching" konsepteihin (jos Cloudflare käytössä)
// Yksi esimerkki toteutuksesta on "bundlata" frontend esimerkiksi webpackillä ja luoda resursseihin
// "content hash", eli tiedostonimen perään tiedoston sisällön mukaan muuttuva rimpsu (styles-jf83jfc89923.css)
// josta esimerkiksi Cloudflare tietää, että tiedosto on muuttunut, ja hakee uuden tiedoston välimuistiin
app.use(nocache())

app.use(cors())
app.use(express.json())

app.use('/api', apiRoutes)

// Käynnistä HTTP-palvelin
app.listen(port, () => {
    logger.info(`Backend käynnistetty ja kuuntelee portissa ${port} (Node versio ${process.versions.node})`)
})
