import { Page } from "playwright";
import { Youtube } from "./object-repoistory/youtube";

export class PageManager {
  readonly page: Page;
  static obj: PageManager;

  private constructor(page: Page) {
    this.page = page;
  }

  getYouTubeInstance(page: Page) {
    return new Youtube(page);
  }

  static getpageManagerInstance(page: Page) {
    if (!PageManager.obj) {
      PageManager.obj = new PageManager(page);
    }

    return PageManager.obj;
  }
}
