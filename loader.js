import jquery from 'https://cdn.jsdelivr.net/npm/jquery/+esm';

// ===== ===== ===== ===== =====
// menu
// ===== ===== ===== ===== =====

class MenuConstructor
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

class MenuCollection
{
	constructor ()
	{
		this.tag_header  = jquery(document.createElement('section'));
		this.tag_content = jquery(document.createElement('section'));
	}

	/**
	 * @param {MenuConstructor} menu
	 */
	register (menu)
	{
		const identifier = menu.getIdentifier();
		const container  = menu.getContainer();

		this.tag_header.append(identifier);
		this.tag_content.append(container);
	}
}

// ===== ===== ===== ===== =====
// main
// ===== ===== ===== ===== =====

window.main = new class
{
	constructor ()
	{
		this._menu();
		this._tags();
	}

	_menu ()
	{
		this.menu = new MenuCollection();
	}

	_tags ()
	{
		this.tag_content = jquery(document.createElement('main'))
			.append(this.menu.tag_content);

		this.tag_header = jquery(document.createElement('header'))
			.append(this.menu.tag_header);

		this.tag_page = jquery(document.createElement('div'))
			.append(this.tag_header)
			.append(this.tag_content);

		this.tag_body = jquery(document.body)
			.append(this.tag_page);
	}
};
