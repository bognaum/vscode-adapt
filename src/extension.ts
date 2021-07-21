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

	const vsc = vscode;

	const commands = [
		vscode.commands.registerTextEditorCommand(
			"adapt.selectPathSegment", 
			function (tEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, args: any[]) {
				console.log("selectPathSegment");
				vscode.window.showInformationMessage('selectPathSegment');
				const 
					doc = tEditor.document,
					newSels = [];
				for (let sel of tEditor.selections) {
					const r = doc.getWordRangeAtPosition(sel.anchor, /[^"'`/\\]+/);
					if (r)
						newSels.push(new vsc.Selection(r.start, r.end));
				}
				tEditor.selections = newSels;
			}
		),
		vscode.commands.registerTextEditorCommand(
			"adapt.selectBetweenBrackets", 
			function (tEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, args: any[]) {
				vsc.commands.executeCommand("editor.action.selectToBracket")
				.then(() => {
					const newSels = [];
					for (let sel of tEditor.selections) {
						const 
							{line :aL, character :aCh} = sel.start,
							a = new vsc.Position(aL, aCh + 1),
							{line :bL, character :bCh} = sel.end,
							b = new vsc.Position(bL, bCh - 1);
						newSels.push(new vsc.Selection(a,b));
					}
					tEditor.selections = newSels;
				});
			}
		),
		vscode.commands.registerTextEditorCommand(
			"adapt.selectBetweenQuotes", 
			function (tEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, args: any[]) {
				const 
					doc = tEditor.document,
					text = doc.getText(),
					quoteds = [],
					sels    = [];
				let 
					a = 0, 
					b = 0, 
					char = "", 
					quote = "", 
					i = -1;
				while (char = text[++ i]) {
					if (["'", '"', "`"].includes(char)) {
						if (! quote) 
							a = i + 1, quote = char;
						else if (char === quote) {
							b = i;
							quoteds.push(new vsc.Range(doc.positionAt(a), doc.positionAt(b)));
							quote = "";
						}
					} else if (char === "\\") {
						i ++;
					}
						
				}
				for (let sel of tEditor.selections) {
					const 
						{start, end} = sel,
						range = new vscode.Range(start, end);
					for (let r of quoteds) {
						const 
							{start, end} = r;
						if (r.isEqual(range)) {
							sels.push(new vscode.Selection(
								doc.positionAt(doc.offsetAt(start) - 1), 
								doc.positionAt(doc.offsetAt(end) + 1) 
							));
						} else if (r.contains(range)) {
							sels.push(new vscode.Selection(start, end));
						}
					}
					sels.push(new vscode.Selection(range.start, range.end));
				}
				tEditor.selections = sels;
			}
		),
		vscode.commands.registerTextEditorCommand(
			"adapt.tripleLineSplit", 
			function (tEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, args: any[]) {
				console.log("tripleLineSplit");
				vscode.window.showInformationMessage('tripleLineSplit');

				const 
					doc  = tEditor.document,
					opts = tEditor.options,
					selects: vscode.Selection[] = [],
					offsets: [number, number][] = [];
				const oneTab  = typeof opts.tabSize === "number" ? 
					" ".repeat(opts.tabSize) : "\t";

				tEditor.edit((edit) => {
					
					for (let sel of tEditor.selections) {
						const 
							line    = doc.lineAt(sel.active),
							lRange  = line.range,
							text    = line.text,
							indentM = text.match(/^\s*/),
							indent  = indentM ? indentM[0] : "",
							indLen  = indent.length,
							beforeSel = "\n"+indent + oneTab,
							selected  = doc.getText(sel),
							afterSel  = "\n"+indent;

						// edit.insert(sel.start, beforeSel);
						// edit.insert(sel.end,   afterSel);

						edit.replace(sel, beforeSel + selected + afterSel);

						offsets.push([beforeSel.length, -afterSel.length]);
					}
				})
				.then((ok) => {
					if (ok) {
						for (let [k,sel] of tEditor.selections.entries()) {
							const 
								start = doc.positionAt(doc.offsetAt(sel.start) + offsets[k][0]),
								end   = doc.positionAt(doc.offsetAt(sel.end)   + offsets[k][1]);
							selects.push(new vsc.Selection(start, end));
						}
						tEditor.selections = selects;
					}
				});
			}
		),
		vscode.commands.registerTextEditorCommand(
			"adapt.delToLineBegin", 
			function (tEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, args: any[]) {
				for (let sel of tEditor.selections) {
					const {start, end} = sel;
					if (start.character === 0)
						vsc.commands.executeCommand("deleteLeft");
					else
						edit.delete(new vsc.Range(start.with(start.line, 0), end));
				}
				
			}
		),
	];

	context.subscriptions.push(disposable, ...commands);
}

// this method is called when your extension is deactivated
export function deactivate() {}
