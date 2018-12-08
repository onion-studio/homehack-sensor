const express = require('express')
const app = express()
const cors = require('cors')
const dht = require('node-dht-sensor')

app.use(cors())
app.get('/', async (req, res) => {
	const dhtPromise = new Promise(resolve => {
		dht.read(22, 4, (err, t, h) => {
			resolve([t, h])
		})
	})
	const [dhtResult] = await Promise.all([dhtPromise])
	res.send(dhtResult)
})

app.listen(3030, () => console.log('listening 3030...'))
