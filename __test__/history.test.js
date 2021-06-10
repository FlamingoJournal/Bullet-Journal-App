describe('Basic History Testing for Bullet Journal', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5500');
        // await page.goto('https://flamingojournal.me/');
        await page.waitForTimeout(500);
    });

    // Create new daily log
    it('Creates new daily log', async () => {
        // get new log button
        const newLog = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(1)").shadowRoot.querySelector("#create-new")'
        );
        // create new log
        await newLog.click();

        // gets the current month
        const month = await page.evaluate(() => {
            // Month list for creating logs
            const monthsNames = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ];

            const d = new Date();
            return monthsNames[d.getMonth()];
        });

        // gets the current day
        const day = await page.evaluate(() => {
            const d = new Date();
            return d.getDate();
        });

        // gets the current year
        const year = await page.evaluate(() => {
            const d = new Date();
            return d.getFullYear();
        });

        // gets url http://127.0.0.1:5500
        const url = await page.url();
        expect(url).toMatch(
            `http://127.0.0.1:5500/#${month}%20${day},%20${year}`
        );

        // eslint-disable-next-line no-restricted-globals
        const hisStatePage = await page.evaluate(() => history.state.page);

        expect(hisStatePage).toMatch('daily');

        const bodyId = await page.evaluate(() => {
            const elem = document.querySelector('body');
            return elem.id;
        });
        expect(bodyId).toMatch('daily-log');
    }, 10000);

    // Use the back arrow to go back to home page
    it('Use the back arrow to go back to home page', async () => {
        // go back
        await page.goBack();
        const url = await page.url();
        expect(url).toMatch('http://127.0.0.1:5500');
    });

    // Use the forward arrow to go to the daily page again
    it('Use the forward arrow to go to the daily page again', async () => {
        // go forward
        await page.goForward();

        // gets the current month
        const month = await page.evaluate(() => {
            // Month list for creating logs
            const monthsNames = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ];

            const d = new Date();
            return monthsNames[d.getMonth()];
        });

        // gets the current day
        const day = await page.evaluate(() => {
            const d = new Date();
            return d.getDate();
        });

        // gets the current year
        const year = await page.evaluate(() => {
            const d = new Date();
            return d.getFullYear();
        });

        // gets url http://127.0.0.1:5500
        const url = await page.url();
        expect(url).toMatch(
            `http://127.0.0.1:5500/#${month}%20${day},%20${year}`
        );
    });

    // Navigate to the last viewed daily log when click LAST VIEWED button
    it('Navigate to last viewed daily log', async () => {
        // go back to the home page
        await page.goBack();

        // get most last viewed button from daily log
        const mostRecent = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(1)").shadowRoot.querySelector("#most-recent")'
        );
        await mostRecent.click();

        // gets the current month
        const month = await page.evaluate(() => {
            // Month list for creating logs
            const monthsNames = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ];

            const d = new Date();
            return monthsNames[d.getMonth()];
        });

        // gets the current day
        const day = await page.evaluate(() => {
            const d = new Date();
            return d.getDate();
        });

        // gets the current year
        const year = await page.evaluate(() => {
            const d = new Date();
            return d.getFullYear();
        });

        // gets url http://127.0.0.1:5500
        const url = await page.url();
        expect(url).toMatch(
            `http://127.0.0.1:5500/#${month}%20${day},%20${year}`
        );
    }, 10000);

    // Navigate to daily log by log list
    it('Navigate to daily log by log list', async () => {
        // go back to the home page
        await page.goBack();
        // Click the tag
        const tag = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(1)").shadowRoot.querySelector("div > ul > li")'
        );
        await tag.click();

        // gets the current month
        const month = await page.evaluate(() => {
            // Month list for creating logs
            const monthsNames = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ];

            const d = new Date();
            return monthsNames[d.getMonth()];
        });

        // gets the current day
        const day = await page.evaluate(() => {
            const d = new Date();
            return d.getDate();
        });

        // gets the current year
        const year = await page.evaluate(() => {
            const d = new Date();
            return d.getFullYear();
        });

        // gets url http://127.0.0.1:5500
        const url = await page.url();
        expect(url).toMatch(
            `http://127.0.0.1:5500/#${month}%20${day},%20${year}`
        );
    }, 10000);
});
