
import { FlashCard } from '../../templates/flashcards/FlashCard.js';
import { FlashCards } from '../../templates/flashcards/FlashCards.js';

import { PageFoundation } from '../PageFoundation.js';


export class MemorizePage extends PageFoundation
{
	/**
	 * @private
	 * @type {FlashCard[]}
	 */
	_flashcards_collection;

	/**
	 * @private
	 * @type {FlashCards}
	 */
	_flashcards;

	async initialize ()
	{
		this._flashcards_collection = [
			new FlashCard({
				frontHTML: 'hello 1',
				backHTML: 'world 1'
			}),

			new FlashCard({
				frontHTML: 'hello 2',
				backHTML: 'world 2'
			}),

			new FlashCard({
				frontHTML: 'hello 3',
				backHTML: 'world 3'
			})
		];

		this._flashcards = new FlashCards(this._flashcards_collection);

		this.container.append(this._flashcards.container);
	}
}
