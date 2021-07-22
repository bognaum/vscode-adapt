import * as vsc from 'vscode';

export function activate(context: vsc.ExtensionContext) {
	const commands = [
		vsc.commands.registerTextEditorCommand(
			"adapt.selectPathSegment", 
			function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
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
		vsc.commands.registerTextEditorCommand(
			"adapt.selectBetweenQuotes", 
			function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
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
						range = new vsc.Range(start, end);
					for (let r of quoteds) {
						const 
							{start, end} = r;
						if (r.isEqual(range)) {
							sels.push(new vsc.Selection(
								doc.positionAt(doc.offsetAt(start) - 1), 
								doc.positionAt(doc.offsetAt(end) + 1) 
							));
						} else if (r.contains(range)) {
							sels.push(new vsc.Selection(start, end));
						}
					}
					sels.push(new vsc.Selection(range.start, range.end));
				}
				tEditor.selections = sels;
			}
		),
		vsc.commands.registerTextEditorCommand(
			"adapt.tripleLineSplit", 
			function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
				const 
					doc  = tEditor.document,
					opts = tEditor.options,
					selects: vsc.Selection[] = [],
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
		vsc.commands.registerTextEditorCommand(
			"adapt.delToLineBegin", 
			function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
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

	context.subscriptions.push(...commands);
}

// this method is called when your extension is deactivated
export function deactivate() {}
