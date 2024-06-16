
import sqlite3InitModule from '@antonz/sqlean';

import { InitializerInterface } from '../../initializer/InitializerInterface.mjs';


export class SQLite3Connection extends InitializerInterface
{
	async initialize ()
	{
		this.connection = await sqlite3InitModule({
			printErr: console.error,
			print:    console.debug
		});
	}

	// ===== ===== ===== ===== =====

	get version ()
	{
		return this.connection.capi.sqlite3_libversion();
	}

	get database ()
	{
		return new this.connection.oo1.DB();
	}
}
