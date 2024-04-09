
/**
 * @typedef { import('../PagesCollection.js').PagesCollection } PagesCollection
 */

import { UsersPage } from '../pages/users/UsersPage.js';
import { PhrasesPage } from '../pages/users/PhrasesPage.js';
import { QuantityPage } from '../pages/users/QuantityPage.js';

import { CounterPage } from '../pages/selection/CounterPage.js';
import { SelectPage } from '../pages/selection/SelectPage.js';

import { UsersSettingsPage } from '../pages/settings/UsersSettingsPage.js';
import { ImportFilesPage } from '../pages/settings/import/ImportFilesPage.js';


/**
 * @param {PagesCollection} pages
 */
export function register_routers (pages)
{
	pages.register('users', [
		{
			page: UsersPage,
			name: 'users'
		},
		{
			page: PhrasesPage,
			name: 'phrases'
		},
		{
			page: QuantityPage,
			name: 'quantity'
		}
	]);

	pages.register('selection', [
		{
			page: CounterPage,
			args: [ 'check-key' ],

			name: 'counter'
		},
		{
			page: CounterPage,
			args: [ 'value' ],

			name: 'tags'
		},
		{
			page: SelectPage,
			name: 'select'
		}
	]);

	pages.register('settings', [
		{
			page: UsersSettingsPage,
			name: 'users'
		},
		{
			page: ImportFilesPage,
			name: 'import files'
		}
	]);
}
