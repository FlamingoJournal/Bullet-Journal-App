// jest-puppeteer.config.js
module.exports = {
    launch: {
        headless: true,
        slowMo: 500,
    },
    server: {
        command: 'npm run serve',
        port: 5500,
        launchTimeout: 150000,
    },
};
