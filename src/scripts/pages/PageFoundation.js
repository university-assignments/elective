
/**
 * @typedef { import('jquery') } jQuery
 */


/**
 * @abstract
 */
export class PageFoundation
{
	constructor ()
	{
		this.initialized = false;

		this.container = jQuery(document.createElement('article'))
			.addClass('page_container')
			.hide();
	}

	/**
	 * @abstract
	 */
	async initialize ()
	{
		throw new Error('override');
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
