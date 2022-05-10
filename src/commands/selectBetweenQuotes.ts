import * as vsc from 'vscode';

export default function (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, args: any[]) {
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