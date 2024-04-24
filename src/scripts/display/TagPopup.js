import jQuery from 'jquery';

export class TagPopup
{
	constructor ()
	{
		this.tag_base = jQuery(document.createElement('section'))
			.addClass('popup')
			.append(`<article id="list_user"><div id="list_user_array"></div></article>`);
	}
}
