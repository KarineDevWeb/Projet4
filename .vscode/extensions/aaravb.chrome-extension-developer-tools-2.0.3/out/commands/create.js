"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const utils_1 = require("../utils");
const path_1 = require("path");
const createExtension = require("chrome-extension-cli-client").createExtension;
/**
 * Creates a new Chrome extension
 * @param {vscode.ExtensionContext} context
 */
exports.default = (context) => {
    let initializationScreen = vscode.window.createWebviewPanel("New Chrome Extension", "New Chrome Extension", vscode.ViewColumn.One, {
        enableScripts: true
    });
    let stylesSrc = initializationScreen.webview.asWebviewUri(vscode.Uri.file((0, path_1.join)(context.extensionPath, "webviews", "initialization_screen", "styles.css"))).toString();
    let scriptSrc = initializationScreen.webview.asWebviewUri(vscode.Uri.file((0, path_1.join)(context.extensionPath, "webviews", "initialization_screen", "index.js"))).toString();
    let chromeImgSrc = initializationScreen.webview.asWebviewUri(vscode.Uri.file((0, path_1.join)(context.extensionPath, "assets", "chrome.png"))).toString();
    initializationScreen.webview.html = (0, utils_1.renderWebview)((0, path_1.join)(context.extensionPath, "webviews", "initialization_screen", "index.html"), {
        "index.js": scriptSrc,
        "styles.css": stylesSrc,
        "/assets/chrome.png": chromeImgSrc
    });
    initializationScreen.webview.onDidReceiveMessage((res) => {
        console.log(res);
        if (res.status === "ERR") {
            vscode.window.showErrorMessage(res.message);
            return;
        }
        if (res.status === "GET") {
            vscode.window.showOpenDialog({
                title: "Choose a location",
                openLabel: "Select",
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false
            }).then((locations) => {
                initializationScreen.webview.postMessage({
                    status: "GIVE",
                    message: { path: locations[0].fsPath }
                });
            });
            return;
        }
        let config = res.message;
        try {
            createExtension(config.projectName, {
                overridePage: config.extensionType === "override_page",
                devtools: config.extensionType === "devtools"
            }, (0, path_1.join)(config.chosenPath), (str) => { });
            initializationScreen.dispose();
            vscode.commands.executeCommand("vscode.openFolder", vscode.Uri.file((0, path_1.join)(config.chosenPath, config.projectName)), {
                forceNewWindow: true
            });
        }
        catch (e) {
            console.error(e);
            let err = e;
            vscode.window.showErrorMessage("ERROR: " + (err).message);
            initializationScreen.webview.postMessage({
                status: "ERR",
                message: err.message
            });
        }
    }, undefined, context.subscriptions);
};
//# sourceMappingURL=create.js.map