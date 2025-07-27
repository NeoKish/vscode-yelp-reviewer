
import * as vscode from 'vscode';
import { activeReview, formatReviewWithStars, getYelpReview} from '../utils/reviewGenerator';

export class FunctionReviewCodeLensProvider implements vscode.CodeLensProvider {
    
    private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
    public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

    public refresh() {
        this._onDidChangeCodeLenses.fire();
    }
  
    provideCodeLenses(document: vscode.TextDocument): vscode.CodeLens[] {
        const lenses: vscode.CodeLens[] = [];
        const regex = /(?:\b(?:async\s+)?function\s+(\w+)\s*\()|(?:\b(?:const|let|var)\s+(\w+)\s*=\s*\(.*?\)\s*=>)/g;
        const text = document.getText();
        let match: RegExpExecArray | null;

        while ((match = regex.exec(text))) {
            const line = document.positionAt(match.index).line;
            const name = match[1] || match[2];
            const range = new vscode.Range(line, 0, line, 0);
            let review = '';
            if (activeReview.has(name)) {
                review = formatReviewWithStars(activeReview.get(name)!, name);
            } else {
                review = getYelpReview(name);
            }
            lenses.push(new vscode.CodeLens(range, {
                title: review,
                command: 'functionReview.showReviewHistory',
                arguments: [name],
                tooltip: 'Yelp-style review for this function'
            }));
        }
        return lenses;
    }
}