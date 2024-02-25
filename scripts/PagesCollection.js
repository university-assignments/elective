import jQuery from 'jquery';

import { PageFoundation } from './PageFoundation.js';

export class PagesCollection
{
	constructor ()
	{
		this.tag_header = jQuery(document.createElement('section'))
			.addClass('flex');

		this.tag_content = jQuery(document.createElement('section'));

		/** @type {Map<JQuery<HTMLElement>, JQuery<HTMLElement>>} */
		this.collection = new Map();
	}

	/**
	 * @param {HTMLElement} tag
	 */
	show (tag)
	{
		this.collection.forEach(function (container, identifier)
		{
			if (identifier.is(tag))
			{
				identifier.addClass('page_identifier_current');
				container.show();
			}
			else
			{
				identifier.removeClass('page_identifier_current');
				container.hide();
			}
		});
	}

	/**
	 * @param {PageFoundation} page
	 */
	register (page)
	{
		const identifier = page.getIdentifier();
		const container  = page.getContainer();

		identifier.on('click', () => this.show(identifier));

		this.tag_header.append(identifier);
		this.tag_content.append(container);

		this.collection.set(identifier, container);
	}
}
