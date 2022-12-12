export default class State {
  constructor(cwd) {
    this.cwd = cwd;
  }
  get cwd() {
    return this._cwd;
  }
  set cwd(newPath) {
    this._cwd = newPath;
  }
}