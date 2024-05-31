import jQuery from 'jquery';

export class TagsFoundation
{
	constructor ()
	{
		this.background = jQuery(document.createElement('div'))
			.addClass('background');

		this.page = jQuery(document.createElement('div'))
			.attr('id', 'page')

			.addClass('d-flex')
			.addClass('flex-column')
			.addClass('flex-md-row')

			.addClass('gap-2')
			.addClass('p-2');

		this.body = jQuery(document.body)
			.append(this.background)
			.append(this.page);
	}
}
