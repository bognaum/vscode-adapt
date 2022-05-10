import * as vsc from 'vscode';

import tripleLineSplit     from "./commands/tripleLineSplit";
import selectPathSegment   from "./commands/selectPathSegment";
import selectBetweenQuotes from "./commands/selectBetweenQuotes";
import delToLineBegin      from "./commands/delToLineBegin";

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
	];

	context.subscriptions.push(...commands);
}

// this method is called when your extension is deactivated
export function deactivate() {}
