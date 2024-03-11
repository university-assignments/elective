import jQuery from 'jquery';

import { PageFoundation } from './PageFoundation.js';

export class PagesCollection
{
	constructor ()
	{
		this.tag_header_navigation = jQuery(document.createElement('ul'))
			.addClass('nav')
			.addClass('col-12')
			.addClass('col-lg-auto')
			.addClass('my-2')
			.addClass('justify-content-center')
			.addClass('my-md-0')
			.addClass('text-small');

		this.tag_header_container = jQuery(document.createElement('div'))
			.addClass('d-flex')
			.addClass('flex-wrap')
			.addClass('align-items-center')
			.addClass('justify-content-center')
			.addClass('justify-content-lg-start')
			.append(`
				<a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
					<svg class="svg_icon me-2" width="40" height="32" role="img" aria-label="Bootstrap">
						<use xlink:href="#bootstrap"></use>
					</svg>

					<h4>ЮУрГУ @ Факультатив</h4>
				</a>
			`)
			.append(this.tag_header_navigation);

		this.tag_header = jQuery(document.createElement('div'))
			.addClass('container')
			.append(this.tag_header_container);

		this.tag_content = jQuery(document.createElement('section'));

		/** @type {PageFoundation[]} */
		this.collection = [];
	}

	/**
	 * @param {PageFoundation} current
	 */
	show (current)
	{
		this.collection.forEach(function (page)
		{
			page === current
				? page.show()
				: page.hide();
		});
	}

	/**
	 * @param {PageFoundation} page
	 */
	register (page)
	{
		const identifier = page.getIdentifier();
		const container  = page.getContainer();

		identifier.on('click', () => this.show(page));

		this.tag_header_navigation.append(identifier);
		this.tag_content.append(container);

		this.collection.push(page);
	}
}
