import test, { expect } from "playwright/test";
import { Youtube } from "../object-repoistory/youtube";
import { PageManager } from "../pageManager";

let youtube: Youtube;
let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
  pageManager = PageManager.getpageManagerInstance(page);
  youtube = pageManager.getYouTubeInstance(page);
});

test("TC_05-VerifySubTitlesFunctionality", async ({ page }) => {
  await youtube.goto();
  await expect(page).toHaveURL(Youtube.youTubeURL);
  await youtube.pauseVideo();
  if ((await youtube.getSubTitleValue()) == "true") {
    await youtube.subtitleClick();
    expect(await youtube.getSubTitleValue()).toEqual("false");
  } else if ((await youtube.getSubTitleValue()) == "false") {
    await youtube.subtitleClick();
    expect(await youtube.getSubTitleValue()).toEqual("true");
  }
});
