
/**
 * @typedef { import('jquery') } jQuery
 */

import { InitializerInterface } from '../plugins/initializer/InitializerInterface.mjs';


/**
 * @abstract
 */
export class PageFoundation extends InitializerInterface
{
	constructor ()
	{
		super();

		this.initialized = false;

		this.container = jQuery(document.createElement('article'))
			.addClass('page_container')
			.hide();
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
