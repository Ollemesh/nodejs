const req = require('request'),
	fs = require('fs');

let readFile = new Promise((resolve, reject) => {
	fs.readFile('./config.json', 'utf8', (err, data) => {
		if (err) reject(err)
		resolve(data)
	})
})

readFile
	.then(data => JSON.parse(data))
	.then(parcedData => {
		return new Promise((resolve, reject) => {
			req(parcedData, (err, response, body) => {
				if (err) reject(err)
				resolve(response.statusCode)
			})
		})
	})
	.then(code => console.log(code))
	.catch(err => console.log(err))

