describe('Basic navegation flow for Bullet Journal ', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5500');
        // await page.goto('https://flamingojournal.me/');
        await page.waitForTimeout(500);
    });

    // Make sure we are in home page
    it('Checks that the body is in home page', async () => {
        // gets the body
        const body = await page.$('body');
        expect(body._remoteObject.description).toContain('home');
    });

    // Check that home page has 4 log-lists
    it('Check that we have four <log-list> divs', async () => {
        const numLists = await page.$$eval('log-list', (lists) => lists.length);
        expect(numLists).toBe(4);
    });

    // Check that the names of lists are daily/weekly/monthly/future log
    it('Check that the names of lists are daily/weekly/monthly/future log', async () => {
        const daily = await page.evaluate(
            () =>
                document
                    .querySelector(
                        'div.log-list-components > log-list:nth-child(1)'
                    )
                    .shadowRoot.querySelector('div > h1').innerHTML
        );
        const weekly = await page.evaluate(
            () =>
                document
                    .querySelector(
                        'div.log-list-components > log-list:nth-child(2)'
                    )
                    .shadowRoot.querySelector('div > h1').innerHTML
        );
        const monthly = await page.evaluate(
            () =>
                document
                    .querySelector(
                        'div.log-list-components > log-list:nth-child(3)'
                    )
                    .shadowRoot.querySelector('div > h1').innerHTML
        );
        const future = await page.evaluate(
            () =>
                document
                    .querySelector(
                        'div.log-list-components > log-list:nth-child(4)'
                    )
                    .shadowRoot.querySelector('div > h1').innerHTML
        );
        expect(daily).toMatch('DAILY LOG');
        expect(weekly).toMatch('WEEKLY LOG');
        expect(monthly).toMatch('MONTHLY LOG');
        expect(future).toMatch('FUTURE LOG');
    });

    // Create new daily log
    it('Creates new daily log', async () => {
        // get new log button
        const newLog = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(1)").shadowRoot.querySelector("#create-new")'
        );
        // create new log
        await newLog.click();

        // gets the current day
        const date = await page.evaluate(() => {
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
            return `${
                monthsNames[d.getMonth()]
            } ${d.getDate()}, ${d.getFullYear()}`;
        });

        // gets the header
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerHTML');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);

    // Go to home page
    it('Go to home page', async () => {
        // get flamingo logo
        const logo = await page.$('.navbar > img');
        await logo.click();
        await page.waitForTimeout(500);

        // gets the body
        const body = await page.$('body');
        expect(body._remoteObject.description).toContain('home');
    });

    // Create new weekly log
    it('Create new weekly log', async () => {
        const newLog = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(2)").shadowRoot.querySelector("#create-new")'
        );

        await newLog.click();

        const tag = await page.evaluate(() => {
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
            const day = d.getDate();
            const week = parseInt(day / 7, 10) + 1;
            const month = d.getMonth();
            const year = d.getFullYear();
            return `Week ${week}, ${monthsNames[month]} ${year}`;
        });

        // gets the header
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerHTML');
        expect(property._remoteObject.value).toContain(tag);
    }, 20000);

    // Create new monthly log
    it('Create new monthly log', async () => {
        // go back to home page
        const logo = await page.$('.navbar > img');
        await logo.click();
        await page.waitForTimeout(500);

        // get new log button
        const newLog = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(3)").shadowRoot.querySelector("#create-new")'
        );
        // create new log
        await newLog.click();

        const date = await page.evaluate(() => {
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
            return `${monthsNames[d.getMonth()]} ${d.getFullYear()}`;
        });

        // get header
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerHTML');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);

    // Create new future log
    it('Create new future log', async () => {
        // go back to home page
        const logo = await page.$('.navbar > img');
        await logo.click();
        await page.waitForTimeout(500);

        // get new log button
        const newLog = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(4)").shadowRoot.querySelector("#create-new")'
        );
        await newLog.click();

        const date = await page.evaluate(() => {
            const d = new Date();
            if (d.getMonth() <= 6) {
                return `January - June, ${d.getFullYear()}`;
            }
            return `July - December, ${d.getFullYear()}`;
        });

        // get Header
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerHTML');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);

    // // Get most recent daily log
    it('Go to most recent daily log from home page', async () => {
        // go back to home page
        const logo = await page.$('.navbar > img');
        await logo.click();
        await page.waitForTimeout(500);

        // get most recent button from daily log
        const mostRecent = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(1)").shadowRoot.querySelector("#most-recent")'
        );
        await mostRecent.click();

        // gets the current day
        const date = await page.evaluate(() => {
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
            return `${
                monthsNames[d.getMonth()]
            } ${d.getDate()}, ${d.getFullYear()}`;
        });

        // gets the header
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerHTML');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);

    // // Get most recent weekly log
    it('Go to most recent weekly log from home page', async () => {
        // go back to home page
        const logo = await page.$('.navbar > img');
        await logo.click();
        await page.waitForTimeout(500);

        // get most recent button fromdaily log
        const mostRecent = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(2)").shadowRoot.querySelector("#most-recent")'
        );
        await mostRecent.click();

        // gets the current week
        const date = await page.evaluate(() => {
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
            const day = d.getDate();
            const week = parseInt(day / 7, 10) + 1;
            const month = d.getMonth();
            const year = d.getFullYear();
            return `Week ${week}, ${monthsNames[month]} ${year}`;
        });

        // gets the header
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerHTML');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);

    // // Get most recent monthly log
    it('Go to most recent monthly log from home page', async () => {
        // go back to home page
        const logo = await page.$('.navbar > img');
        await logo.click();
        await page.waitForTimeout(500);

        // get most recent button fromdaily log
        const mostRecent = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(3)").shadowRoot.querySelector("#most-recent")'
        );
        await mostRecent.click();

        // gets the current month
        const date = await page.evaluate(() => {
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
            return `${monthsNames[d.getMonth()]} ${d.getFullYear()}`;
        });

        // gets the header
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerHTML');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);

    // Get most recent future log
    it('Go to most recent future log from home page', async () => {
        // go back to home page
        const logo = await page.$('.navbar > img');
        await logo.click();
        await page.waitForTimeout(500);

        // get most recent button fromdaily log
        const mostRecent = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(4)").shadowRoot.querySelector("#most-recent")'
        );
        await mostRecent.click();

        // gets the current month
        const date = await page.evaluate(() => {
            const d = new Date();
            if (d.getMonth() <= 6) {
                return `January - June, ${d.getFullYear()}`;
            }
            return `July - December, ${d.getFullYear()}`;
        });

        // gets the header
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerHTML');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);

    // Check that there are four tabs in the sidebar for most recent logs
    it('Check that there are four tabs in the sidebar', async () => {
        // gets the number of tabs
        const numTabs = await page.evaluate(() => {
            const tabGroup = document.querySelector('.tabs-buttonGrp');
            return tabGroup.childElementCount;
        });
        expect(numTabs).toBe(4);
    });

    // Check that the name of the tabs are daily, weekly, monthly, future
    it('Check that the name of the tabs are daily, weekly, monthly, future', async () => {
        // gets the tabs
        const daily = await page.evaluate(
            () => document.querySelector('#daily-btn').innerHTML
        );
        const weekly = await page.evaluate(
            () => document.querySelector('#weekly-btn').innerHTML
        );
        const monthly = await page.evaluate(
            () => document.querySelector('#monthly-btn').innerHTML
        );
        const future = await page.evaluate(
            () => document.querySelector('#future-btn').innerHTML
        );

        expect(daily).toMatch('DAILY');
        expect(weekly).toMatch('WEEKLY');
        expect(monthly).toMatch('MONTHLY');
        expect(future).toMatch('FUTURE');
    });

    // Go to most recent daily log from future log
    it('Go to most recent daily log by clicking sidebar tab', async () => {
        // get daily tab
        const daily = await page.$('#daily-btn');
        await daily.click();
        await page.waitForTimeout(500);

        // gets the current day
        const date = await page.evaluate(() => {
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
            return `${
                monthsNames[d.getMonth()]
            } ${d.getDate()}, ${d.getFullYear()}`;
        });

        // gets the header
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerHTML');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);

    // Go to most recent weekly log from daily log
    it('Go to most recent weekly log from daily log by clicking sidebar tab', async () => {
        // get weekly tab
        const weekly = await page.$('#weekly-btn');
        await weekly.click();
        await page.waitForTimeout(500);

        // gets the current week
        const date = await page.evaluate(() => {
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
            const day = d.getDate();
            const week = parseInt(day / 7, 10) + 1;
            const month = d.getMonth();
            const year = d.getFullYear();
            return `Week ${week}, ${monthsNames[month]} ${year}`;
        });

        // gets the header
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerHTML');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);

    // Go to most recent monthly log from weekly log
    it('Go to most recent monthly log from weekly log by clicking sidebar tab', async () => {
        // get monthly tab
        const monthly = await page.$('#monthly-btn');
        await monthly.click();
        await page.waitForTimeout(500);

        // gets the current month
        const date = await page.evaluate(() => {
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
            return `${monthsNames[d.getMonth()]} ${d.getFullYear()}`;
        });

        // gets the header
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerHTML');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);

    // Go to most recent furute log from montly log
    it('Go to most recent future log from montly log by clicking sidebar tab', async () => {
        // get future tab
        const future = await page.$('#future-btn');
        await future.click();
        await page.waitForTimeout(500);

        // gets the current month
        const date = await page.evaluate(() => {
            const d = new Date();
            if (d.getMonth() <= 6) {
                return `January - June, ${d.getFullYear()}`;
            }
            return `July - December, ${d.getFullYear()}`;
        });

        // gets the header
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerHTML');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);

    // Go back to home page
    // Go to daily log when clicking daily title tag and check if header is same as the title
    it('Go to daily log when clicking daily title tag', async () => {
        // Go back to home page
        const logo = await page.$('.navbar > img');
        await logo.click();
        await page.waitForTimeout(500);
        // Get textContent of daily title
        const date = await page.evaluate(() => {
            const title = document
                .querySelector(
                    'div.log-list-components > log-list:nth-child(1)'
                )
                .shadowRoot.querySelector('div > ul > li').textContent;
            return title;
        });
        // Click the tag
        const tag = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(1)").shadowRoot.querySelector("div > ul > li")'
        );
        await tag.click();
        await page.waitForTimeout(500);
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerHTML');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);

    // Go to weekly log when clicking weekly title tag
    it('Go to weekly log when clicking weekly title tag', async () => {
        // Go back to home page
        const logo = await page.$('.navbar > img');
        await logo.click();
        await page.waitForTimeout(500);
        // Get textContent of weekly title
        const date = await page.evaluate(() => {
            const title = document
                .querySelector(
                    'div.log-list-components > log-list:nth-child(2)'
                )
                .shadowRoot.querySelector('div > ul > li').textContent;
            return title;
        });
        // Click the tag
        const tag = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(2)").shadowRoot.querySelector("div > ul > li")'
        );
        await tag.click();
        await page.waitForTimeout(500);
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerHTML');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);

    // Go to monthly log when clicking monthly title tag
    it('Go to monthly log when clicking monthly title tag', async () => {
        // Go back to home page
        const logo = await page.$('.navbar > img');
        await logo.click();
        await page.waitForTimeout(500);
        // Get textContent of monthly title
        const date = await page.evaluate(() => {
            const title = document
                .querySelector(
                    'div.log-list-components > log-list:nth-child(3)'
                )
                .shadowRoot.querySelector('div > ul > li').textContent;
            return title;
        });
        // Click the tag
        const tag = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(3)").shadowRoot.querySelector("div > ul > li")'
        );
        await tag.click();
        await page.waitForTimeout(500);
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerText');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);

    // Go to future log when clicking future title tag
    it('Go to future log when clicking future title tag', async () => {
        // Go back to home page
        const logo = await page.$('.navbar > img');
        await logo.click();
        await page.waitForTimeout(500);
        // Get textContent of future title
        const date = await page.evaluate(() => {
            const title = document
                .querySelector(
                    'div.log-list-components > log-list:nth-child(4)'
                )
                .shadowRoot.querySelector('div > ul > li').textContent;
            return title;
        });
        // Click the tag
        const tag = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(4)").shadowRoot.querySelector("div > ul > li")'
        );
        await tag.click();
        await page.waitForTimeout(500);
        const h1 = await page.$('.title');
        const property = await h1.getProperty('innerHTML');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);
});
