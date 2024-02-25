import jquery from 'jquery';

export class TagsFoundation
{
	constructor ()
	{
		this.content = jquery(document.createElement('main'));

		this.header = jquery(document.createElement('header'))
			.addClass('header_container')
			.addClass('flex');

		this.page = jquery(document.createElement('div'))
			.append(this.header)
			.append(this.content);

		this.body = jquery(document.body)
			.addClass('remove_indents')
			.append(this.page);
	}
}
