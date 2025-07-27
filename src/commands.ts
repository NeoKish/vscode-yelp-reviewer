import * as vscode from 'vscode';
import { reviewHistory, activeReview } from './utils/reviewGenerator';

export function registerCommands(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('functionReview.showReviewHistory', (name: string) => {
            const history = reviewHistory.get(name) || [];
            vscode.window.showQuickPick(history.slice().reverse(), {
                title: `Review History: ${name}`,
                placeHolder: 'Select a review to view',
            }).then(selected => {
                if (selected) {
                    activeReview.set(name, selected);
                    vscode.window.showInformationMessage(`Selected review for ${name} is now active.`);
                    // Optionally trigger CodeLens refresh:
                    vscode.commands.executeCommand('editor.action.codeLensRefresh');
                }
            });
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('functionReview.addCustomReview', async () => {
            const name = await vscode.window.showInputBox({ prompt: 'Function name' });
            if (!name) return;

            const customReview = await vscode.window.showInputBox({ prompt: `Your review for ${name}` });
            if (!customReview) return;

            const comment = `${name} ${customReview}`;
            if (!reviewHistory.has(name)) reviewHistory.set(name, []);
            reviewHistory.get(name)?.push(comment);
            vscode.window.showInformationMessage(`Review saved for ${name}`);
        })
    );
}
