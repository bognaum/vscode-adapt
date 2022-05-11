import * as vsc from 'vscode';
const 
	path          = require("path"),
	fs            = require("fs"),
	child_process = require("child_process");

export default function openFolderWith(
	api: {fsPath: string},
	callb: (path: string) => string, 
) {
	if (api?.fsPath) {
		execCommand(api.fsPath, callb);
	} else {
		vsc.window.showInformationMessage("Please select a folder.");
		vsc.window.showOpenDialog({canSelectFolders: true})
			.then((arr) => {
				if (arr)
					for (let v of arr) 
						execCommand(v.fsPath, callb);
				else
					vsc.window.showInformationMessage("Aborted.");
			});
	}
}

function execCommand(fsPath: string, callb: (path: string) => string,) {
	const 
		isFile     = fs.lstatSync(fsPath).isFile(),
		folderPath = isFile? path.dirname(fsPath) : fsPath,
		cliCommand = callb(folderPath);
	vsc.window.showInformationMessage(cliCommand);
	child_process.exec(cliCommand);
}