"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderWebview = exports.registerCommands = void 0;
const fs_1 = require("fs");
const vscode = require("vscode");
/**
 * Registers a list of vscode commands
 * @param {VscodeCommandMetadata[]} commands List of commands to be registered
 * @param {vscode.ExtensionContext} context Context of extension
 */
function registerCommands(commands, context) {
    commands.forEach((command) => {
        context.subscriptions.push(vscode.commands.registerCommand(`chrome-extension-developer-tools.${command.name}`, () => {
            command.func(context);
        }));
    });
}
exports.registerCommands = registerCommands;
/**
 * Builds a webview's HTML by rendering a template
 * @param {string} template HTML template file of webview
 * @param {object} data Data to be passed into template
 */
function renderWebview(template, data) {
    let html = (0, fs_1.readFileSync)(vscode.Uri.file(template).fsPath, "utf-8");
    let variables = Object.keys(data);
    for (let i = 0; i < variables.length; i++) {
        html = html.replace(`{{${variables[i]}}}`, data[variables[i]]);
    }
    return html;
}
exports.renderWebview = renderWebview;
//# sourceMappingURL=utils.js.map