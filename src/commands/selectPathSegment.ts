import * as vsc from 'vscode';

export default function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
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