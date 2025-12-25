
import { InitializerInterface } from '../plugins/initializer/InitializerInterface.mjs';


/**
 * @abstract
 */
export class PageFoundation extends InitializerInterface
{
	constructor ()
	{
		super();

		this.tag_page = jQuery(document.createElement('page'))
			.addClass('h-100')
			.hide();
	}

	show ()
	{
		this.tag_page.show();
	}

	hide ()
	{
		this.tag_page.hide();
	}
}
