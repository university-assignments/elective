import jquery from 'jquery';

import { PageFoundation } from './PageFoundation.js';

export class PagesCollection
{
	constructor ()
	{
		this.tag_header = jquery(document.createElement('section'))
			.addClass('flex');

		this.tag_content = jquery(document.createElement('section'));

		/** @type {Map<HTMLElement, HTMLElement>} */
		this.collection = new Map();
	}

	/**
	 * @param {HTMLElement} tag
	 */
	show (tag)
	{
		this.collection.forEach(function (container, identifier)
		{
			identifier.is(tag)
				? container.show()
				: container.hide();
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
