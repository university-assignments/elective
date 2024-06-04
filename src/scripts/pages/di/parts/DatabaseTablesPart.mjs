
import { Grid, h } from 'gridjs';

import { Database } from '../../../database/Database.mjs';


export class DatabaseTablesPart
{
	/**
	 * @param { Database } database
	 * @param { JQuery<HTMLDivElement> } container
	 */
	constructor (database, container, options)
	{
		this.database  = database;
		this.container = container;
		this.options   = options;
	}

	refresh ()
	{
		this.collection = this.database.execute(
			'SELECT * FROM sqlite_schema WHERE type = \'table\' AND name NOT LIKE \'sqlite_%\';'
		);

		if (typeof this.display === 'undefined')
		{
			this.display = new Grid();
			this.display.render(this.container.get(0));
		}

		this.display.updateConfig({
			columns: [
				{
					formatter: cell => h('span', this.options(cell), cell),
					name: 'table'
				}
			],

			data: this.collection.map(table => [ table.name ])
		});

		this.display.forceRender();
	}
}
