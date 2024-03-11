import jQuery from 'jquery';

/**
 * @abstract
 */
export class PageFoundation
{
	/**
	 * @param {string} icon
	 * @param {string} title
	 */
	constructor (icon, title)
	{
		this.identifier_title = jQuery(document.createElement('span'))
			.text(title);

		this.identifier_link = jQuery(document.createElement('a'))
			.addClass('text-white')
			.addClass('nav-link')
			.append(`
				<svg class="svg_icon d-block mx-auto mb-1" width="24" height="24">
					<use xlink:href="#${icon}"></use>
				</svg>
			`)
			.append(this.identifier_title);

		this.identifier = jQuery(document.createElement('li'))
			.addClass('page_identifier')
			.append(this.identifier_link);

		this.container = jQuery(document.createElement('article'))
			.addClass('page_container')
			.hide();
	}

	/**
	 * @returns {JQuery<HTMLElement>}
	 */
	getIdentifier ()
	{
		return this.identifier;
	}

	/**
	 * @returns {JQuery<HTMLElement>}
	 */
	getContainer ()
	{
		return this.container;
	}

	show ()
	{
		this.identifier_link.addClass('text-secondary');
		this.identifier_link.removeClass('text-white');

		this.container.show();
	}

	hide ()
	{
		this.identifier_link.addClass('text-white');
		this.identifier_link.removeClass('text-secondary');

		this.container.hide();
	}
}
