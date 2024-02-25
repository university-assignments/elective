
// ===== ===== ===== ===== =====
// various
// ===== ===== ===== ===== =====

import { QueryOptions } from './QueryOptions.js';
import { UsersCollection } from './UsersCollection.js';

// ===== ===== ===== ===== =====
// pages
// ===== ===== ===== ===== =====

import { PagesCollection } from './PagesCollection.js';

// ===== ===== ===== ===== =====
// pages
// ===== ===== ===== ===== =====

import { UsersPage } from './pages/UsersPage.js';
import { PhrasesPage } from './pages/PhrasesPage.js';

// ===== ===== ===== ===== =====
// main
// ===== ===== ===== ===== =====

import { TagsFoundation } from './TagsFoundation.js';

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
			this.users.importFile(this.options.file);
		}
	}

	_pages ()
	{
		this.pages = new PagesCollection();

		this.pages.register(new UsersPage(this.users));
		this.pages.register(new PhrasesPage(this.users));
	}

	_tags ()
	{
		this.tags = new TagsFoundation();

		this.tags.header.append(this.pages.tag_header);
		this.tags.content.append(this.pages.tag_content);
	}
};
