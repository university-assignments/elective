
/**
 * @typedef { import('../plugins/invoker/Invoker.mjs').Invoker } Invoker
 * 
 * @typedef { import('../parts/sidebar/Sidebar.mjs').Sidebar } Sidebar
 * @typedef { import('../parts/content/Content.mjs').Content } Content
 */

import { ProfilesPage } from '../pages/profiles/ProfilesPage.mjs';

import { PhrasesPage } from '../pages/phrases/PhrasesPage.js';
import { QuantityPage } from '../pages/phrases/QuantityPage.js';
import { MemorizePage } from '../pages/phrases/MemorizePage.js';

import { CounterPage } from '../pages/selection/CounterPage.js';
import { SelectPage } from '../pages/selection/SelectPage.js';

import { ExecutePage } from '../pages/dependencies/ExecutePage.mjs';
import { DatabasePage } from '../pages/dependencies/DatabasePage.mjs';
import { FilesPage } from '../pages/dependencies/FilesPage.mjs';

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
				title: 'profiles',

				pages: [
					{
						instance: ProfilesPage,
						name: 'collection'
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
						instance: CounterPage,
						options: [
							[ '#', 'profile_name', 'total' ],
							`
								SELECT name, COUNT(*) as total
								FROM profiles_phrases
								INNER JOIN profiles ON profiles.identifier = profiles_phrases.profile
								GROUP BY profile;
							`
						],

						name: 'counter by profiles'
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
						instance: ExecutePage,
						name: 'execute'
					},
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
