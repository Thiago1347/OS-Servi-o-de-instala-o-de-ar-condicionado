const { MongoClient } = require('mongodb')

// URL de conexão (ajuste para sua instância local ou Atlas)
const url = 'mongodb+srv://admin:123Senac@cluster2.w2es8.mongodb.net/dbpolar'
const dbName = 'sistema_clientes'

let client = null
let db = null

async function conectar() {
    if (db) return db

    client = new MongoClient(url, { useUnifiedTopology: true })

    try {
        await client.connect()
        db = client.db(dbName)
        console.log('🟢 Conectado ao MongoDB')
        return db
    } catch (error) {
        console.error('❌ Erro ao conectar no MongoDB:', error)
        throw error
    }
}

async function desconectar() {
    if (client) {
        try {
            await client.close()
            client = null
            db = null
            console.log('🔴 Desconectado do MongoDB')
        } catch (error) {
            console.error('❌ Erro ao desconectar do MongoDB:', error)
        }
    }
}

module.exports = { conectar, desconectar }
