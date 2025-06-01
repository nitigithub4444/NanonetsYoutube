import test, { expect } from "playwright/test";
import { Youtube } from "../object-repoistory/youtube";
import { PageManager } from "../pageManager";

let youtube: Youtube;
let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
  pageManager = PageManager.getpageManagerInstance(page);
  youtube = pageManager.getYouTubeInstance(page);
});

test("TC_03-VerifyMuteFunctionality", async ({ page }) => {
  await youtube.goto();
  await expect(page).toHaveURL(Youtube.youTubeURL);
  await youtube.muteIconClick();
  await expect(youtube.unMuteIcon).toBeVisible();
});
