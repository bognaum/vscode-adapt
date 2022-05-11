import * as vsc from 'vscode';

export default function pasteCursorNums(tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[], len:number=0) {
	const 
		sels    = tEditor.selections,
		selsLen = tEditor.selections.length;
	
	sels.sort((a: vsc.Selection, b: vsc.Selection) => {
		if (a.active.line == b.active.line)
			return a.active.character - b.active.character;
		else
			return a.active.line - b.active.line;
	});
	for (let i = 0; i < selsLen; i ++) {
		edit.replace(sels[i], (i + 1).toString().padStart(len, " "));
	}
}