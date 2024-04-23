
/**
 * @typedef { import('jquery') } jQuery
 * 
 * @typedef { import('./FlashCard').FlashCard } FlashCard
 */


/**
 * @see https://github.com/ABSanthosh/react-quizlet-flashcard/tree/master
 */
export class FlashCards
{
	/**
	 * @private
	 * @type {JQuery<HTMLElement>}
	 */
	_container_collection;

	/**
	 * @private
	 * @type {JQuery<HTMLElement>}
	 */
	_container_position;

	/**
	 * @private
	 * @type {JQuery<HTMLElement>}
	 */
	_container_next;

	/**
	 * @private
	 * @type {JQuery<HTMLElement>}
	 */
	_container_back;

	/**
	 * @private
	 * @type {JQuery<HTMLElement>}
	 */
	_container_management;

	/**
	 * @private
	 * @type {JQuery<HTMLElement>}
	 */
	_container;

	/**
	 * @private
	 * @type {FlashCard[]}
	 */
	_collection;

	/**
	 * @private
	 * @type {number}
	 */
	_position;

	/**
	 * @param {FlashCard[]} collection
	 */
	constructor (collection)
	{
		this._container_collection = jQuery(document.createElement('article'))
			.addClass('collection');

		this._container_position = jQuery(document.createElement('span'))
			.addClass('px-2')
			.text('<CALC> / <CALC>');

		this._container_next = jQuery(document.createElement('span'))
			.addClass('px-2')
			.text('>')
			.on('click', () => this.next());

		this._container_back = jQuery(document.createElement('span'))
			.addClass('px-2')
			.text('<')
			.on('click', () => this.back());

		this._container_management = jQuery(document.createElement('article'))
			.addClass('management')
			.addClass('text-center')
			.append(this._container_back)
			.append(this._container_position)
			.append(this._container_next);

		this._container = jQuery(document.createElement('section'))
			.attr('style', '--bs-box-shadow-sm: 0 0 1rem 1rem #eee')
			.addClass('flashcards')
			.addClass('m-4')
			.append(this._container_collection)
			.append(this._container_management);

		this._collection = [];
		this._position   = 0;

		for (const flashcard of collection)
		{
			this.regiter(flashcard);
		}

		this.show();
	}

	// ===== ===== ===== ===== =====

	get collection ()
	{
		return this._collection;
	}

	get container ()
	{
		return this._container;
	}

	get position ()
	{
		return this._position;
	}

	// ===== ===== ===== ===== =====

	/**
	 * @param {FlashCard} flashcard
	 */
	regiter (flashcard)
	{
		this._container_collection.append(flashcard.container);
		this.collection.push(flashcard);
	}

	show ()
	{
		this._container_position.text(this.position + ' / ' + (this.collection.length - 1));

		this.collection.forEach((flashcard, index) => index === this.position
			? flashcard.container.show()
			: flashcard.container.hide()
		);
	}

	/**
	 * @param {number} offset
	 */
	move (offset)
	{
		this._position += offset;

		this._position = Math.max(this.position, 0);
		this._position = Math.min(this.position, this.collection.length - 1);

		this.show();
	}

	next ()
	{
		this.move(1);
	}

	back ()
	{
		this.move(-1);
	}
}
