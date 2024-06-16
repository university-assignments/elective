
import { FlashCard } from '../../templates/flashcards/FlashCard.js';
import { FlashCards } from '../../templates/flashcards/FlashCards.js';

import { Phrases } from '../../tables/phrases/Phrases.mjs';

import { PageContainer } from '../PageContainer.mjs';


export class MemorizePage extends PageContainer
{
	/**
	 * @private
	 * @type { Phrases }
	 */
	_phrases;

	/**
	 * @private
	 * @type { FlashCards }
	 */
	_flashcards;

	/**
	 * @param { Phrases } phrases
	 */
	async initialize (phrases)
	{
		this._phrases = phrases;
		this._events  = phrases.events;

		// ===== ===== ===== ===== =====

		this._flashcards = new FlashCards();

		this.tag_container.append(this._flashcards.container);

		// ===== ===== ===== ===== =====

		this._events.on(this._events.EVENT_REFRESH, () => this.refresh());
		this.refresh();
	}

	async refresh ()
	{
		this._flashcards.reset();

		for (const phrase of this._phrases.getAll())
		{
			const english = phrase.english;
			const russian = phrase.russian;

			// перевод есть не у всех фраз.
			if (!english || !russian)
			{
				continue;
			}

			this._flashcards.regiter(new FlashCard({
				frontHTML: english,
				backHTML: russian
			}));
		}

		this._flashcards.show();
	}
}
