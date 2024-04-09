
/**
 * @typedef { import('./memory/objects/MethodsCaller').MethodsCaller } MethodsCaller
 * 
 * @typedef { import('./memory/QueryOptions').QueryOptions } QueryOptions
 * 
 * @typedef { import('./memory/tags/TagsDictionary').TagsDictionary } TagsDictionary
 * @typedef { import('./memory/users/UserImport').UserImport } UserImport
 * 
 * @typedef { import('./parts/sidebar/Sidebar').Sidebar } Sidebar
 * @typedef { import('./parts/content/Content').Content } Content
 */

import { Grid } from 'gridjs';
import { Chart, registerables } from 'chart.js';
import { Fancybox } from 'fancyappsui';

Chart.register(...registerables);

window.Grid     = Grid;
window.Chart    = Chart;
window.Fancybox = Fancybox;

// ===== ===== ===== ===== =====
// import
// ===== ===== ===== ===== =====

import { import_file_auto } from './import/auto.js';

// ===== ===== ===== ===== =====
// pages
// ===== ===== ===== ===== =====

import { PagesCollection } from './pages/PagesCollection.js';

// ===== ===== ===== ===== =====
// register
// ===== ===== ===== ===== =====

import { get_objects } from './configuration/get_objects.js';
import { register_routers } from './configuration/register_routers.js';

// ===== ===== ===== ===== =====
// main
// ===== ===== ===== ===== =====

import { TagsFoundation } from './display/TagsFoundation.js';
import { TagPopup } from './display/TagPopup.js';


window.main = new class
{
	/**
	 * @type {MethodsCaller}
	 */
	initializer;

	constructor ()
	{
		this.objects     = get_objects();
		this.initializer = this.objects.get('MethodsCaller');

		this._initialize();
	}

	async _initialize ()
	{
		await this.initializer.runFunction(this, '_' + 'parts');

		this.initializer.runFunction(this, '_' + 'pages');
		this.initializer.runFunction(this, '_' + 'popup');
		this.initializer.runFunction(this, '_' + 'tags');

		await this.initializer.runFunction(this, '_' + 'import');
	}

	/**
	 * @param {Sidebar} sidebar
	 * @param {Content} content
	 */
	async _parts (sidebar, content)
	{
		await sidebar.initialize();
		await content.initialize();
	}

	/**
	 * @param {MethodsCaller} initializer
	 * @param {Sidebar} sidebar
	 * @param {Content} content
	 */
	_pages (initializer, sidebar, content)
	{
		this.pages = new PagesCollection(
			initializer,
			sidebar,
			content
		);

		register_routers(this.pages);
	}

	_popup ()
	{
		this.popup = new TagPopup();
	}

	/**
	 * @param {TagsFoundation} tags
	 * @param {Sidebar} sidebar
	 * @param {Content} content
	 */
	_tags (tags, sidebar, content)
	{
		tags.page.append(sidebar.tag_sidebar);
		tags.page.append(content.tag_content);

		tags.background.append(this.popup.tag_base);
	}

	/**
	 * @param {QueryOptions} options
	 * @param {TagsDictionary} tags
	 * @param {UserImport} users
	 */
	async _import (options, tags, users)
	{
		if (options.phrases.length > 0)
		{
			users.importPhrases(
				await import_file_auto(options.phrases, 'left')
			);
		}

		if (options.selection.length > 0)
		{
			users.importSurvey(
				await import_file_auto(options.selection, 'top-left')
			);
		}

		if (options.tags.length > 0)
		{
			tags.importFile(options.tags);
		}
	}
};
