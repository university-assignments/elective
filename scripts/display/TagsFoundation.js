import jQuery from 'jquery';

export class TagsFoundation
{
	constructor ()
	{
		this.content = jQuery(document.createElement('main'))
			.addClass('main_container');

		this.header = jQuery(document.createElement('header'))
			.addClass('header_container')
			.addClass('flex');

		this.background = jQuery(document.createElement('div'))
			.addClass('background');

		this.page = jQuery(document.createElement('div'))
			.append(this.header)
			.append(this.content)
			.append(this.background);

		this.body = jQuery(document.body)
			.addClass('remove_indents')
			.append(this.page);
	}
}
