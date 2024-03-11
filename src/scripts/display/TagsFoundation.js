import jQuery from 'jquery';

export class TagsFoundation
{
	constructor ()
	{
		this.content = jQuery(document.createElement('main'))
			.addClass('container');

		this.header = jQuery(document.createElement('header'))
			.addClass('px-3')
			.addClass('py-2')
			.addClass('bg-dark')
			.addClass('text-white');

		this.background = jQuery(document.createElement('div'))
			.addClass('background');

		this.page = jQuery(document.createElement('div'))
			.append(this.header)
			.append(this.content)
			.append(this.background);

		this.body = jQuery(document.body)
			.append(this.page);
	}
}
