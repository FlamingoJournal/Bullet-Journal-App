// jest-puppeteer.config.js
module.exports = {
    launch: {
        headless: false,
        slowMo: 500,
    },
    server: {
        command: 'npm run serve',
        port: 5500,
        launchTimeout: 150000,
    },
};
