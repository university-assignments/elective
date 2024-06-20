

import { InitializerInterface } from '../../initializer/InitializerInterface.mjs';

import { SQLite3Connection } from '../connection/SQLite3Connection.mjs';

import { DatabaseEvents } from './DatabaseEvents.mjs';


export class Database extends InitializerInterface
{
	/**
	 * @param { SQLite3Connection } connection
	 */
	async initialize (connection)
	{
		this.events = new DatabaseEvents();
		this.knex   = connection.knex;
		this.db     = connection.database;
	}

	/**
	 * @param { string } sql
	 */
	execute (sql)
	{
		return this.db.selectObjects(sql);
	}

	/**
	 * @param { string } sql
	 */
	scheme (sql)
	{
		this.db.exec(sql);
		this.events.trigger(this.events.EVENT_REFRESH);
	}
}
