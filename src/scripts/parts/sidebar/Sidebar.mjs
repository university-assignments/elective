
import Mustache from 'mustache';

import { InitializerInterface } from '../../plugins/initializer/InitializerInterface.mjs';

import { Files } from '../../plugins/files/Files.mjs';
import { FileMustache } from '../../plugins/files/html/FileMustache.mjs';


export class Sidebar extends InitializerInterface
{
	/**
	 * @param {Files} files
	 */
	async initialize (files)
	{
		this.template_sidebar = (await files.download(new FileMustache(
			'./scripts/parts/sidebar/sidebar.mst'
		))).data;

		this.template_navigation = (await files.download(new FileMustache(
			'./scripts/parts/sidebar/navigation.mst'
		))).data;

		this.tag_sidebar    = jQuery(this.template_sidebar);
		this.tag_navigation = this.tag_sidebar.find('#navigation');
	}

	/**
	 * @param { string } prefix
	 * @param { string } title
	 * @param { { category: string, clicking: Function }[] } categories
	 */
	register (prefix, title, categories)
	{
		const identifier = 'show_identifier_' + Math.round(Math.random() * 10_000_000);

		const item = jQuery(Mustache.render(this.template_navigation, {
			show_identifier: identifier,

			prefix: prefix,
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
