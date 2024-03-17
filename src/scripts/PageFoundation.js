import jQuery from 'jquery';

/**
 * @abstract
 */

export class PageFoundation
{
	constructor ()
	{
		this.container = jQuery(document.createElement('article'))
			.addClass('page_container')
			.hide();
	}

	/**
	 * @returns {JQuery<HTMLElement>}
	 */
	getContainer ()
	{
		return this.container;
	}

	show ()
	{
		this.container.show();
	}

	hide ()
	{
		this.container.hide();
	}
}
