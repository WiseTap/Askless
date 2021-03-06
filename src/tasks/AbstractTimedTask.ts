import { ServerInternalImp } from "../index";

export abstract class AbstractTimedTask {
  private _started = false;
  private interval: NodeJS.Timeout;
  protected intervalMs: number;

  stop() {
    clearInterval(this.interval);
    this.interval = null;
    this._started = false;
  }

  protected constructor(public readonly server4Flutter: ServerInternalImp) {}

  abstract run();

  start(intervalMs: number) {
    if (this._started) this.stop();
    this.intervalMs = intervalMs;
    const self = this;
    this._started = true;
    self.run();
    this.interval = setInterval(function () {
      self.run();
    }, this.intervalMs);
  }
}
