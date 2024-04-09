
/**
 * @typedef { import('jquery') } jQuery
 */

import { PartConstructor } from '../parts/PartConstructor.js';


/**
 * @abstract
 */
export class PageFoundation extends PartConstructor
{
	constructor ()
	{
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
