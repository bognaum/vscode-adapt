import * as vsc from 'vscode';
import path = require('path');

export default function openFolderWith(
	callb: (path: string) => string, 
	api?: {fsPath: string}
) {
	if (api?.fsPath) {
		execCommand(api.fsPath);
	} else {
		vsc.window.showInformationMessage("Please select a folder.");
		vsc.window.showOpenDialog({canSelectFolders: true})
			.then((arr) => {
				if (arr)
					for (let v of arr) 
						execCommand(v.fsPath);
				else
					vsc.window.showInformationMessage("Aborted.");
			});
	}

	function execCommand(fsPath: string) {
		const 
			fs = require("fs"),
			isFile = fs.lstatSync(fsPath).isFile(),
			folderPath = isFile? path.dirname(fsPath) : fsPath,
			child_process = require("child_process"),
			cliCommand = callb(folderPath);
		vsc.window.showInformationMessage(cliCommand);
		child_process.exec(cliCommand);
	}
}