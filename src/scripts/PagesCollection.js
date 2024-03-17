
/**
 * @typedef { import('./PageFoundation').PageFoundation } PageFoundation
 * 
 * @typedef { import('./parts/sidebar/Sidebar').Sidebar } Sidebar
 * @typedef { import('./parts/content/Content').Content } Content
 */

export class PagesCollection
{
	/**
	 * @param {Sidebar} sidebar
	 * @param {Content} content
	 */
	constructor (sidebar, content)
	{
		this.sidebar = sidebar;
		this.content = content;

		/** @type {PageFoundation[]} */
		this.collection = [];
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
	 * @param { { name: string, page: PageFoundation }[] } categories
	 */
	register (title, categories)
	{
		const _self = this;

		this.sidebar.register(title, categories.map(function (category)
		{
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
