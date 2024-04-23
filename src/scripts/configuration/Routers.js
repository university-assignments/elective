
/**
 * @typedef { import('../memory/di/MethodsCaller.js').MethodsCaller } MethodsCaller
 * 
 * @typedef { import('../parts/sidebar/Sidebar').Sidebar } Sidebar
 * @typedef { import('../parts/content/Content').Content } Content
 */

import { UsersPage } from '../pages/users/UsersPage.js';

import { PhrasesPage } from '../pages/phrases/PhrasesPage.js';
import { QuantityPage } from '../pages/phrases/QuantityPage.js';
import { MemorizePage } from '../pages/phrases/MemorizePage.js';

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
		]);

		pages.register('phrases', [
			{
				page: PhrasesPage,
				name: 'counter by phrases'
			},
			{
				page: QuantityPage,
				name: 'counter by users'
			},
			{
				page: MemorizePage,
				name: 'memorize'
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
