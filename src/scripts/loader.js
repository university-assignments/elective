import jQuery from 'jquery';
import { Grid } from 'gridjs';
import { Chart, registerables } from 'chart.js';
import { Fancybox } from 'fancyappsui';

Chart.register(...registerables);

window.jQuery   = jQuery;
window.Grid     = Grid;
window.Chart    = Chart;
window.Fancybox = Fancybox;

// ===== ===== ===== ===== =====
// various
// ===== ===== ===== ===== =====

import { QueryOptions } from './memory/QueryOptions.js';
import { UsersCollection } from './memory/users/UsersCollection.js';
import { SelectionCollection } from './memory/selection/SelectionCollection.js';

// ===== ===== ===== ===== =====
// pages
// ===== ===== ===== ===== =====

import { PagesCollection } from './PagesCollection.js';

// ===== ===== ===== ===== =====
// pages
// ===== ===== ===== ===== =====

import { UsersPage } from './pages/users/UsersPage.js';
import { PhrasesPage } from './pages/users/PhrasesPage.js';
import { QuantityPage } from './pages/users/QuantityPage.js';

import { SelectionPage } from './pages/selection/SelectionPage.js';

import { SettingsPage } from './pages/SettingsPage.js';

// ===== ===== ===== ===== =====
// main
// ===== ===== ===== ===== =====

import { TagsFoundation } from './display/TagsFoundation.js';
import { TagPopup } from './display/TagPopup.js';

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
		this.options = new QueryOptions();

		// пользователи
		// Map<пользователь, фраза[]>
		if (this.options.users.length > 0)
		{
			this.users = new UsersCollection();
			this.users.importFile('storage/' + this.options.users + '.json');

			return;
		}

		// выделение
		// List<Map<фраза, boolean>>
		if (this.options.selection.length > 0)
		{
			this.selection = new SelectionCollection();
			this.selection.importFile('storage/' + this.options.selection + '.json');

			return;
		}

		// TODO...
	}

	_pages ()
	{
		this.pages = new PagesCollection();

		// users
		if (typeof this.users === 'object')
		{
			this.page_users    = new UsersPage(this.users);
			this.page_phrases  = new PhrasesPage(this.users);
			this.page_quantity = new QuantityPage(this.users);

			this.pages.register(this.page_users);
			this.pages.register(this.page_phrases);
			this.pages.register(this.page_quantity);
		}

		// selection
		if (typeof this.selection === 'object')
		{
			this.page_selection = new SelectionPage(this.selection);

			this.pages.register(this.page_selection);
		}

		// general
		{
			this.page_settings = new SettingsPage(this.users);

			this.pages.register(this.page_settings);
		}
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
