(()=>{"use strict";var e={184:function(e,t,s){var r,o=this&&this.__createBinding||(Object.create?function(e,t,s,r){void 0===r&&(r=s);var o=Object.getOwnPropertyDescriptor(t,s);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[s]}}),Object.defineProperty(e,r,o)}:function(e,t,s,r){void 0===r&&(r=s),e[r]=t[s]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=this&&this.__importStar||(r=function(e){return r=Object.getOwnPropertyNames||function(e){var t=[];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[t.length]=s);return t},r(e)},function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s=r(e),n=0;n<s.length;n++)"default"!==s[n]&&o(t,e,s[n]);return i(t,e),t});Object.defineProperty(t,"__esModule",{value:!0}),t.activate=function(e){w=new b,w.start()},t.deactivate=function(){w.dispose()};const a=n(s(928)),c=n(s(896)),u=n(s(317)),d=n(s(398));async function l(e){try{if((await c.promises.stat(e)).isFile())return!0}catch(e){return!1}return!1}const p=["build","compile","watch"];function h(e){for(const t of p)if(-1!==e.indexOf(t))return!0;return!1}const f=["test"];function g(e){for(const t of f)if(-1!==e.indexOf(t))return!0;return!1}let k,w;function m(){return k||(k=d.window.createOutputChannel("Gulp Auto Detection")),k}function v(){d.window.showWarningMessage(d.l10n.t("Problem finding gulp tasks. See the output for more information."),d.l10n.t("Go to output")).then((e=>{void 0!==e&&k.show(!0)}))}async function P(e){const t=process.platform;if("win32"===t&&await l(a.join(e,"node_modules",".bin","gulp.cmd"))){const e=a.join(process.env.APPDATA?process.env.APPDATA:"","npm","gulp.cmd");return await l(e)?`"${e}"`:a.join(".","node_modules",".bin","gulp.cmd")}return"linux"!==t&&"darwin"!==t||!await l(a.join(e,"node_modules",".bin","gulp"))?"gulp":a.join(".","node_modules",".bin","gulp")}class _{constructor(e,t){this._workspaceFolder=e,this._gulpCommand=t}get workspaceFolder(){return this._workspaceFolder}isEnabled(){return"on"===d.workspace.getConfiguration("gulp",this._workspaceFolder.uri).get("autoDetect")}start(){const e=a.join(this._workspaceFolder.uri.fsPath,"{node_modules,gulpfile{.babel.js,.esm.js,.js,.mjs,.cjs,.ts}}");this.fileWatcher=d.workspace.createFileSystemWatcher(e),this.fileWatcher.onDidChange((()=>this.promise=void 0)),this.fileWatcher.onDidCreate((()=>this.promise=void 0)),this.fileWatcher.onDidDelete((()=>this.promise=void 0))}async getTasks(){return this.isEnabled()?(this.promise||(this.promise=this.computeTasks()),this.promise):[]}async getTask(e){const t=e.definition.task;if(t){const s=e.definition,r={cwd:this.workspaceFolder.uri.fsPath};return new d.Task(s,this.workspaceFolder,t,"gulp",new d.ShellExecution(await this._gulpCommand,[t],r))}}async hasGulpfile(e){for(const t of await c.promises.readdir(e)){const e=a.extname(t);if(".js"!==e&&".mjs"!==e&&".cjs"!==e&&".ts"!==e)continue;if(!l(t))continue;const s=a.basename(t,e).toLowerCase();if("gulpfile"===s)return!0;if("gulpfile.esm"===s)return!0;if("gulpfile.babel"===s)return!0}return!1}async computeTasks(){const e="file"===this._workspaceFolder.uri.scheme?this._workspaceFolder.uri.fsPath:void 0,t=[];if(!e)return t;if(!await this.hasGulpfile(e))return t;const s=`${await this._gulpCommand} --tasks-simple --no-color`;try{const{stdout:t,stderr:i}=await(r=s,o={cwd:e},new Promise(((e,t)=>{u.exec(r,o,((s,r,o)=>{s&&t({error:s,stdout:r,stderr:o}),e({stdout:r,stderr:o})}))})));if(i&&i.length>0){const e=i.split("\n");e.pop(),e.every((e=>e.indexOf("No license field")>=0))||(m().appendLine(i),v())}const n=[];if(t){const e=t.split(/\r{0,1}\n/);for(const t of e){if(0===t.length)continue;const e={type:"gulp",task:t},s={cwd:this.workspaceFolder.uri.fsPath},r=new d.Task(e,this.workspaceFolder,t,"gulp",new d.ShellExecution(await this._gulpCommand,[t],s));n.push(r);const o=t.toLowerCase();h(o)?r.group=d.TaskGroup.Build:g(o)&&(r.group=d.TaskGroup.Test)}}return n}catch(e){const s=m();return e.stderr&&s.appendLine(e.stderr),e.stdout&&s.appendLine(e.stdout),s.appendLine(d.l10n.t("Auto detecting gulp for folder {0} failed with error: {1}', this.workspaceFolder.name, err.error ? err.error.toString() : 'unknown")),v(),t}var r,o}dispose(){this.promise=void 0,this.fileWatcher&&this.fileWatcher.dispose()}}class b{constructor(){this.detectors=new Map}start(){const e=d.workspace.workspaceFolders;e&&this.updateWorkspaceFolders(e,[]),d.workspace.onDidChangeWorkspaceFolders((e=>this.updateWorkspaceFolders(e.added,e.removed))),d.workspace.onDidChangeConfiguration(this.updateConfiguration,this)}dispose(){this.taskProvider&&(this.taskProvider.dispose(),this.taskProvider=void 0),this.detectors.clear()}updateWorkspaceFolders(e,t){for(const e of t){const t=this.detectors.get(e.uri.toString());t&&(t.dispose(),this.detectors.delete(e.uri.toString()))}for(const t of e){const e=new _(t,P(t.uri.fsPath));this.detectors.set(t.uri.toString(),e),e.isEnabled()&&e.start()}this.updateProvider()}updateConfiguration(){for(const e of this.detectors.values())e.dispose(),this.detectors.delete(e.workspaceFolder.uri.toString());const e=d.workspace.workspaceFolders;if(e)for(const t of e)if(!this.detectors.has(t.uri.toString())){const e=new _(t,P(t.uri.fsPath));this.detectors.set(t.uri.toString(),e),e.isEnabled()&&e.start()}this.updateProvider()}updateProvider(){if(!this.taskProvider&&this.detectors.size>0){const e=this;this.taskProvider=d.tasks.registerTaskProvider("gulp",{provideTasks:()=>e.getTasks(),resolveTask:t=>e.getTask(t)})}else this.taskProvider&&0===this.detectors.size&&(this.taskProvider.dispose(),this.taskProvider=void 0)}getTasks(){return this.computeTasks()}computeTasks(){if(0===this.detectors.size)return Promise.resolve([]);if(1===this.detectors.size)return this.detectors.values().next().value.getTasks();{const e=[];for(const t of this.detectors.values())e.push(t.getTasks().then((e=>e),(()=>[])));return Promise.all(e).then((e=>{const t=[];for(const s of e)s&&s.length>0&&t.push(...s);return t}))}}async getTask(e){if(0!==this.detectors.size){if(1===this.detectors.size)return this.detectors.values().next().value.getTask(e);if(e.scope!==d.TaskScope.Workspace&&e.scope!==d.TaskScope.Global&&e.scope){const t=this.detectors.get(e.scope.uri.toString());if(t)return t.getTask(e)}}}}},398:e=>{e.exports=require("vscode")},317:e=>{e.exports=require("child_process")},896:e=>{e.exports=require("fs")},928:e=>{e.exports=require("path")}},t={},s=function s(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,s),i.exports}(184),r=exports;for(var o in s)r[o]=s[o];s.__esModule&&Object.defineProperty(r,"__esModule",{value:!0})})();
//# sourceMappingURL=https://main.vscode-cdn.net/sourcemaps/91fbdddc47bc9c09064bf7acf133d22631cbf083/extensions/gulp/dist/main.js.map