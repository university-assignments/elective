
/**
 * @typedef { import('./memory/QueryOptions.js').QueryOptions } QueryOptions
 * 
 * @typedef { import('./memory/tags/TagsDictionary').TagsDictionary } TagsDictionary
 * @typedef { import('./memory/users/UserImport.js').UserImport } UserImport
 * 
 * @typedef { import('./parts/sidebar/Sidebar.js').Sidebar } Sidebar
 * @typedef { import('./parts/content/Content.js').Content } Content
 */

import { Grid } from 'gridjs';
import { Chart, registerables } from 'chart.js';
import { Fancybox } from '@fancyapps/ui';

Chart.register(...registerables);

window.Grid     = Grid;
window.Chart    = Chart;
window.Fancybox = Fancybox;

// ===== ===== ===== ===== =====
// plugins
// ===== ===== ===== ===== =====

import { InitializerInterface } from './plugins/initializer/InitializerInterface.mjs';

// ===== ===== ===== ===== =====
// register
// ===== ===== ===== ===== =====

import { get_di } from './configuration/get_di.js';
import { Routers } from './configuration/Routers.js';
import { Importer } from './configuration/Importer.js';

import { MethodsCaller } from './memory/di/MethodsCaller.js';

// ===== ===== ===== ===== =====
// main
// ===== ===== ===== ===== =====

import { TagsFoundation } from './display/TagsFoundation.js';
import { TagPopup } from './display/TagPopup.js';


export class Loader extends InitializerInterface
{
	async initialize ()
	{
		this.di     = await get_di();
		this.caller = new MethodsCaller(this.di);

		this.caller.runMethod(this, '_pages');
		this.caller.runMethod(this, '_popup');
		this.caller.runMethod(this, '_tags');

		await this.caller.runMethod(this, '_import');
	}

	/**
	 * @param {MethodsCaller} caller
	 */
	_pages (caller)
	{
		this.pages = caller.runMethod(Routers, 'collection');
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
	 * @param {MethodsCaller} caller
	 */
	async _import (caller)
	{
		await caller.runMethod(Importer, 'files');
	}
};
