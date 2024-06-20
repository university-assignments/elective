
/**
 * @typedef { import('sqlite3').Database } Database
 */

import sqlite3InitModule from '@antonz/sqlean';
import knex from 'knex-browser';

import { InitializerInterface } from '../../initializer/InitializerInterface.mjs';


export class SQLite3Connection extends InitializerInterface
{
	async initialize ()
	{
		this.connection = await sqlite3InitModule({
			printErr: console.error,
			print:    console.debug
		});

		// для создания схем
		this.knex = knex({
			client: 'sqlite3',

			connection: {
				filename: ':memory:',
			},
		});
	}

	// ===== ===== ===== ===== =====

	get version ()
	{
		return this.connection.capi.sqlite3_libversion();
	}

	/**
	 * @returns { Database }
	 */
	get database ()
	{
		return new this.connection.oo1.DB();
	}
}
