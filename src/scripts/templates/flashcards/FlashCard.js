
/**
 * @typedef { import('jquery') } jQuery
 * 
 * @typedef { import('./FlashCardOptions').FlashCardOptions } FlashCardOptions
 */


export class FlashCard
{
	/**
	 * @private
	 * @type {JQuery<HTMLElement>}
	 */
	_container_front;

	/**
	 * @private
	 * @type {JQuery<HTMLElement>}
	 */
	_container_back;

	/**
	 * @private
	 * @type {JQuery<HTMLElement>}
	 */
	_container;

	/**
	 * @private
	 * @type {FlashCardOptions}
	 */
	_options;

	/**
	 * @param {FlashCardOptions} options
	 */
	constructor (options)
	{
		this._container_front = jQuery(document.createElement('article'))
			.addClass('front')
			.show();

		this._container_back = jQuery(document.createElement('article'))
			.addClass('back')
			.hide();

		this._container = jQuery(document.createElement('section'))
			.addClass('flashcard')

			.addClass('m-2')
			.addClass('p-5')

			.addClass('rounded-4')
			.addClass('shadow-sm')

			.addClass('fs-3')
			.addClass('text-center')

			.append(this._container_front)
			.append(this._container_back)

			.on('click', () => this.toggle())

			.hide();

		this.settings(options);
	}

	get container ()
	{
		return this._container;
	}

	/**
	 * @param {FlashCardOptions} options
	 */
	settings (options)
	{
		this._container_front.html(options.frontHTML);
		this._container_back.html(options.backHTML);

		this._options = options;
	}

	toggle ()
	{
		this._container_front.toggle();
		this._container_back.toggle();
	}
}
