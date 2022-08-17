import * as vsc from 'vscode';

import tripleLineSplit     from "./commands/tripleLineSplit";
import selectPathSegment   from "./commands/selectPathSegment";
import selectBetweenQuotes from "./commands/selectBetweenQuotes";

import alignCursors     from "./commands/alignCursors";
import changeToEntities from "./commands/changeToEntities";
import pasteLineNumber  from "./commands/pasteLineNumber";

import pasteCursorNums from "./functions/pasteCursorNums";
import openFolderWith  from "./functions/openFolderWith";

import replaceSelection from './functions/replaceSelection';

import changeSelectedText from "./functions/changeSelectedText";


export function activate(context: vsc.ExtensionContext): void {
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
			"adapt.openProjectInSublimeMerge",
			function (arg1: {fsPath: string}, arg2: any) {
				const 
					wsfs = vsc.workspace.workspaceFolders,
					pathes = wsfs?.map((v) => v.uri.fsPath) || null;
				openFolderWith(pathes, (path: string) => `smerge "${path}"`);
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
			"adapt.openProjectInSublimeText",
			function (arg1: {fsPath: string}, arg2: any) {
				const 
					wsfs = vsc.workspace.workspaceFolders,
					pathes = wsfs?.map((v) => v.uri.fsPath) || null;
				openFolderWith(pathes, (path: string) => `subl "${path}"`);
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
			"adapt.openProjectInCMD",
			function (arg1: {fsPath: string}, arg2: any) {
				const 
					wsfs = vsc.workspace.workspaceFolders,
					pathes = wsfs?.map((v) => v.uri.fsPath) || null;
				openFolderWith(pathes, (path: string) => `start cmd /s /k pushd "${path}"`);
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
		vsc.commands.registerCommand(
			"adapt.openProjectInPowerShell",
			function (arg1: {fsPath: string}, arg2: any) {
				const 
					wsfs = vsc.workspace.workspaceFolders,
					pathes = wsfs?.map((v) => v.uri.fsPath) || null;
				openFolderWith(
					pathes,
					(path: string) => {
						return `start powershell.exe -noexit ` + 
							`-command Set-Location -literalPath "${path}"`;
					}, 
				);
			}
		),


		vsc.commands.registerTextEditorCommand(
			"adapt.replaceSlashes.backToFortvard", 
			replaceSelection(/\\/g  , "/"   ),
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.replaceSlashes.doubleBackToFortvard", 
			replaceSelection(/\\\\/g, "/"   ),
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.replaceSlashes.forvardToBack", 
			replaceSelection(/\//g  , "\\"  ),
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.replaceSlashes.forvardToDoubleBack", 
			replaceSelection(/\//g  , "\\\\"),
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.replaceSlashes.backToDoubleBack", 
			replaceSelection(/\\/g  , "\\\\"),
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.replaceSlashes.doubleBackToBack", 
			replaceSelection(/\\\\/g, "\\"  ),
		),
		vsc.commands.registerCommand(
			"adapt.copyPathName",
			function (arg1: {fsPath: string}, arg2: any) {
				const pathname = arg1.fsPath;
				vsc.env.clipboard.writeText(pathname);
			}
		),
		vsc.commands.registerCommand(
			"adapt.copyPath",
			function (arg1: {fsPath: string}, arg2: any) {
				const PATH = require("path");
				const 
					pathname = arg1.fsPath,
					path = PATH.dirname(pathname);
				vsc.env.clipboard.writeText(path);
			}
		),
		vsc.commands.registerCommand(
			"adapt.copyFileName",
			function (arg1: {fsPath: string}, arg2: any) {
				const PATH = require("path");
				const 
					pathname = arg1.fsPath,
					name = PATH.basename(pathname);
				vsc.env.clipboard.writeText(name);
			}
		),
		vsc.commands.registerCommand(
			"adapt.copyProjectPath",
			function (arg1: {fsPath: string}, arg2: any) {
				const 
					wsfs = vsc.workspace.workspaceFolders,
					pathes = wsfs?.map((v) => v.uri.fsPath) || [];
				vsc.env.clipboard.writeText(pathes.join("\n"));
			}
		),


		vsc.commands.registerTextEditorCommand(
			"adapt.notation.dashToSnail", 
			replaceSelection(/-/g, "_"  ),
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.notation.snailToDash", 
			replaceSelection(/_/g, "-"  ),
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.notation.dashToCamel", 
			replaceSelection(/-(\w)/g, (ss: string, p1: string) => p1.toUpperCase()),
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.notation.snailToCamel", 
			replaceSelection(/_(\w)/g, (ss: string, p1: string) => p1.toUpperCase()),
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.notation.camelToDash", 
			replaceSelection(/[A-Z]/g, (ss: string) => "-"+ss.toLowerCase()),
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.notation.camelToSnail", 
			replaceSelection(/[A-Z]/g, (ss: string) => "_"+ss.toLowerCase()),
		),


		vsc.commands.registerTextEditorCommand(
			"adapt.uriCoding.decodeURI", 
			changeSelectedText(decodeURI),
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.uriCoding.decodeURIComponent", 
			changeSelectedText(decodeURIComponent),
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.uriCoding.encodeURI", 
			changeSelectedText(encodeURI),
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.uriCoding.encodeURIComponent", 
			changeSelectedText(encodeURIComponent),
		),
	];

	context.subscriptions.push(...commands);
}

// this method is called when your extension is deactivated
export function deactivate() {}
