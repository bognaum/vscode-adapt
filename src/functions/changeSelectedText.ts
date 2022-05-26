import * as vsc from 'vscode';

export default function changeSelectedText(
	callback: (s: string) => string
) {
	return function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
		for (let sel of tEditor.selections) {
			let text = tEditor.document.getText(sel);
			text = callback(text);
			edit.replace(sel, text);
		}
	};
}