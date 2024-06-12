
/**
 * @typedef { import('../plugins/invoker/Invoker.mjs').Invoker } Invoker
 * 
 * @typedef { import('../parts/sidebar/Sidebar.mjs').Sidebar } Sidebar
 * @typedef { import('../parts/content/Content.mjs').Content } Content
 */

import { ProfilesPage } from '../pages/profiles/ProfilesPage.mjs';

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
						instance: CounterPage,
						options: [
							[ '#', 'section', 'total' ],

							`
								SELECT sections
								FROM phrases;
							`,

							/**
							 * @param { string[] } sql_response
							 * @param { Map<string, number> } response
							 */
							function (sql_response, response)
							{
								for (const sections of sql_response)
								{
									const converted_sections = JSON.parse(sections);

									for (const section of converted_sections)
									{
										response.has(section)
											? response.set(section, response.get(section) + 1)
											: response.set(section, 1);
									}
								}
							}
						],

						name: 'counter by sections'
					},
					{
						instance: CounterPage,
						options: [
							[ '#', 'phrase', 'total' ],
							`
								SELECT english, COUNT(*) AS total
								FROM poll
								INNER JOIN phrases ON phrases.identifier = poll.phrase
								GROUP BY phrase;
							`
						],

						name: 'counter by phrases'
					},
					{
						instance: CounterPage,
						options: [
							[ '#', 'profile', 'total' ],
							`
								SELECT name, COUNT(*) as total
								FROM selected
								INNER JOIN profiles ON profiles.identifier = selected.profile
								GROUP BY name;
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
				title: 'poll',

				pages: [
					{
						instance: CounterPage,
						options: [
							[ '#', 'poll', 'total' ],
							`
								SELECT english, COUNT(*) AS total
								FROM poll
								INNER JOIN phrases ON poll.phrase = phrases.identifier
								WHERE poll.state = TRUE
								GROUP BY english;
							`
						],

						name: 'counter by poll'
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
