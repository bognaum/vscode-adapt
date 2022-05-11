import * as vsc from 'vscode';

export default function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
	for (let sel of tEditor.selections) {
		let text = tEditor.document.getText(sel);
		text = text.replace(/[<>&]/g, (m: string) => {
			switch (m) {
				case "<": return "&lt;";
				case ">": return "&gt;";
				case "&": return "&amp;";
				default : return m;
			}
		});
		edit.replace(sel, text);
	}
}