import jQuery from 'jquery';

/**
 * @abstract
 */
export class PageFoundation
{
	/**
	 * @param {string} title
	 */
	constructor (title)
	{
		this.identifier = jQuery(document.createElement('article'))
			.addClass('page_identifier')
			.text(title);

		this.container = jQuery(document.createElement('article'))
			.addClass('page_container')
			.hide();
	}

	/**
	 * @returns {JQuery<HTMLElement>}
	 */
	getIdentifier ()
	{
		return this.identifier;
	}

	/**
	 * @returns {JQuery<HTMLElement>}
	 */
	getContainer ()
	{
		return this.container;
	}
}
