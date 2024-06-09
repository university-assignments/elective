
/**
 * @typedef { import('../plugins/invoker/Invoker.mjs').Invoker } Invoker
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

import { DatabasePage } from '../pages/di/DatabasePage.mjs';
import { FilesPage } from '../pages/di/FilesPage.mjs';

import { PagesCollection } from '../pages/PagesCollection.mjs';


export class Routers
{
	/**
	 * @param {Invoker} invoker
	 * @param {Sidebar} sidebar
	 * @param {Content} content
	 */
	static collection (invoker, sidebar, content)
	{
		const pages = new PagesCollection(
			invoker,
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
				prefix: 'DEV',
				title: 'dependencies',

				pages: [
					{
						instance: DatabasePage,
						name: 'database'
					},
					{
						instance: FilesPage,
						name: 'files'
					}
				]
			}
		]);

		return pages;
	}
}
