
/**
 * @typedef { import('../memory/objects/MethodsCaller').MethodsCaller } MethodsCaller
 * 
 * @typedef { import('../parts/sidebar/Sidebar').Sidebar } Sidebar
 * @typedef { import('../parts/content/Content').Content } Content
 */

import { UsersPage } from '../pages/users/UsersPage.js';
import { PhrasesPage } from '../pages/users/PhrasesPage.js';
import { QuantityPage } from '../pages/users/QuantityPage.js';

import { CounterPage } from '../pages/selection/CounterPage.js';
import { SelectPage } from '../pages/selection/SelectPage.js';

import { UsersSettingsPage } from '../pages/settings/UsersSettingsPage.js';
import { ImportFilesPage } from '../pages/settings/import/ImportFilesPage.js';

import { PagesCollection } from '../pages/PagesCollection.js';


export class Routers
{
	/**
	 * @param {MethodsCaller} caller
	 * @param {Sidebar} sidebar
	 * @param {Content} content
	 */
	static collection (caller, sidebar, content)
	{
		const pages = new PagesCollection(
			caller,
			sidebar,
			content
		);

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

		return pages;
	}
}
