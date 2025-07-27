import * as vscode from 'vscode';

export const reviewHistory = new Map<string, string[]>();
export const activeReview = new Map<string, string>();

const defaultTemplates = [
    `blew my stack! 🚀`,
    `Refactored my heart. 💖`,
    `may cause spontaneous applause! 👏`,
    `is the MVP of this repo. 🏅`,
    `is pure code cuisine. 👨‍🍳`,
    `could run in production! 🧼`,
    `If only all code was like this! 😍`,
    `is a wild ride—hold onto your semicolons! 🎢`,
    `is the reason I love open source. 💡`,
    `needs more spice, but still tasty. 🌶️`,
    `Debugged and approved by the code gods. 🛐`,
    `is a hidden gem! 💎`,
    `Solid work, gets the job done. 👍`,
    `a bit slow, but charming. 🐢`,
    `messy, but has character. 🎨`,
    `the best in the repo! 🏆`,
    `needs more documentation. 📚`,
    `could use a refactor. 🔧`
];

function generateStars(): string {
    const starCount = Math.floor(Math.random() * 5) + 1;
    return '🌟'.repeat(starCount) + '☆'.repeat(5 - starCount);
}

export function getYelpReview(name?: string): string {
    if (!name) return '';
    const config = vscode.workspace.getConfiguration('functionReview');
    const mode = (config.get<string>('mode') ?? 'funny');
    const base = name;

    let templates = defaultTemplates;
    if (mode === 'roast') {
        templates = [
            `might work... eventually. 🐌`,
            `could be worse, I guess. 🤷‍♂️`,
            `makes spaghetti jealous. 🍝`,
            `was written under duress. 😬`,
            `is a tribute to chaos. 🌀`
        ];
    } else if (mode === 'serious') {
        templates = [
            `follows best practices. ✅`,
            `is well-structured and clean. 🧼`,
            `is modular and reusable. 🧩`,
            `has excellent readability. 👓`,
            `is a solid piece of engineering. 🔧`
        ];
    }

    if (Math.random() < 0.02) {
        templates = [
            `One does not simply write ${base}. 🧙‍♂️`,
            `${base} is inevitable. 🧤`
        ];
    }

    const comment = `${base} ${templates[Math.floor(Math.random() * templates.length)]}`;
    const stars = generateStars();

    if (!reviewHistory.has(base)) reviewHistory.set(base, []);
    reviewHistory.get(base)?.push(comment);

    return `${stars} – “${comment}”`;
}

export function formatReviewWithStars(comment: string, name: string): string {
    const stars = generateStars();
    return `${stars} – “${comment}”`;
}