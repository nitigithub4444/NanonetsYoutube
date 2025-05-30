import test, { expect } from "playwright/test";
import { Youtube } from "../object-repoistory/youtube";
import { before } from "node:test";


let youtube:Youtube;

test.beforeEach( async({page})=>{

youtube = new Youtube(page);

})

test("TC_01-VideoStarFunctionality", async({page})=>{

  await youtube.goto();
  await page.waitForTimeout(2000);
  await youtube.playVideo();
  await expect(youtube.pause).toBeVisible();
});


