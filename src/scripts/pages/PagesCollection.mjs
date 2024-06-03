
/**
 * @typedef { import('../plugins/di/MethodsCaller').MethodsCaller } MethodsCaller
 * 
 * @typedef { import('./PageFoundation.mjs').PageFoundation } PageFoundation
 * @typedef { import('./PageOptions.mjs').PageOptions } PageOptions
 * 
 * @typedef { import('../parts/sidebar/Sidebar.mjs').Sidebar } Sidebar
 * @typedef { import('../parts/content/Content.mjs').Content } Content
 */


export class PagesCollection
{
	/**
	 * @private
	 * @type {MethodsCaller}
	 */
	initializer;

	/**
	 * @private
	 * @type {Sidebar}
	 */
	sidebar;

	/**
	 * @private
	 * @type {Content}
	 */
	content;

	/**
	 * @private
	 * @type {PageOptions[]}
	 */
	collection = [];

	/**
	 * @param {MethodsCaller} initializer
	 * @param {Sidebar} sidebar
	 * @param {Content} content
	 */
	constructor (initializer, sidebar, content)
	{
		this.initializer = initializer;
		this.sidebar     = sidebar;
		this.content     = content;
	}

	/**
	 * @param { PageFoundation } current
	 */
	show (current)
	{
		for (const { instance, options } of this.collection)
		{
			if (instance === current)
			{
				// создаем страницу только когда ее необходимо показать
				if (instance.initialized === false)
				{
					this.initializer.runMethod(instance, 'initialize', options);
					instance.initialized = true;
				}

				instance.show();
				continue;
			}

			instance.hide();
		}
	}

	/**
	 * @param {PageOptions} page
	 */
	registerPage (page)
	{
		// create instance
		page.instance = new page.instance();

		// register
		this.content.register(page.instance.container);
		this.collection.push(page);

		return {
			category: page.name,
			clicking: () => this.show(page.instance)
		};
	}

	/**
	 * @param { string } prefix
	 * @param { string } title
	 * @param { PageOptions[] } pages
	 */
	registerCategory (prefix, title, pages)
	{
		pages = pages.map(
			page => this.registerPage(page)
		);

		this.sidebar.register(prefix, title, pages);
	}

	/**
	 * @param { { prefix: string, title: string, pages: PageOptions[] }[] } categories
	 */
	register (categories)
	{
		for (const category of categories)
		{
			this.registerCategory(
				category.prefix,
				category.title,
				category.pages
			);
		}
	}
}
