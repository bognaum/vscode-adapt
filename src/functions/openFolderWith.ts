import * as vsc from 'vscode';
const 
	PATH          = require("path"),
	FS            = require("fs"),
	CHILD_PROCESS = require("child_process");

export default function openFolderWith(
	path: null|string,
	callb: (path: string) => string, 
) {
	if (path) {
		execCommand(path, callb);
	} else {
		vsc.window.showInformationMessage("Please select a folder.");
		vsc.window.showOpenDialog({canSelectFolders: true})
			.then((arr) => {
				if (arr) {
					for (let v of arr) {
						execCommand(v.fsPath, callb);
					}
				} else {
					vsc.window.showInformationMessage("Aborted.");
				}
			});
	}
}

function execCommand(path: string, callb: (path: string) => string,) {
	const 
		isFile     = FS.lstatSync(path).isFile(),
		folderPath = isFile? PATH.dirname(path) : path,
		cliCommand = callb(folderPath);
	vsc.window.showInformationMessage(cliCommand);
	CHILD_PROCESS.exec(cliCommand);
}