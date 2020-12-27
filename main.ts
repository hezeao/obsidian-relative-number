import { Plugin } from "obsidian";

export default class RelativeLineNumbers extends Plugin {
  onload() {
    // @ts-ignore
    const showLineNumber: Boolean = this.app.vault.getConfig("showLineNumber");
    if (!showLineNumber) {
      return;
    }

    this.registerCodeMirror((cm) => {
      cm.on("cursorActivity", this.relativeLineNumbers);
    });
  }

  relativeLineNumbers(cm: CodeMirror.Editor) {
    const current = cm.getCursor().line + 1;
    if (cm.state.curLineNum === current) {
      return;
    }
    cm.state.curLineNum = current;
    cm.setOption("lineNumberFormatter", (line: number) => {
      if (line === current) {
        return String(current);
      }

      return String(Math.abs(current - line));
    });
  }
}
