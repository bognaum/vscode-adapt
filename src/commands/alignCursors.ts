import * as vsc from 'vscode';

export default function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
	const posits = [];

	for (let sel of tEditor.selections) 
		posits.push(sel.end.character);

	const max = Math.max(... posits);
	
	for (let [k, sel] of tEditor.selections.entries()) 
		edit.insert(sel.start, " ".repeat(max - posits[k]));
}