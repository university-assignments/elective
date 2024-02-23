import jquery from 'https://cdn.jsdelivr.net/npm/jquery/+esm';

// ===== ===== ===== ===== =====
// various
// ===== ===== ===== ===== =====

class QueryOptions
{
	/**
	 * @param {string} search
	 */
	constructor (search = window.location.search)
	{
		this.options = new URLSearchParams(search);

		this.file = this.options.has('file')
			? this.options.get('file')
			: '';
	}
}

class UsersCollection
{
	constructor ()
	{
		/** @type {Map<string, string[]>} */
		this.collection = new Map();
	}

	/**
	 * @param {{[key: string]: string[]}} data
	 */
	import_data (data)
	{
		jquery.each(data, (user, phrases) => this.collection.set(user, phrases));
	}

	/**
	 * @param {string} address
	 */
	import_file (address)
	{
		jquery.getJSON(address, data => this.import_data(data));
	}
}

// ===== ===== ===== ===== =====
// pages
// ===== ===== ===== ===== =====

class PageFoundation
{
	/**
	 * @abstract
	 * @returns {HTMLElement}
	 */
	getIdentifier ()
	{
		throw new Error();
	}

	/**
	 * @abstract
	 * @returns {HTMLElement}
	 */
	getContainer ()
	{
		throw new Error();
	}
}

class PagesCollection
{
	constructor ()
	{
		this.tag_header = jquery(document.createElement('section'))
			.addClass('flex');

		this.tag_content = jquery(document.createElement('section'));
	}

	/**
	 * @param {PageFoundation} page
	 */
	register (page)
	{
		const identifier = page.getIdentifier();
		const container  = page.getContainer();

		this.tag_header.append(identifier);
		this.tag_content.append(container);
	}
}

// ===== ===== ===== ===== =====
// pages
// ===== ===== ===== ===== =====

class UsersPage extends PageFoundation
{
	/**
	 * @param {UsersCollection} users
	 */
	constructor (users)
	{
		super();

		this.users = users;

		this.identifier = jquery(document.createElement('article'))
			.addClass('page_identifier')
			.text('users');

		this.container = jquery(document.createElement('article'))
			.addClass('page_container')
			.hide();
	}

	/**
	 * @override
	 */
	getIdentifier ()
	{
		return this.identifier;
	}

	/**
	 * @override
	 */
	getContainer ()
	{
		return this.container;
	}
}

// ===== ===== ===== ===== =====
// main
// ===== ===== ===== ===== =====

class TagsFoundation
{
	constructor ()
	{
		this.content = jquery(document.createElement('main'));

		this.header = jquery(document.createElement('header'))
			.addClass('header_container')
			.addClass('flex');

		this.page = jquery(document.createElement('div'))
			.append(this.header)
			.append(this.content);

		this.body = jquery(document.body)
			.addClass('remove_indents')
			.append(this.page);
	}
}

window.main = new class
{
	constructor ()
	{
		this._users();
		this._pages();
		this._tags();
	}

	_users ()
	{
		this.users   = new UsersCollection();
		this.options = new QueryOptions();

		if (this.options.file.length > 0)
		{
			this.users.import_file(this.options.file);
		}
	}

	_pages ()
	{
		this.pages = new PagesCollection();

		this.pages.register(new UsersPage(this.users));
	}

	_tags ()
	{
		this.tags = new TagsFoundation();

		this.tags.header.append(this.pages.tag_header);
		this.tags.content.append(this.pages.tag_content);
	}
};
