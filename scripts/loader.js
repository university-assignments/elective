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

import { QueryOptions } from './memory/QueryOptions.js';
import { UsersCollection } from './memory/UsersCollection.js';

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

import { TagsFoundation } from './display/TagsFoundation.js';
import { TagPopup } from './display/TagPopup.js';
import { QuantityPage } from './pages/QuantityPage.js';
import { SettingsPage } from './pages/SettingsPage.js';

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
			this.users.importFile('/storage/' + this.options.file + '.json');
		}
	}

	_pages ()
	{
		this.page_users    = new UsersPage(this.users);
		this.page_phrases  = new PhrasesPage(this.users);
		this.page_quantity = new QuantityPage(this.users);
		this.page_settings = new SettingsPage(this.users);

		this.pages = new PagesCollection();
		this.pages.register(this.page_users);
		this.pages.register(this.page_phrases);
		this.pages.register(this.page_quantity);
		this.pages.register(this.page_settings);
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
