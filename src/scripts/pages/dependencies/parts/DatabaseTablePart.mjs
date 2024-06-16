
import { Database } from '../../../plugins/sqlite3/database/Database.mjs';


export class DatabaseTablePart
{
	/**
	 * @param { Database } database
	 * @param { JQuery<HTMLDivElement> } container
	 */
	constructor (database, container)
	{
		this.database  = database;
		this.container = container;

		this.selected = null;
	}

	refresh ()
	{
		if (! this.selected)
		{
			return;
		}

		this.info = this.database.execute(`PRAGMA table_info(${this.selected})`);
		this.data = this.database.execute(`SELECT * FROM ${this.selected};`);

		if (typeof this.display === 'undefined')
		{
			this.display = new Grid();
			this.display.render(this.container.get(0));
		}

		this.display.updateConfig({
			columns: this.info.map(option => option.name),
			data: this.data.map(table => jQuery.each(table, (_, value) => value)),

			pagination: {
				limit: 20
			},

			search: true,
			sort: true
		});

		this.display.forceRender();
	}
}
