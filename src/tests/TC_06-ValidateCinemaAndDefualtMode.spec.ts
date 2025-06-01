import test, { expect } from "playwright/test";
import { Youtube } from "../object-repoistory/youtube";
import { PageManager } from "../pageManager";

let youtube: Youtube;
let pageManager: PageManager;

test.use({
  actionTimeout: 5000,
  navigationTimeout: 5000,
});

test.beforeEach(async ({ page }) => {
  pageManager = PageManager.getpageManagerInstance(page);
  youtube = pageManager.getYouTubeInstance(page);
});

test("TC_06-ValidateCinemaAndDefualtMode", async ({ page }) => {
  await youtube.goto();
  await expect(page).toHaveURL(Youtube.youTubeURL);
  await youtube.pauseVideo();
  if (await youtube.isTheaterModeVisible()) {
    await youtube.hoverOnTheaterMode();

    await youtube.theaterMode.click();

    await youtube.hoverOnTheaterMode();

    await expect(youtube.defaultMode).toBeVisible();
  }
  if (await youtube.isDefaultModeVisible()) {
    await youtube.defaultMode.click();
    await youtube.hoverOnDefaultMode();
    await expect(youtube.theaterMode).toBeVisible();
  }
});
