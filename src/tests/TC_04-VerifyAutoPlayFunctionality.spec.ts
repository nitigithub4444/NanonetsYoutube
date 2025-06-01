import test, { expect } from "playwright/test";
import { Youtube } from "../object-repoistory/youtube";
import { PageManager } from "../pageManager";

let youtube: Youtube;
let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
  pageManager = PageManager.getpageManagerInstance(page);
  youtube = pageManager.getYouTubeInstance(page);
});

test("TC_04-VerifyAutoPlayFunctionality", async ({ page }) => {
  await youtube.goto();
  await expect(page).toHaveURL(Youtube.youTubeURL);
  await youtube.playOffToggleClick();
  if (await youtube.autoPlayOffTrue.isVisible()) {
    await youtube.playOffToggleClick();
    await expect(youtube.autoPlayOffFalse).toBeVisible();
  } else if (await youtube.autoPlayOffFalse.isVisible()) {
    await youtube.playOffToggleClick();
    await expect(youtube.autoPlayOffTrue).toBeVisible();
  }
});
