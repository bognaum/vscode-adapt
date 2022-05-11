import * as vsc from 'vscode';

export default function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
	for (let sel of tEditor.selections) {
		const lN = sel.active.line + 1;
		edit.replace(sel, lN.toString());
	}
}