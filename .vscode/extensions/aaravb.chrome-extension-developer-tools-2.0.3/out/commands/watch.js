"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path_1 = require("path");
/**
 * Uses webpack to watch extension files
 * @param {vscode.ExtensionContext} context
 */
exports.default = (context) => {
    let terminal = vscode.window.createTerminal({ name: "watch", iconPath: vscode.Uri.file((0, path_1.join)(context.extensionPath, "assets", "chrome.png")) });
    terminal.show();
    terminal.sendText("node ./node_modules/webpack/bin/webpack.js --mode=development --watch --config config/webpack.config.js");
};
//# sourceMappingURL=watch.js.map