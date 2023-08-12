describe('app', () => {
    it('app base example, visually looks correct,', async () => {
        await page.goto('http://localhost:6006/iframe.html?args=&id=todolist-app--app-story&viewMode=story',
            {waitUntil: "load", timeout: 3000,})

        await page.waitForSelector('.MuiContainer-root', {timeout: 5000});

        const image = await page.screenshot()

        expect(image).toMatchImageSnapshot()
    }, 9000)
})


