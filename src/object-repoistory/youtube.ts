import { Locator, Page } from "playwright";


export class Youtube{

    readonly page:Page;
    readonly pause:Locator;
    readonly nextVideo:Locator;
    readonly muteIcon:Locator;
    readonly unMuteIcon:Locator;


    constructor(page:Page)
    {

        this.page = page;
        this.pause = this.page.locator('.ytp-play-button')
        this.nextVideo = this.page.locator('//a[@title="Next (SHIFT+n)"]');
        this.muteIcon = this.page.locator('//div[@class="ytp-volume-icon"]');
        this.unMuteIcon = this.page.locator('//div[@class="ytp-volume-icon"]');

    }

    async goto()
    {

        await this.page.goto('https://www.youtube.com/watch?v=XBSpY_v21iI');
        // await this.page.waitForLoadState("load");
    }


    async playVideo()
    {
        await this.pause.hover();
        await this.pause.click({force:true});
        await this.pause.hover();

    }

    async nextVideoclick()
    {
        await this.nextVideo.click();
    }

    async muteIconClick()
    {

       await  this.muteIcon.click();
    }

}