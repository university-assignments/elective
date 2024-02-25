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

		/** @see https://learn.jquery.com/events/introduction-to-custom-events/ */
		this.listeners = jquery(document);
	}

	/**
	 * @param {string} user
	 */
	delete (user)
	{
		this.collection.delete(user);
		this.listeners.trigger('refresh');
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
		jquery.getJSON(address, data => this.import_data(data))
			.done(() => this.listeners.trigger('refresh'));
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

		/** @type {Map<HTMLElement, HTMLElement>} */
		this.collection = new Map();
	}

	/**
	 * @param {HTMLElement} tag
	 */
	show (tag)
	{
		this.collection.forEach(function (container, identifier)
		{
			identifier.is(tag)
				? container.show()
				: container.hide();
		});
	}

	/**
	 * @param {PageFoundation} page
	 */
	register (page)
	{
		const identifier = page.getIdentifier();
		const container  = page.getContainer();

		identifier.on('click', () => this.show(identifier));

		this.tag_header.append(identifier);
		this.tag_content.append(container);

		this.collection.set(identifier, container);
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

		this.users.listeners.on('refresh', () => this.refreshContent());
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

	/**
	 * @private
	 * 
	 * @param {string[]} phrases
	 * @param {string} user
	 */
	addUser (phrases, user)
	{
		const __icon_state = jquery(document.createElement('img'))
			.addClass('user_icon_state')
			.attr('src', './icons/left-2-svgrepo-com.svg')
			.attr('alt', 'state');

		const __action_state = jquery(document.createElement('article'))
			.addClass('user_action')
			.append(__icon_state);

		// ===== ===== ===== ===== =====

		const __icon_edit = jquery(document.createElement('img'))
			.attr('src', './icons/edit-svgrepo-com.svg')
			.attr('alt', 'edit');

		const __action_edit = jquery(document.createElement('article'))
			.addClass('user_action')
			.append(__icon_edit);

		// ===== ===== ===== ===== =====

		const __icon_delete = jquery(document.createElement('img'))
			.attr('src', './icons/delete-svgrepo-com.svg')
			.attr('alt', 'delete');

		const __action_delete = jquery(document.createElement('article'))
			.addClass('user_action')
			.append(__icon_delete);

		// ===== ===== ===== ===== =====

		const __actions = jquery(document.createElement('section'))
			.addClass('user_actions')
			.addClass('flex')
			.append(__action_edit)
			.append(__action_delete)
			.append(__action_state);

		const __name = jquery(document.createElement('span'))
			.addClass('user_name')
			.text(user);

		const __header = jquery(document.createElement('article'))
			.addClass('user_header')
			.addClass('flex')
			.append(__name)
			.append(__actions);

		// ===== ===== ===== ===== =====

		const __phrases = jquery(document.createElement('p'))
			.addClass('user_phrase')
			.addClass('remove_indents')
			.text(phrases.join(', '));

		const __content = jquery(document.createElement('article'))
			.addClass('user_content')
			.append(__phrases);

		// ===== ===== ===== ===== =====

		const __container = jquery(document.createElement('section'))
			.addClass('user')
			.addClass('hide')
			.append(__header)
			.append(__content);

		// TODO: доделать
		__action_edit.on('click', () => alert('не работает'));

		__action_delete.on('click', () => this.users.delete(user));
		__action_state.on('click', () => __container.toggleClass('hide'));

		// ===== ===== ===== ===== =====

		this.container.append(__container);
	}

	/**
	 * @private
	 */
	refreshContent ()
	{
		this.container.html('');
		this.users.collection.forEach((phrases, user) => this.addUser(phrases, user));
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
