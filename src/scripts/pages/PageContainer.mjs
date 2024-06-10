
import { PageFoundation } from './PageFoundation.mjs';


export class PageContainer extends PageFoundation
{
	constructor ()
	{
		super();

		this.tag_container = jQuery(document.createElement('div'))
			.addClass('container')
			.addClass('p-2');

		this.tag_page
			.append(this.tag_container);
	}
}
