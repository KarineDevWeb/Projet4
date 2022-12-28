"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const utils_1 = require("./utils");
// import commands
const create_1 = require("./commands/create");
const watch_1 = require("./commands/watch");
const build_1 = require("./commands/build");
// called when extension is activated
function activate(context) {
    (0, utils_1.registerCommands)([
        { name: "create", func: create_1.default },
        { name: "watch", func: watch_1.default },
        { name: "build", func: build_1.default }
    ], context);
}
exports.activate = activate;
// Called when extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map