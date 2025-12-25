import jQuery from 'jquery';

export class TagsFoundation
{
	constructor ()
	{
		this.background = jQuery(document.createElement('div'))
			.addClass('background');

		this.page = jQuery(document.createElement('div'))
			.attr('id', 'page')

			.addClass('flex-row')
			.addClass('flex');

		this.body = jQuery(document.body)
			.append(this.background)
			.append(this.page);
	}
}
