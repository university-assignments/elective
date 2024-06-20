
import { DatabaseEvents } from '../../plugins/sqlite3/database/DatabaseEvents.mjs';
import { Database } from '../../plugins/sqlite3/database/Database.mjs';


export class Links
{
	/**
	 * @constant
	 */
	TABLE_NAME = 'links';


	/**
	 * @param { Database } database
	 */
	async initialize (database)
	{
		this.sql_schema = database.knex.schema.createTable(this.TABLE_NAME, function (links_builder)
		{
			links_builder.increments('identifier');

			links_builder.text('icon').notNullable();
			links_builder.text('title').notNullable();
			links_builder.text('link').notNullable();
		}).toQuery();

		// ===== ===== ===== ===== =====

		this.events   = new DatabaseEvents();
		this.database = database;
		this.knex     = database.knex;

		this.database.scheme(this.sql_schema);
	}

	// ===== ===== ===== ===== =====

	/**
	 * @param { string } where
	 * 
	 * @returns { ?number }
	 */
	getIdByWhere (where)
	{
		const command  = `SELECT identifier FROM ${this.TABLE_NAME} WHERE ${where} LIMIT 1`;
		const response = this.database.execute(command);

		return response.length > 0
			? response[0].identifier
			: null;
	}

	getAll ()
	{
		const command  = this.knex.select('*').from(this.TABLE_NAME).toQuery();
		const response = this.database.execute(command);

		return response;
	}

	// ===== ===== ===== ===== =====

	/**
	 * @param { string } icon
	 * @param { string } title
	 * @param { string } link
	 * 
	 * @returns { number }
	 */
	create (icon, title, link)
	{
		const command = this.database.knex
			.insert({ icon, title, link })
			.into(this.TABLE_NAME);

		this.database.scheme(command);
		this.events.trigger(this.events.EVENT_REFRESH);

		return this.getIdByWhere(`icon = ${icon} AND title = ${title} AND link = ${link}`);
	}
}
