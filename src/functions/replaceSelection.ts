import * as vsc from 'vscode';

export default function replaceSelection(
	searchValue: string|RegExp, 
	replacer: any,
	// replacer: string|((ss: string, ...args: any[]) => string)
	// replacer: string
	// replacer: (ss: string, ...args: any[]) => string
) {
	return function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
		for (let sel of tEditor.selections) {
			let text = tEditor.document.getText(sel);
			text = text.replace(searchValue, replacer);
			edit.replace(sel, text);
		}
	};
}