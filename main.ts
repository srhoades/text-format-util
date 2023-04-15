import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		
		this.registerCommands();

		
	}

	onunload() {
		
	}

	async loadSettings() {
		
	}

	async saveSettings() {
		
	}

	
	registerCommands() {
		this.addCommand({
			id: 'inverse-case',
			name: 'Inverse Case',
			editorCallback: (editor: Editor, _: MarkdownView) => {
				const selectedText = editor.getSelection();
				const formattedText = this.inverseCase(selectedText);
				editor.replaceSelection(formattedText);
			},
		});

		this.addCommand({
			id: 'title-case',
			name: 'Title Case',
			editorCallback: (editor: Editor, _: MarkdownView) => {
				const selectedText = editor.getSelection();
				const formattedText = this.titleCase(selectedText);
				editor.replaceSelection(formattedText);
			},
		});

		this.addCommand({
			id: 'capitalized-case',
			name: 'Capitalized Case',
			editorCallback: (editor: Editor, _: MarkdownView) => {
				const selectedText = editor.getSelection();
				const formattedText = this.capitalizedCase(selectedText);
				editor.replaceSelection(formattedText);
			},
		});

		this.addCommand({
			id: 'lower-case',
			name: 'Lower Case',
			editorCallback: (editor: Editor, _: MarkdownView) => {
				const selectedText = editor.getSelection();
				const formattedText = this.lowerCase(selectedText);
				editor.replaceSelection(formattedText);
			},
		});

		this.addCommand({
			id: 'sentence-case',
			name: 'Sentence Case',
			editorCallback: (editor: Editor, _: MarkdownView) => {
				const selectedText = editor.getSelection();
				const formattedText = this.sentenceCase(selectedText);
				editor.replaceSelection(formattedText);
			},
		});
	}

	
	inverseCase(text: string): string {
		let result = '';
		for (let i = 0; i < text.length; i++) {
			const char = text[i];
			if (char === char.toUpperCase()) {
				result += char.toLowerCase();
			} else {
				result += char.toUpperCase();
			}
		}
		return result;
	}

	titleCase(text: string): string {
		const ignoreWords = ["a", "an", "the", "and", "but", "or", "for", "nor", "as", "at", "by", "for", "from", "in", "of", "on", "per", "to", "with", "about", "as", "between", "into", "through", "during", "before", "after", "above", "below", "across", "along", "beside", "over", "under", "since", "onto", "upon"];
		return text.replace(/\w\S*/g, (word, index, originalText) => {
			const isFirstWord = index === 0;
			const isLastWord = index + word.length === originalText.length;
			const isMajorWord = !ignoreWords.includes(word.toLowerCase());

			if (isFirstWord || isLastWord || isMajorWord) {
				return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
			} else {
				return word.toLowerCase();
			}
		});
	}

	capitalizedCase(text: string): string {
		return text.replace(/\w\S*/g, (word) => {
			return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
		});
	}

	lowerCase(text: string): string {
		return text.toLowerCase();
	}

	sentenceCase(text: string): string {
		return text.replace(/[A-Za-z][^.!?]*/g, function(match) {
			const firstChar = match.charAt(0).toUpperCase();
			const restOfStr = match.substr(1).toLowerCase();
			return firstChar + restOfStr;
		});
	}
}