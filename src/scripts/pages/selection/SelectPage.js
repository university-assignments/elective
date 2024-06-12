
import { Grid, html } from 'gridjs';

import { PageContainer } from '../PageContainer.mjs';

import { Database } from '../../database/Database.mjs';


export class SelectPage extends PageContainer
{
	/**
	 * @param { Database } database
	 */
	async initialize (database)
	{
		this.database = database;
		this.events   = database.events;

		this.lib_table = new Grid();
		this.lib_table.render(this.tag_container.get(0));

		this.events.on(this.events.EVENT_REFRESH, () => this.refreshContent());
		this.refreshContent();
	}

	// ===== ===== ===== ===== =====
	// private
	// ===== ===== ===== ===== =====

	/**
	 * @param { (string | boolean)[][] } data
	 */
	refreshTable (data)
	{
		const counter = data.map(values => values.length - 1);
		const maximum = Math.max(...counter);

		const profiles = Array(maximum).fill().map(function (_, index)
		{
			return {
				name: index,

				formatter: function (cell)
				{
					if (cell === null)
					{
						return '';
					}

					return html(`
						<svg
							style  = "stroke-width: 2; stroke: #${ cell ? '6aff6a' : 'ff0033' };"
							class  = "svg_icon me-2"
							width  = "24"
							height = "24"
							role   = "img"
						>
							<use xlink:href="#yes"></use>
						</svg>
					`);
				}
			};
		});

		this.lib_table.updateConfig({
			columns: [
				'phrase',
				...profiles
			],

			data: data,

			pagination: {
				limit: 20
			},

			search: true,
			sort: true
		});

		this.lib_table.forceRender();
	}

	refreshContent ()
	{
		// получение фраз, которые участвовали
		// english => debug
		const phrases_identifier_english = this.database.execute(`
			SELECT phrases.identifier, phrases.english
			FROM phrases
			INNER JOIN profiles_phrases ON phrases.identifier = profiles_phrases.phrase
			GROUP BY phrases.identifier
			ORDER BY phrases.identifier;
		`);

		// получение профилей, которые участвовали
		// name => debug
		const profiles_identifier_name = this.database.execute(`
			SELECT profiles.identifier, profiles.name
			FROM profiles
			INNER JOIN profiles_phrases ON profiles.identifier = profiles_phrases.profile
			GROUP BY profiles.identifier
			ORDER BY profiles.identifier;
		`);

		// rows: [ values: [ ... ] ]
		const rows = new Map(phrases_identifier_english.map(
			phrase_info => [ phrase_info.identifier, [ phrase_info.english ] ]
		));

		for (const profile_info of profiles_identifier_name)
		{
			// identifier, phrase => debug
			const profiles_phrases__phrase_state = this.database.execute(`
				SELECT profiles_phrases.identifier, profiles_phrases.phrase, profiles_phrases.state
				FROM profiles
				INNER JOIN profiles_phrases ON profiles.identifier = profiles_phrases.profile
				WHERE profiles.identifier = ${profile_info.identifier}
				GROUP BY profiles_phrases.phrase
				ORDER BY profiles_phrases.phrase;
			`);

			rows.forEach(function (row_data, row_index)
			{
				for (const { phrase, state } of profiles_phrases__phrase_state)
				{
					if (row_index === phrase)
					{
						row_data.push(state);
						return;
					}
				}

				row_data.push(null);
			});
		}

		this.refreshTable([...rows.values()]);
	}
}
