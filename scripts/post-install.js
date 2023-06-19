const fs = require('fs');

try {
	const envExample = './src/config/.env.example';
	const envFile = './src/config/.env';

	if (fs.existsSync(envFile)) {
		console.log('Environment file already exists.');
	} else {
		fs.copyFileSync(envExample, envFile);
		console.log('Environment file created successfully.');
	}
} catch (err) {
	console.error(err);
}
