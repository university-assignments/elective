
/**
 * @typedef { import('./display/TagsFoundation.js').TagsFoundation } TagsFoundation
 * 
 * @typedef { import('./parts/sidebar/Sidebar').Sidebar } Sidebar
 * @typedef { import('./parts/content/Content').Content } Content
 */

// ===== ===== ===== ===== =====
// plugins
// ===== ===== ===== ===== =====

import { InitializerInterface } from './plugins/initializer/InitializerInterface.mjs';

// ===== ===== ===== ===== =====
// register
// ===== ===== ===== ===== =====

import { get_dependencies } from './configuration/get_dependencies.mjs';
import { Routers } from './configuration/Routers.js';
import { Importer } from './configuration/Importer.js';


export class Loader extends InitializerInterface
{
	async initialize ()
	{
		this.dependencies = await get_dependencies();
		this.invoker      = this.dependencies.singleton.invoker;

		this.pages = this.invoker.runMethod(Routers, 'collection');
		this.invoker.runMethod(this, '_tags');
		this.invoker.runMethod(Importer, 'files');
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
	}
};
