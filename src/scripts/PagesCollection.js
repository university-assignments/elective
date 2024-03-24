
/**
 * @typedef { import('./PageFoundation').PageFoundation } PageFoundation
 * 
 * @typedef { import('./memory/objects/FunctionsInitializer').FunctionsInitializer } FunctionsInitializer
 * 
 * @typedef { import('./parts/sidebar/Sidebar').Sidebar } Sidebar
 * @typedef { import('./parts/content/Content').Content } Content
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
	 * @type {PageFoundation}
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
		this.collection.forEach(function (page)
		{
			page === current
				? page.show()
				: page.hide();
		});
	}

	/**
	 * @param {string} title
	 * @param { { name: string, page: PageFoundation, args: any[] }[] } categories
	 */
	register (title, categories)
	{
		const _self = this;

		this.sidebar.register(title, categories.map(function (category)
		{
			// create page
			category.page = _self.initializer.runClass(
				category.page,
				category.args
			);

			// register
			_self.content.register(category.page.getContainer());
			_self.collection.push(category.page);

			return {
				category: category.name,
				clicking: () => _self.show(category.page)
			};
		}));
	}
}
