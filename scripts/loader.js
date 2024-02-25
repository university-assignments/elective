import jQuery from 'jquery';
import { Grid } from 'gridjs';
import { Chart } from 'chartJs';
import { Fancybox } from 'fancyappsui';

window.jQuery   = jQuery;
window.Grid     = Grid;
window.Chart    = Chart;
window.Fancybox = Fancybox;

// ===== ===== ===== ===== =====
// various
// ===== ===== ===== ===== =====

import { QueryOptions } from './QueryOptions.js';
import { UsersCollection } from './UsersCollection.js';

Fancybox.bind('[data-fancybox]', {
	hideScrollbar: false
});

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
import { TagPopup } from './TagPopup.js';

window.main = new class
{
	constructor ()
	{
		this._users();
		this._pages();
		this._popup();
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
		this.page_users   = new UsersPage(this.users);
		this.page_phrases = new PhrasesPage(this.users);

		this.pages = new PagesCollection();
		this.pages.register(this.page_users);
		this.pages.register(this.page_phrases);
	}

	_popup ()
	{
		this.popup = new TagPopup();
	}

	_tags ()
	{
		this.tags = new TagsFoundation();

		this.tags.header.append(this.pages.tag_header);
		this.tags.content.append(this.pages.tag_content);

		this.tags.background.append(this.popup.tag_base);
	}
};
