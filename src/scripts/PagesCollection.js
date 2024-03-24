
/**
 * @typedef { import('./PageFoundation').PageFoundation } PageFoundation
 * 
 * @typedef { import('./memory/objects/FunctionsInitializer').FunctionsInitializer } FunctionsInitializer
 * 
 * @typedef { import('./parts/sidebar/Sidebar').Sidebar } Sidebar
 * @typedef { import('./parts/content/Content').Content } Content
 */


/**
 * @template { { name: string, page: PageFoundation, args: any[] } } PageOptions
 */
export class PagesCollection
{
	/**
	 * @private
	 * @type {FunctionsInitializer}
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
	 * @param {FunctionsInitializer} initializer
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
	 * @param {PageFoundation} current
	 */
	show (current)
	{
		const _self = this;

		this.collection.forEach(function (options)
		{
			const page = options.page;
			const args = options.args;

			if (page === current)
			{
				// создаем страницу только когда ее необходимо показать
				if (page.initialized === false)
				{
					_self.initializer.runFunction(page, 'initialize', args);
					page.initialized = true;
				}

				page.show();
			}
			else
			{
				page.hide();
			}
		});
	}

	/**
	 * @param {string} title
	 * @param {PageOptions[]} categories
	 */
	register (title, categories)
	{
		const _self = this;

		this.sidebar.register(title, categories.map(function (category)
		{
			// create page
			category.page = new category.page();

			// register
			_self.content.register(category.page.container);
			_self.collection.push(category);

			return {
				category: category.name,
				clicking: () => _self.show(category.page)
			};
		}));
	}
}
