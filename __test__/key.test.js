describe('Key implementation for Bullet Journal ', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5500');
        // await page.goto('https://flamingojournal.me/');
        await page.waitForTimeout(500);
    });

    // Create a log
    it('Creates a log', async () => {
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
        const property = await h1.getProperty('innerText');
        expect(property._remoteObject.value).toContain(date);
    }, 20000);

    // Check if there are 7 key buttons on sidebar
    it('Check if there are 7 key buttons on sidebar', async () => {
        // get the key
        const numKey = await page.evaluate(() => {
            const key = document
                .querySelector(
                    'div.sidebar.sidebar-grid-container > key-button'
                )
                .shadowRoot.querySelectorAll('#button-group > button');
            return key.length;
        });

        expect(numKey).toBe(7);
    });

    // Check the names of the keys
    it('Check the names of the keys', async () => {
        // get first key
        const migrate = await page.evaluate(() => {
            const key1 = document
                .querySelector(
                    'div.sidebar.sidebar-grid-container > key-button'
                )
                .shadowRoot.querySelector(
                    '#button-group > button:nth-child(1)'
                );
            return key1.innerHTML;
        });
        expect(migrate).toMatch('⇒ MIGRATE');

        // get second key
        const incomplete = await page.evaluate(() => {
            const key2 = document
                .querySelector(
                    'div.sidebar.sidebar-grid-container > key-button'
                )
                .shadowRoot.querySelector(
                    '#button-group > button:nth-child(2)'
                );
            return key2.innerHTML;
        });
        expect(incomplete).toMatch('☐ INCOMPLETE');

        // get third key
        const complete = await page.evaluate(() => {
            const key3 = document
                .querySelector(
                    'div.sidebar.sidebar-grid-container > key-button'
                )
                .shadowRoot.querySelector(
                    '#button-group > button:nth-child(4)'
                );
            return key3.innerHTML;
        });
        expect(complete).toMatch('☑ COMPLETE');

        // get fourth key
        const event = await page.evaluate(() => {
            const key4 = document
                .querySelector(
                    'div.sidebar.sidebar-grid-container > key-button'
                )
                .shadowRoot.querySelector(
                    '#button-group > button:nth-child(6)'
                );
            return key4.innerHTML;
        });
        expect(event).toMatch('○ EVENT');

        // get fifth key
        const note = await page.evaluate(() => {
            const key5 = document
                .querySelector(
                    'div.sidebar.sidebar-grid-container > key-button'
                )
                .shadowRoot.querySelector(
                    '#button-group > button:nth-child(8)'
                );
            return key5.innerHTML;
        });
        expect(note).toMatch('– NOTE');

        // get sixth key
        const priority = await page.evaluate(() => {
            const key6 = document
                .querySelector(
                    'div.sidebar.sidebar-grid-container > key-button'
                )
                .shadowRoot.querySelector(
                    '#button-group > button:nth-child(10)'
                );
            return key6.innerHTML;
        });
        expect(priority).toMatch('✱ PRIORITY');

        // get seventh key
        const inspirational = await page.evaluate(() => {
            const key7 = document
                .querySelector(
                    'div.sidebar.sidebar-grid-container > key-button'
                )
                .shadowRoot.querySelector(
                    '#button-group > button:nth-child(12)'
                );
            return key7.innerHTML;
        });
        expect(inspirational).toMatch('⚠ INSPIRATIONAL');
    }, 10000);

    // Click on a text area and enter key
    it('Click on the text area and enter key', async () => {
        // click into text area
        // const textArea = await page.evaluate(() => {
        //     return document.querySelector("div.daily-log-grid-container > div > bullet-entries").shadowRoot.querySelector("div > textarea");
        // });
        const textArea = await page.evaluateHandle(
            'document.querySelector("#daily-log > main > div.log-page.log-page-grid-container > div.daily-log-grid-container > div > bullet-entries").shadowRoot.querySelector("div > textarea")'
        );
        await textArea.click();

        // get first key
        const migrate = await page.evaluateHandle(
            'document.querySelector("div.sidebar.sidebar-grid-container > key-button").shadowRoot.querySelector("#button-group > button:nth-child(1)")'
        );
        await migrate.click();

        // get second key
        const incomplete = await page.evaluateHandle(
            'document.querySelector("div.sidebar.sidebar-grid-container > key-button").shadowRoot.querySelector("#button-group > button:nth-child(2)")'
        );
        await incomplete.click();

        // get third key
        const complete = await page.evaluateHandle(
            'document.querySelector("div.sidebar.sidebar-grid-container > key-button").shadowRoot.querySelector("#button-group > button:nth-child(4)")'
        );
        await complete.click();

        // get fourth key
        const event = await page.evaluateHandle(
            'document.querySelector("div.sidebar.sidebar-grid-container > key-button").shadowRoot.querySelector("#button-group > button:nth-child(6)")'
        );
        await event.click();

        // get fifth key
        const note = await page.evaluateHandle(
            'document.querySelector("div.sidebar.sidebar-grid-container > key-button").shadowRoot.querySelector("#button-group > button:nth-child(8)")'
        );
        await note.click();

        // get sixth key
        const priority = await page.evaluateHandle(
            'document.querySelector("div.sidebar.sidebar-grid-container > key-button").shadowRoot.querySelector("#button-group > button:nth-child(10)")'
        );
        await priority.click();

        // get seventh key
        const inspirational = await page.evaluateHandle(
            'document.querySelector("div.sidebar.sidebar-grid-container > key-button").shadowRoot.querySelector("#button-group > button:nth-child(12)")'
        );
        await inspirational.click();

        // Get text contents
        const textAreaContent = await page.evaluate(() => {
            const contents = document
                .querySelector(
                    'div.daily-log-grid-container > div > bullet-entries'
                )
                .shadowRoot.querySelector('div > textarea');
            return contents.value;
        });

        expect(textAreaContent).toContain('⇒');
        expect(textAreaContent).toContain('☐');
        expect(textAreaContent).toContain('☑');
        expect(textAreaContent).toContain('○');
        expect(textAreaContent).toContain('–');
        expect(textAreaContent).toContain('✱');
        expect(textAreaContent).toContain('⚠');
    }, 30000);
});
