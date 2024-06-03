
/**
 * @typedef { import('../../memory/phrases/TranslatedPhrases').TranslatedPhrases } TranslatedPhrases
 */

import { FlashCard } from '../../templates/flashcards/FlashCard.js';
import { FlashCards } from '../../templates/flashcards/FlashCards.js';

import { PageFoundation } from '../PageFoundation.mjs';


export class MemorizePage extends PageFoundation
{
	/**
	 * @private
	 * @type {TranslatedPhrases}
	 */
	_translated;

	/**
	 * @private
	 * @type {FlashCards}
	 */
	_flashcards;

	/**
	 * @param {TranslatedPhrases} translated
	 */
	async initialize (translated)
	{
		this._translated = translated;
		this._flashcards = new FlashCards();

		this.container.append(this._flashcards.container);

		translated.on(translated.EVENT_REFRESH, () => this.refresh());
		this.refresh();
	}

	async refresh ()
	{
		this._flashcards.reset();

		for (const [ english, russian ] of this._translated.dictionary)
		{
			this._flashcards.regiter(new FlashCard({
				frontHTML: english,
				backHTML: russian
			}));
		}

		this._flashcards.show();
	}
}
