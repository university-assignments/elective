
import { Grid, h } from 'gridjs';

import { Database } from '../../database/Database.mjs';

import { PageFoundation } from '../PageFoundation.js';


export class DatabaseTablesPage extends PageFoundation
{
	/**
	 * @param {Database} database
	 */
	async initialize (database)
	{
		this.database = database;

		this.tag_tables = jQuery(document.createElement('div'))
			.addClass('m-2');

		this.tag_table = jQuery(document.createElement('div'))
			.addClass('m-2');

		this.container
			.append(this.tag_tables)
			.append(this.tag_table);

		this.refresh();
	}

	refresh ()
	{
		this.tables = this.database.execute('SELECT * FROM sqlite_schema WHERE type = \'table\' AND name NOT LIKE \'sqlite_%\';');

		const tables_options = name => {
			return {
				onClick: () => this.refreshTable(name)
			};
		};

		const tables_viewer = new Grid({
			columns: [
				{
					formatter: cell => h('span', tables_options(cell), cell),
					name: 'table'
				}
			],

			data: this.tables.map(table => [ table.name ])
		});

		tables_viewer.render(this.tag_tables.get(0));
	}

	/**
	 * @param {string} name
	 */
	refreshTable (name)
	{
		this.table_info = this.database.execute(`PRAGMA table_info(${name})`);
		this.table_data = this.database.execute(`SELECT * FROM ${name};`);

		if (typeof this.tables_viewer === 'undefined')
		{
			this.tables_viewer = new Grid();
			this.tables_viewer.render(this.tag_table.get(0));
		}

		this.tables_viewer.updateConfig({
			columns: this.table_info.map(option => option.name),
			data: this.table_data.map(table => jQuery.each(table, (_, value) => value))
		});

		this.tables_viewer.forceRender();
	}
}
