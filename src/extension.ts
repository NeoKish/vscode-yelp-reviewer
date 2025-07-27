import * as vscode from 'vscode';
import { FunctionReviewCodeLensProvider } from './providers/codeLensProvider';
import { registerCommands } from './commands';

export function activate(context: vscode.ExtensionContext) {
    const selector = [
        { language: 'typescript', scheme: 'file' },
        { language: 'javascript', scheme: 'file' }
    ];

    context.subscriptions.push(
        vscode.languages.registerCodeLensProvider(
            selector,
            new FunctionReviewCodeLensProvider()
        )
    );

    registerCommands(context);
}

export function deactivate() {}