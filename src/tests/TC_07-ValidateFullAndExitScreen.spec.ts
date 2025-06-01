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

test("TC_07-ValidateFullAndExitScreen", async ({ page }) => {
  await youtube.goto();
  await expect(page).toHaveURL(Youtube.youTubeURL);
  await youtube.pauseVideo();

  if (await youtube.fullScreenMode.isVisible()) {
    await youtube.hoverOnFullScreenMode();
    await youtube.fullScreenMode.click({ force: true });
    await youtube.hoverOnFullScreenMode();
    await youtube.exitFullScreenMode.waitFor();
    await expect(youtube.exitFullScreenMode).toBeVisible();
  }

  if (await youtube.exitFullScreenMode.isVisible()) {
    await youtube.exitFullScreenMode.click();
    await youtube.exitFullScreenMode.hover();
    await expect(youtube.fullScreenMode).toBeVisible();
  }
});
