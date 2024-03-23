import { Grid } from 'gridjs';
import { Chart, registerables } from 'chart.js';
import { Fancybox } from 'fancyappsui';

Chart.register(...registerables);

window.Grid     = Grid;
window.Chart    = Chart;
window.Fancybox = Fancybox;

// ===== ===== ===== ===== =====
// various
// ===== ===== ===== ===== =====

import { QueryOptions } from './memory/QueryOptions.js';
import { UserImport } from './memory/users/UserImport.js';

// ===== ===== ===== ===== =====
// import
// ===== ===== ===== ===== =====

import { import_file_auto } from './import/auto.js';

// ===== ===== ===== ===== =====
// pages
// ===== ===== ===== ===== =====

import { PagesCollection } from './PagesCollection.js';

import { Sidebar } from './parts/sidebar/Sidebar.js';
import { Content } from './parts/content/Content.js';

// ===== ===== ===== ===== =====
// pages
// ===== ===== ===== ===== =====

import { UsersPage } from './pages/users/UsersPage.js';
import { PhrasesPage } from './pages/users/PhrasesPage.js';
import { QuantityPage } from './pages/users/QuantityPage.js';

import { CounterPage } from './pages/selection/CounterPage.js';
import { SelectPage } from './pages/selection/SelectPage.js';

import { UsersSettingsPage } from './pages/settings/UsersSettingsPage.js';
import { ImportFilesPage } from './pages/settings/ImportFilesPage.js';

// ===== ===== ===== ===== =====
// main
// ===== ===== ===== ===== =====

import { TagsFoundation } from './display/TagsFoundation.js';
import { TagPopup } from './display/TagPopup.js';

window.main = new class
{
	constructor ()
	{
		this._initialize();
	}

	async _initialize ()
	{
		await this._users();

		// await this._parts();
		// this._pages();
		// this._popup();
		// this._tags();
		// this._events();
	}

	async _users ()
	{
		this.options = new QueryOptions();
		this.users   = new UserImport();

		// пользователи
		// Map<пользователь, фраза[]>
		if (this.options.phrases.length > 0)
		{
			this.users.importPhrases(
				await import_file_auto(this.options.phrases, 'left')
			);
		}

		// выделение
		// List<Map<фраза, boolean>>
		if (this.options.selection.length > 0)
		{
			this.users.importSurvey(
				await import_file_auto(this.options.selection, 'top-left')
			);
		}

		// теги
		if (this.options.tags.length > 0)
		{
			this.data_tags.importFile(this.options.tags);
		}

		// TODO...
	}

	async _parts ()
	{
		this.sidebar = new Sidebar();
		this.content = new Content();

		await this.sidebar.initialize();
		await this.content.initialize();
	}

	_pages ()
	{
		this.pages = new PagesCollection(
			this.sidebar,
			this.content
		);

		// users
		{
			this.page_users    = new UsersPage(this.users);
			this.page_phrases  = new PhrasesPage(this.users);
			this.page_quantity = new QuantityPage(this.users);

			this.pages.register('users', [
				{
					name: 'users',
					page: this.page_users
				},
				{
					name: 'phrases',
					page: this.page_phrases
				},
				{
					name: 'quantity',
					page: this.page_quantity
				}
			]);
		}

		// selection
		{
			this.page_counter = new CounterPage(this.selection, 'check-key');
			this.page_tags    = new CounterPage(this.data_tags, 'value');
			this.page_select  = new SelectPage(this.selection, this.data_tags);

			this.pages.register('selection', [
				{
					name: 'counter',
					page: this.page_counter
				},
				{
					name: 'tags',
					page: this.page_tags
				},
				{
					name: 'select',
					page: this.page_select
				}
			]);
		}

		// settings
		{
			this.page_settings_users = new UsersSettingsPage(this.users);
			this.page_import_files   = new ImportFilesPage();

			this.pages.register('settings', [
				{
					name: 'users',
					page: this.page_settings_users
				},
				{
					name: 'import files',
					page: this.page_import_files
				}
			]);
		}
	}

	_popup ()
	{
		this.popup = new TagPopup();
	}

	_tags ()
	{
		this.tags = new TagsFoundation();

		this.tags.page.append(this.sidebar.tag_sidebar);
		this.tags.page.append(this.content.tag_content);

		this.tags.background.append(this.popup.tag_base);
	}

	/**
	 * TODO: Убрать это недоразумение
	 */
	_events ()
	{
		this.users.listeners.trigger('refresh');
		this.selection.listeners.trigger('refresh');
		this.data_tags.listeners.trigger('refresh');
	}
};
