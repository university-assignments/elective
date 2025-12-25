import jQuery from 'jquery';
import Mustache from 'mustache';

import { PartConstructor } from '../PartConstructor.js';

export class Sidebar extends PartConstructor
{
	async initialize ()
	{
		this.template_sidebar    = await this.template('./scripts/parts/sidebar/sidebar.mst.html');
		this.template_navigation = await this.template('./scripts/parts/sidebar/navigation.mst.html');

		this.tag_sidebar    = jQuery(this.template_sidebar);
		this.tag_navigation = this.tag_sidebar.find('#navigation');
	}

	/**
	 * @param {string} title
	 * @param { { category: string, clicking: Function }[] } categories
	 */
	register (title, categories)
	{
		const identifier = 'show_identifier_' + Math.round(Math.random() * 10_000_000);

		const item = jQuery(Mustache.render(this.template_navigation, {
			show_identifier: identifier,

			title: title,
			categories: categories
		}));

		// ===== ===== ===== ===== =====
		// #events
		// ===== ===== ===== ===== =====

		const elements = item.find('.category').get();

		for (let offset = elements.length - 1; offset >= 0; offset--)
		{
			const offset_value = offset;

			elements[offset].addEventListener('click', function ()
			{
				categories[offset_value].clicking();
			});
		}

		// ===== ===== ===== ===== =====
		// /events
		// ===== ===== ===== ===== =====

		this.tag_navigation.append(item);
	}
}
