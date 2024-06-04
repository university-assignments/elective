
/**
 * @typedef { import('../plugins/di/MethodsCaller').MethodsCaller } MethodsCaller
 * 
 * @typedef { import('../parts/sidebar/Sidebar.mjs').Sidebar } Sidebar
 * @typedef { import('../parts/content/Content.mjs').Content } Content
 */

import { UsersPage } from '../pages/users/UsersPage.js';

import { PhrasesPage } from '../pages/phrases/PhrasesPage.js';
import { QuantityPage } from '../pages/phrases/QuantityPage.js';
import { MemorizePage } from '../pages/phrases/MemorizePage.js';

import { CounterPage } from '../pages/selection/CounterPage.js';
import { SelectPage } from '../pages/selection/SelectPage.js';

import { ImportFilesPage } from '../pages/settings/import/ImportFilesPage.js';

import { DatabaseTablesPage } from '../pages/database/DatabaseTablesPage.mjs';

import { PagesCollection } from '../pages/PagesCollection.mjs';


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

		pages.register([
			{
				title: 'users',

				pages: [
					{
						instance: UsersPage,
						name: 'users'
					}
				]
			},

			{
				title: 'phrases',

				pages: [
					{
						instance: PhrasesPage,
						name: 'counter by phrases'
					},
					{
						instance: QuantityPage,
						name: 'counter by users'
					},
					{
						instance: MemorizePage,
						name: 'memorize'
					}
				]
			},

			{
				title: 'selection',

				pages: [
					{
						instance: CounterPage,
						options: [ 'check-key' ],

						name: 'counter'
					},
					{
						instance: CounterPage,
						options: [ 'value' ],

						name: 'tags'
					},
					{
						instance: SelectPage,
						name: 'select'
					}
				]
			},

			{
				title: 'settings',

				pages: [
					{
						instance: ImportFilesPage,
						name: 'import files'
					}
				]
			},

			{
				prefix: 'DEV',
				title: 'database',

				pages: [
					{
						instance: DatabaseTablesPage,
						name: 'tables'
					}
				]
			}
		]);

		return pages;
	}
}
