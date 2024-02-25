import jQuery from 'jquery';

export class TagsFoundation
{
	constructor ()
	{
		this.content = jQuery(document.createElement('main'));

		this.header = jQuery(document.createElement('header'))
			.addClass('header_container')
			.addClass('flex');

		this.page = jQuery(document.createElement('div'))
			.append(this.header)
			.append(this.content);

		this.body = jQuery(document.body)
			.addClass('remove_indents')
			.append(this.page);
	}
}
