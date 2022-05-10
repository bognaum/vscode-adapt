import * as vsc from 'vscode';

export default function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
	const 
		doc  = tEditor.document,
		opts = tEditor.options,
		EOL  = [0, "\n", "\r\n"][doc.eol],
		selects: vsc.Selection[]    = [],
		offsets: [number, number][] = [];
	const oneTab  = opts.insertSpaces && typeof opts.tabSize === "number" ? 
		" ".repeat(opts.tabSize) : "\t";

	tEditor.edit((edit) => {
		for (let sel of tEditor.selections) {
			const 
				line      = doc.lineAt(sel.active),
				lRange    = line.range,
				text      = line.text,
				indentM   = text.match(/^\s*/),
				indent    = indentM ? indentM[0] : "",
				indLen    = indent.length,
				beforeSel = EOL+indent + oneTab,
				selected  = doc.getText(sel),
				afterSel  = EOL+indent;

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