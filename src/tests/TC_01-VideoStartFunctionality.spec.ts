import test, { expect } from "playwright/test";
import { Youtube } from "../object-repoistory/youtube";
import { PageManager } from "../pageManager";

let youtube: Youtube;
let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
  pageManager =  PageManager.getpageManagerInstance(page);
  youtube = pageManager.getYouTubeInstance(page);
});

test("TC_01-VideoStarFunctionality", async ({ page }) => {
  await youtube.goto();
  await expect(page).toHaveURL(Youtube.youTubeURL);
  await youtube.pauseVideo();
  await expect(youtube.play).toBeVisible();
});