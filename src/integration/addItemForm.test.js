describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:6006/iframe.html?args=&id=todolist-additemform--add-item-form-story&viewMode=story',
            {waitUntil: "load", timeout: 3000,})


        await page.waitForSelector('.MuiFormControl-root', {timeout: 5000});
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    }, 9000);
});