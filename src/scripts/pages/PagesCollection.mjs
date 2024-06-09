
/**
 * @typedef { import('../plugins/invoker/Invoker.mjs').Invoker } Invoker
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
	 * @readonly
	 * @type { Invoker }
	 */
	invoker;

	/**
	 * @private
	 * @readonly
	 * @type { Sidebar }
	 */
	sidebar;

	/**
	 * @private
	 * @readonly
	 * @type { Content }
	 */
	content;

	/**
	 * @private
	 * @readonly
	 * @type { PageOptions[] }
	 */
	collection = [];

	/**
	 * @param { Invoker } invoker
	 * @param { Sidebar } sidebar
	 * @param { Content } content
	 * @param { boolean } debug
	 */
	constructor (invoker, sidebar, content, debug = false)
	{
		this.invoker = invoker;
		this.sidebar = sidebar;
		this.content = content;
		this.debug   = debug;
	}

	/**
	 * @param { PageFoundation } instance
	 */
	initializePage (instance, options)
	{
		if (instance.initialized)
		{
			return false;
		}

		this.invoker.runMethod(instance, 'initialize', options);
		instance.initialized = true;

		return true;
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
				this.initializePage(instance, options);

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

		if (this.debug)
		{
			this.initializePage(page.instance, page.options);
		}

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
