import { Locator, Page } from "playwright";

export class Youtube {
  readonly page: Page;
  readonly pause: Locator;
  readonly pauseAfterHover: Locator;
  readonly play: Locator;
  readonly nextVideo: Locator;
  readonly muteIcon: Locator;
  readonly unMuteIcon: Locator;
  readonly autoPlayOffFalse: Locator;
  readonly autoPlayOffTrue: Locator;
  readonly playOffToggle: Locator;
  readonly subtitle: Locator;
  readonly subtitleTrue: Locator;
  readonly defaultMode: Locator;
  readonly theaterMode: Locator;
  readonly fullScreenMode: Locator;
  readonly exitFullScreenMode: Locator;
  readonly loader: Locator;

  static readonly youTubeURL: string =
    "https://www.youtube.com/watch?v=NE7F-uQM4QU";

  constructor(page: Page) {
    this.page = page;
    this.pause = this.page.getByRole("button", {
      name: /Pause( \(k\)| keyboard shortcut k)?/i,
    });
    this.pauseAfterHover = this.page.getByRole("button", {
      name: "Pause keyboard shortcut k",
    });
    this.play = this.page.getByRole("button", { name: "Play" }).nth(0);
    this.nextVideo = this.page.getByRole("button", {
      name: /next( keyboard shortcut)?(\s|\s*\()shift\+n[\)]?/i,
    });
    this.muteIcon = this.page.getByRole("button", { name: /Mute/i });
    this.unMuteIcon = this.page.getByRole("button", {
      name: /Unmute keyboard/i,
    });
    this.autoPlayOffFalse = this.page.getByRole("button", {
      name: "Autoplay is off",
    });
    this.autoPlayOffTrue = this.page.getByRole("button", {
      name: "Autoplay is on",
    });
    this.playOffToggle = this.page.getByRole("button", { name: /Autoplay/i });
    this.subtitle = this.page.locator(
      '//button[@class="ytp-subtitles-button ytp-button"]'
    );
    this.subtitleTrue = this.page.getByRole("button", {
      name: /Subtitles.*captions/i,
    });
    this.theaterMode = this.page.getByRole("button", { name: /theater mode/i });
    this.defaultMode = this.page.getByRole("button", {
      name: /default view/i,
    });
    this.fullScreenMode = this.page.getByRole("button", {
      name: /^(?!.*Exit).*full screen.*/i,
    });
    this.exitFullScreenMode = this.page.getByRole("button", {
      name: /Exit full screen/i,
    });
    this.loader = this.page.locator('//div[@class="ytp-spinner"]');
  }

  async goto() {
    await this.page.goto(Youtube.youTubeURL, {
      waitUntil: "load",
    });
    await this.hideLoader();
  }

  private async hideLoader() {
    await this.loader.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async pauseVideo() {
    await this.play.click();
    await this.hideLoader();
    await this.pause.hover();
    await this.pause.waitFor();
    await this.pause.click({ force: true });
  }

  async nextVideoclick() {
    await this.nextVideo.click();
  }

  async muteIconClick() {
    await this.muteIcon.click();
  }

  async playOffToggleClick() {
    await this.playOffToggle.click();
  }

  async subtitleClick() {
    await this.subtitle.click({ force: true });
  }

  async getSubTitleValue(): Promise<string> {
    let value = await this.subtitleTrue.getAttribute("aria-pressed");
    return value ?? "false";
  }

  async hoverOnTheaterMode() {
    await this.theaterMode.waitFor();
    await this.theaterMode.hover();
  }

  async hoverOnDefaultMode() {
    await this.defaultMode.isVisible();
    await this.defaultMode.hover();
  }

  async hoverOnFullScreenMode() {
    await this.fullScreenMode.waitFor();
    await this.fullScreenMode.hover();
  }

  async isTheaterModeVisible(): Promise<boolean> {
    return await this.theaterMode.isVisible();
  }

  async isDefaultModeVisible(): Promise<boolean> {
    return await this.defaultMode.isVisible();
  }
}
