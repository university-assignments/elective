
import { PageFoundation } from './PageFoundation.mjs';


export class PageContainer extends PageFoundation
{
	constructor ()
	{
		this.tag_container = jQuery(document.createElement('div'))
			.addClass('container');
	}
}
