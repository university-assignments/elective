
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
		return this.db.selectObjects(sql);
	}

	/**
	 * @param {string} sql
	 */
	scheme (sql)
	{
		this.db.exec(sql);
	}
}
