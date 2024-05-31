
import sqlite3InitModule from '@antonz/sqlean';


export class Database
{
	async initialize ()
	{
		this.sqlite3 = await sqlite3InitModule({
			printErr: console.error,
			print: console.debug
		});

		this.db = new this.sqlite3.oo1.DB();
	}

	get version ()
	{
		return this.sqlite3.capi.sqlite3_libversion();
	}

	/**
	 * @param {string} sql
	 */
	execute (sql)
	{
		let rows = [];

		this.db.exec({
			sql: sql,
			rowMode: 'object',
			resultRows: rows,
		});

		return rows;
	}

	/**
	 * @param {string} sql
	 */
	scheme (sql)
	{
		this.db.exec(sql);
	}
}
