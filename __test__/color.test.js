describe('Color Changing for Bullet Journal ', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5500');
        // await page.goto('https://flamingojournal.me/');
        await page.waitForTimeout(500);
    });

    // Create new daily lof
    // Open settings modal
    // Check if the setting modal component works correctly
    it('Create daily log and Open settings modal', async () => {
        // get new log button
        const newLog = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(1)").shadowRoot.querySelector("#create-new")'
        );
        // create new log
        await newLog.click();

        //   gets the settings modal image
        const settings = await page.$('.navbar > settings-modal');
        await settings.click();
        await page.waitForTimeout(200);

        const display = await page.evaluate(() => {
            //   gets the settings modal div
            const modal = document
                .querySelector('settings-modal')
                .shadowRoot.querySelector('section > div');
            //   gets the display component of the style of the modal
            return getComputedStyle(modal).getPropertyValue('display');
        });
        expect(display).toMatch('block');
    }, 10000);

    // Change color to dark mode
    // Checks that navbar, datepicker color is dark
    // Checks the sidebar, modal color is grey
    it('Changes theme of navbar, sidebar, datepicker, and modal to dark theme', async () => {
        // get darkTheme button
        const darkTheme = await page.evaluateHandle(
            'document.querySelector("settings-modal").shadowRoot.querySelector("button.leftTheme")'
        );
        await darkTheme.click();
        // check navbar style
        const navbarTheme = await page.evaluate(() => {
            const navbar = document.querySelector('.navbar');
            return getComputedStyle(navbar).getPropertyValue(
                'background-color'
            );
        });
        // check sidebar style
        const sidebarTheme = await page.evaluate(() => {
            const sidebar = document.querySelector('.sidebar');
            return getComputedStyle(sidebar).getPropertyValue(
                'background-color'
            );
        });
        // check datepicker style
        const datepickerTheme = await page.evaluate(() => {
            const datepicker = document.querySelector('.datepicker > input');
            return getComputedStyle(datepicker).getPropertyValue(
                'background-color'
            );
        });
        // check modal style
        const modalTheme = await page.evaluate(() => {
            const modal = document
                .querySelector('settings-modal')
                .shadowRoot.querySelector('section > div > div');
            return getComputedStyle(modal).getPropertyValue('background-color');
        });

        // expect navbar background to be black
        expect(navbarTheme).toMatch('rgb(57, 62, 70)');
        // expect sidebar background to be grey
        expect(sidebarTheme).toMatch('rgb(124, 124, 124)');
        // expect datepicker background to be black
        expect(datepickerTheme).toMatch('rgb(57, 62, 70)');
        // expect modal background to be grey
        expect(modalTheme).toMatch('rgb(124, 124, 124)');
    }, 6000);

    // Closes settings modal
    // Check if the setting modal component works correctly
    it('Closes settings modal', async () => {
        // gets the closing modal
        const closeModal = await page.evaluateHandle(
            'document.querySelector("settings-modal").shadowRoot.querySelector("section > div > div > span")'
        );
        await closeModal.click();

        const display = await page.evaluate(() => {
            //   gets the settings modal div
            const modal = document
                .querySelector('settings-modal')
                .shadowRoot.querySelector('section > div');
            //   gets the display component of the style of the modal
            return getComputedStyle(modal).getPropertyValue('display');
        });
        expect(display).toMatch('none');
    });

    // Goes to home page
    // Checks that daily, weekly, monthly, and future log list is grey
    it('Goes to home Page and checks that log list theme is dark theme', async () => {
        // gets the flamingo logo image
        const logo = await page.$('.navbar > img');
        await logo.click();
        await page.waitForTimeout(500);

        // check daily log list style
        const dailyTheme = await page.evaluate(() => {
            const daily = document
                .querySelector('log-list')
                .shadowRoot.querySelector('.log-list-comp');
            return getComputedStyle(daily).getPropertyValue('background-color');
        });
        // check weekly log list style
        const weeklyTheme = await page.evaluate(() => {
            const weekly = document
                .querySelector('log-list ~ log-list')
                .shadowRoot.querySelector('.log-list-comp');
            return getComputedStyle(weekly).getPropertyValue(
                'background-color'
            );
        });
        // check monthly log list style
        const monthlyTheme = await page.evaluate(() => {
            const monthly = document
                .querySelector('log-list ~ log-list ~ log-list')
                .shadowRoot.querySelector('.log-list-comp');
            return getComputedStyle(monthly).getPropertyValue(
                'background-color'
            );
        });
        // check future log list style
        const futureTheme = await page.evaluate(() => {
            const future = document
                .querySelector('log-list ~ log-list ~ log-list ~ log-list')
                .shadowRoot.querySelector('.log-list-comp');
            return getComputedStyle(future).getPropertyValue(
                'background-color'
            );
        });

        // expect daily background to be grey
        expect(dailyTheme).toMatch('rgb(124, 124, 124)');
        // expect weekly background to be grey
        expect(weeklyTheme).toMatch('rgb(124, 124, 124)');
        // expect monthly background to be grey
        expect(monthlyTheme).toMatch('rgb(124, 124, 124)');
        // expect future background to be grey
        expect(futureTheme).toMatch('rgb(124, 124, 124)');
    }, 6000);

    // Refreshing maintains the black theme
    it('Refreshing maintains the black theme', async () => {
        // refresh page
        await page.reload();

        // check navbar style
        const navbarTheme = await page.evaluate(() => {
            const navbar = document.querySelector('.navbar');
            return getComputedStyle(navbar).getPropertyValue(
                'background-color'
            );
        });

        // expect navbar background to be black
        expect(navbarTheme).toMatch('rgb(57, 62, 70)');
    });

    // Go to daily log
    // Open settings modal
    // Check if the setting modal component works correctly
    it('GO to daily and Open settings modal', async () => {
        // gets daily log
        const dailyLog = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(1)").shadowRoot.querySelector("div > ul > li")'
        );
        // goes to daily log
        await dailyLog.click();

        //   gets the settings modal image
        const settings = await page.$('.navbar > settings-modal');
        await settings.click();
        await page.waitForTimeout(200);

        const display = await page.evaluate(() => {
            //   gets the settings modal div
            const modal = document
                .querySelector('settings-modal')
                .shadowRoot.querySelector('section > div');
            //   gets the display component of the style of the modal
            return getComputedStyle(modal).getPropertyValue('display');
        });
        expect(display).toMatch('block');
    }, 10000);

    // Change color to default mode
    // Checks that navbar, datepicker color is dark green-blue
    // Checks the sidebar, modal color is light green-blue
    it('Changes theme of navbar, sidebar, datepicker, and modal to default theme', async () => {
        // get defaultTheme button
        const defaultTheme = await page.evaluateHandle(
            'document.querySelector("settings-modal").shadowRoot.querySelector("section > div > div > button.midTheme")'
        );
        await defaultTheme.click();
        // check navbar style
        const navbarTheme = await page.evaluate(() => {
            const navbar = document.querySelector('.navbar');
            return getComputedStyle(navbar).getPropertyValue(
                'background-color'
            );
        });
        // check sidebar style
        const sidebarTheme = await page.evaluate(() => {
            const sidebar = document.querySelector('.sidebar');
            return getComputedStyle(sidebar).getPropertyValue(
                'background-color'
            );
        });
        // check datepicker style
        const datepickerTheme = await page.evaluate(() => {
            const datepicker = document.querySelector('.datepicker > input');
            return getComputedStyle(datepicker).getPropertyValue(
                'background-color'
            );
        });
        // check modal style
        const modalTheme = await page.evaluate(() => {
            const modal = document
                .querySelector('settings-modal')
                .shadowRoot.querySelector('section > div > div');
            return getComputedStyle(modal).getPropertyValue('background-color');
        });

        // expect navbar background to be dark green-blue
        expect(navbarTheme).toMatch('rgb(25, 67, 80)');
        // expect sidebar background to be light green-blue
        expect(sidebarTheme).toMatch('rgb(157, 190, 185)');
        // expect datepicker background to be dark green-blue
        expect(datepickerTheme).toMatch('rgb(25, 67, 80)');
        // expect modal background to be light green-blue
        expect(modalTheme).toMatch('rgb(157, 190, 185)');
    }, 6000);

    // Closes settings modal
    // Check if the setting modal component works correctly
    it('Closes settings modal', async () => {
        // gets the closing modal
        const closeModal = await page.evaluateHandle(
            'document.querySelector("settings-modal").shadowRoot.querySelector("section > div > div > span")'
        );
        await closeModal.click();

        const display = await page.evaluate(() => {
            //   gets the settings modal div
            const modal = document
                .querySelector('settings-modal')
                .shadowRoot.querySelector('section > div');
            //   gets the display component of the style of the modal
            return getComputedStyle(modal).getPropertyValue('display');
        });
        expect(display).toMatch('none');
    });

    // Goes to home page
    // Checks that daily, weekly, monthly, and future log list is light green-blue
    it('Goes to home Page and checks that log list theme is dark theme', async () => {
        // gets the flamingo logo image
        const logo = await page.$('.navbar > img');
        await logo.click();
        await page.waitForTimeout(500);

        // check daily log list style
        const dailyTheme = await page.evaluate(() => {
            const daily = document
                .querySelector('log-list')
                .shadowRoot.querySelector('.log-list-comp');
            return getComputedStyle(daily).getPropertyValue('background-color');
        });
        // check weekly log list style
        const weeklyTheme = await page.evaluate(() => {
            const weekly = document
                .querySelector('log-list ~ log-list')
                .shadowRoot.querySelector('.log-list-comp');
            return getComputedStyle(weekly).getPropertyValue(
                'background-color'
            );
        });
        // check monthly log list style
        const monthlyTheme = await page.evaluate(() => {
            const monthly = document
                .querySelector('log-list ~ log-list ~ log-list')
                .shadowRoot.querySelector('.log-list-comp');
            return getComputedStyle(monthly).getPropertyValue(
                'background-color'
            );
        });
        // check future log list style
        const futureTheme = await page.evaluate(() => {
            const future = document
                .querySelector('log-list ~ log-list ~ log-list ~ log-list')
                .shadowRoot.querySelector('.log-list-comp');
            return getComputedStyle(future).getPropertyValue(
                'background-color'
            );
        });

        // expect daily background to be light green-blue
        expect(dailyTheme).toMatch('rgb(157, 190, 185)');
        // expect weekly background to be light green-blue
        expect(weeklyTheme).toMatch('rgb(157, 190, 185)');
        // expect monthly background to be light green-blue
        expect(monthlyTheme).toMatch('rgb(157, 190, 185)');
        // expect future background to be light green-blue
        expect(futureTheme).toMatch('rgb(157, 190, 185)');
    }, 6000);

    // Refreshing maintains the default theme
    it('Refreshing maintains the default theme', async () => {
        // refresh page
        await page.reload();

        // check navbar style
        const navbarTheme = await page.evaluate(() => {
            const navbar = document.querySelector('.navbar');
            return getComputedStyle(navbar).getPropertyValue(
                'background-color'
            );
        });

        // expect navbar background to be dark green-blue
        expect(navbarTheme).toMatch('rgb(25, 67, 80)');
    });

    // Open settings modal
    // Check if the setting modal component works correctly
    it('Opens settings modal', async () => {
        //   gets the settings modal image
        const settings = await page.$('.navbar > settings-modal');
        await settings.click();
        await page.waitForTimeout(200);

        const display = await page.evaluate(() => {
            //   gets the settings modal div
            const modal = document
                .querySelector('settings-modal')
                .shadowRoot.querySelector('section > div');
            //   gets the display component of the style of the modal
            return getComputedStyle(modal).getPropertyValue('display');
        });
        expect(display).toMatch('block');
    });

    // Change theme to light pink
    // Checks that daily, weekly, monthly, and future log list is light pink
    it('Changes theme to light and checks that log list theme is light theme', async () => {
        // get defaultTheme button
        const lightTheme = await page.evaluateHandle(
            'document.querySelector("settings-modal").shadowRoot.querySelector("button.rightTheme")'
        );
        await lightTheme.click();
        await page.waitForTimeout(500);

        // check daily log list style
        const dailyTheme = await page.evaluate(() => {
            const daily = document
                .querySelector('log-list')
                .shadowRoot.querySelector('.log-list-comp');
            return getComputedStyle(daily).getPropertyValue('background-color');
        });
        // check weekly log list style
        const weeklyTheme = await page.evaluate(() => {
            const weekly = document
                .querySelector('log-list ~ log-list')
                .shadowRoot.querySelector('.log-list-comp');
            return getComputedStyle(weekly).getPropertyValue(
                'background-color'
            );
        });
        // check monthly log list style
        const monthlyTheme = await page.evaluate(() => {
            const monthly = document
                .querySelector('log-list ~ log-list ~ log-list')
                .shadowRoot.querySelector('.log-list-comp');
            return getComputedStyle(monthly).getPropertyValue(
                'background-color'
            );
        });

        // check future log list style
        const futureTheme = await page.evaluate(() => {
            const future = document
                .querySelector('log-list ~ log-list ~ log-list ~ log-list')
                .shadowRoot.querySelector('.log-list-comp');
            return getComputedStyle(future).getPropertyValue(
                'background-color'
            );
        });

        // expect daily background to be light pink
        expect(dailyTheme).toMatch('rgb(255, 194, 180)');
        // expect weekly background to be light pink
        expect(weeklyTheme).toMatch('rgb(255, 194, 180)');
        // expect monthly background to be light pink
        expect(monthlyTheme).toMatch('rgb(255, 194, 180)');
        // expect future background to be light pink
        expect(futureTheme).toMatch('rgb(255, 194, 180)');
    }, 10000);

    // Goes to daily log
    // Checks that navbar, datepicker color is dark pink
    // Checks the sidebar, color is light pink
    it('Changes theme of navbar, sidebar, and datepicker to light theme', async () => {
        // Goes to daily log
        const tag = await page.evaluateHandle(
            'document.querySelector("div.log-list-components > log-list:nth-child(1)").shadowRoot.querySelector("div > ul > li")'
        );
        await tag.click();
        await page.waitForTimeout(500);
        // check navbar style
        const navbarTheme = await page.evaluate(() => {
            const navbar = document.querySelector('.navbar');
            return getComputedStyle(navbar).getPropertyValue(
                'background-color'
            );
        });
        // check sidebar style
        const sidebarTheme = await page.evaluate(() => {
            const sidebar = document.querySelector('.sidebar');
            return getComputedStyle(sidebar).getPropertyValue(
                'background-color'
            );
        });
        // check datepicker style
        const datepickerTheme = await page.evaluate(() => {
            const datepicker = document.querySelector('.datepicker > input');
            return getComputedStyle(datepicker).getPropertyValue(
                'background-color'
            );
        });

        // expect navbar background to be dark pink
        expect(navbarTheme).toMatch('rgb(255, 136, 130)');
        // expect sidebar background to be light pink
        expect(sidebarTheme).toMatch('rgb(255, 194, 180)');
        // expect datepicker background to be dark pink
        expect(datepickerTheme).toMatch('rgb(255, 136, 130)');
    }, 6000);
});
