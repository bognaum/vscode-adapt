// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "adapt" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('adapt.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from adapt!');
	});

	const commands = [
		vscode.commands.registerTextEditorCommand(
			"adapt.selectPathSegment", 
			function (tEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, args: any[]) {
				console.log("selectPathSegment");
				vscode.window.showInformationMessage('selectPathSegment');
			}
		),
		vscode.commands.registerTextEditorCommand(
			"adapt.selectBetweenBrackets", 
			function (tEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, args: any[]) {
				console.log("selectBetweenBrackets");
				vscode.window.showInformationMessage('selectBetweenBrackets');
			}
		),
		vscode.commands.registerTextEditorCommand(
			"adapt.selectBetweenQuotes", 
			function (tEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, args: any[]) {
				console.log("selectBetweenQuotes");
				vscode.window.showInformationMessage('selectBetweenQuotes');
			}
		),
		vscode.commands.registerTextEditorCommand(
			"adapt.tripleLineSplit", 
			function (tEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, args: any[]) {
				console.log("tripleLineSplit");
				vscode.window.showInformationMessage('tripleLineSplit');
			}
		),
		vscode.commands.registerTextEditorCommand(
			"adapt.delToLineBegin", 
			function (tEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, args: any[]) {
				console.log("delToLineBegin");
				vscode.window.showInformationMessage('delToLineBegin');
			}
		),
	];

	context.subscriptions.push(disposable, ...commands);
}

// this method is called when your extension is deactivated
export function deactivate() {}
