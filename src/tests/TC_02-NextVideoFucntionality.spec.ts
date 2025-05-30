import test, { expect } from "playwright/test";
import { Youtube } from "../object-repoistory/youtube";
import { before } from "node:test";


let youtube:Youtube;

test.beforeEach( async({page})=>{

youtube = new Youtube(page);

})

test("TC_02-NextVideoFucntionality", async({page})=>{

await youtube.goto();
await page.waitForTimeout(2000);
await youtube.nextVideoclick();
await page.waitForTimeout(2000);
await expect(page).not.toHaveURL("https://www.youtube.com/watch?v=XBSpY_v21iI");

});


