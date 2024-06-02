
/**
 * @typedef { import('./memory/di/MethodsCaller.js').MethodsCaller } MethodsCaller
 * 
 * @typedef { import('./display/TagsFoundation.js').TagsFoundation } TagsFoundation
 * @typedef { import('./display/TagPopup.js').TagPopup } TagPopup
 * 
 * @typedef { import('./parts/sidebar/Sidebar').Sidebar } Sidebar
 * @typedef { import('./parts/content/Content').Content } Content
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


export class Loader extends InitializerInterface
{
	async initialize ()
	{
		this.di     = await get_di();
		this.caller = this.di.singleton.caller;

		this.caller.runMethod(this, '_pages');
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

	/**
	 * @param {TagsFoundation} tags
	 * @param {TagPopup} popup
	 * @param {Sidebar} sidebar
	 * @param {Content} content
	 */
	_tags (tags, popup, sidebar, content)
	{
		tags.page.append(sidebar.tag_sidebar);
		tags.page.append(content.tag_content);

		tags.background.append(popup.tag_base);
	}

	/**
	 * @param {MethodsCaller} caller
	 */
	async _import (caller)
	{
		await caller.runMethod(Importer, 'files');
	}
};
