const express = require('express')
const app = express()
const cors = require('cors')
const dht = require('node-dht-sensor')
const Gpio = require('onoff').Gpio;
const {exec} = require('child_process')

const PORT = 3333

const motion = new Gpio(17, 'in', 'rising')
motion.watch((err, value) => {
	exec('xset -display :0.0 s reset')
})

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

app.listen(PORT, () => console.log(`...listening ${PORT}`))
