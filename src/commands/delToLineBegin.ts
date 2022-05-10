import * as vsc from 'vscode';

export default function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
	for (let sel of tEditor.selections) {
		const {start, end} = sel;
		if (start.character === 0)
			vsc.commands.executeCommand("deleteLeft");
		else
			edit.delete(new vsc.Range(start.with(start.line, 0), end));
	}
	
}