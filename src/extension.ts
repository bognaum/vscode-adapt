import * as vsc from 'vscode';

import tripleLineSplit     from "./commands/tripleLineSplit";
import selectPathSegment   from "./commands/selectPathSegment";
import selectBetweenQuotes from "./commands/selectBetweenQuotes";
import delToLineBegin      from "./commands/delToLineBegin";

import alignCursors     from "./commands/alignCursors";
import changeToEntities from "./commands/changeToEntities";
import pasteLineNumber  from "./commands/pasteLineNumber";

import pasteCursorNums from "./functions/pasteCursorNums";
import openFolderWith  from "./functions/openFolderWith";

export function activate(context: vsc.ExtensionContext) {
	const commands = [
		vsc.commands.registerTextEditorCommand(
			"adapt.selectPathSegment", 
			selectPathSegment
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.selectBetweenQuotes", 
			selectBetweenQuotes
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.tripleLineSplit", 
			tripleLineSplit
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.delToLineBegin", 
			delToLineBegin
		), 


		vsc.commands.registerTextEditorCommand(
			"adapt.alignCursors",
			alignCursors
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.pasteCursorNums",
			function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
				pasteCursorNums(tEditor, edit, args, 0);
			}
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.pasteCursorNums-x",
			function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
				pasteCursorNums(tEditor, edit, args, 1);
			}
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.pasteCursorNums-xx",
			function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
				pasteCursorNums(tEditor, edit, args, 2);
			}
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.pasteCursorNums-xxx",
			function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
				pasteCursorNums(tEditor, edit, args, 3);
			}
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.pasteCursorNums-xxxx",
			function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
				pasteCursorNums(tEditor, edit, args, 4);
			}
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.pasteCursorNums-xxxxx",
			function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
				pasteCursorNums(tEditor, edit, args, 5);
			}
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.changeToEntities",
			changeToEntities
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.pasteLineNumber",
			pasteLineNumber
		),
		vsc.commands.registerCommand(
			"adapt.openSublimeMerge",
			function (arg1: {fsPath: string}, arg2: any) {
				const path = arg1.fsPath;
				openFolderWith(path, (path: string) => `smerge "${path}"`);
			}
		),
		vsc.commands.registerCommand(
			"adapt.openSublimeText",
			function (arg1: {fsPath: string}, arg2: any) {
				const path = arg1.fsPath;
				openFolderWith(path, (path: string) => `subl "${path}"`);
			}
		),
		vsc.commands.registerCommand(
			"adapt.openCMD",
			function (arg1: {fsPath: string}, arg2: any) {
				const path = arg1.fsPath;
				openFolderWith(path, (path: string) => `start cmd /s /k pushd "${path}"`);
			}
		),
		vsc.commands.registerCommand(
			"adapt.openPowerShell",
			function (arg1: {fsPath: string}, arg2: any) {
				const path = arg1.fsPath;
				openFolderWith(
					path,
					(path: string) => {
						return `start powershell.exe -noexit ` + 
							`-command Set-Location -literalPath "${path}"`;
					}, 
				);
			}
		),
	];

	context.subscriptions.push(...commands);
}

// this method is called when your extension is deactivated
export function deactivate() {}
