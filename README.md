# VS Code Yelp Style Function Reviewer

A VS Code extension that scans your JavaScript and TypeScript files for function definitions and adds Yelp Style Review to them.

![Demo of VS Code Yelp Style Function Reviewer](assets/gifs/demo.gif)

## Features
- Scans for function definitions
- Displays a random Yelp-style review (star rating and witty comment) above each function, updating dynamically as you edit your code.
- Customize review styles: Choose between `funny` (default), `roast`, or `serious` modes for the reviews.  
    Configure your preferred mode in `.vscode/settings.json`:

    ```json
    "functionReview.mode": "funny"
    ```
- Click on a review to view its history in the command palette, or run the `Function Review: Show History` command. You can select from the review history to update the review.
- Add your own custom review using the `Function Review: Add Custom Review` command.

## Usage
Open a JavaScript or TypeScript file and see the reviews above your functions!

## Development
- Run `npm install` to install dependencies
- Run `npm run compile` to build the extension
- Press `F5` to launch the extension in a new Extension Development Host window

## Future Plans
- Integrate a large language model (LLM) to generate smarter, context-aware Yelp-style reviews for functions.
- Enhance review customization by allowing users to set review tone, length, and detail level.
- Support additional languages beyond JavaScript and TypeScript.
- Add options to filter, sort, or pin favorite reviews.
- Enable collaborative reviews and sharing among team members.
