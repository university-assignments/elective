
import { InitializerInterface } from '../../plugins/initializer/InitializerInterface.mjs';

import { FileSQL } from '../../plugins/files/sql/FileSQL.mjs';
import { Files } from '../../plugins/files/Files.mjs';

import { Database } from '../../plugins/sqlite3/database/Database.mjs';

import { ProfilesEvents } from './ProfilesEvents.mjs';


export class Profiles extends InitializerInterface
{
	/**
	 * @param { Database } database
	 * @param { Files } files
	 */
	async initialize (database, files)
	{
		const sql_folder = './scripts/tables/profiles/sql';

		// table
		{
			const path = sql_folder + '/profiles.sql';
			const info = new FileSQL(path);
			const file = await files.download(info);

			this.sql_table = file.data;
		}

		// create
		{
			const path = sql_folder + '/create.sql';
			const info = new FileSQL(path);
			const file = await files.download(info);

			this.sql_create = file.data;
		}

		this.events = new ProfilesEvents();

		this.database = database;
		this.database.scheme(this.sql_table);
	}

	// ===== ===== ===== ===== =====

	/**
	 * @param { string } profile_name
	 * 
	 * @returns { ?number }
	 */
	getIdByName (profile_name)
	{
		const command  = `SELECT identifier FROM profiles WHERE name = '${profile_name}' LIMIT 1`;
		const response = this.database.execute(command);

		return response.length > 0
			? response[0].identifier
			: null;
	}

	getAll ()
	{
		const command  = 'SELECT * FROM profiles';
		const response = this.database.execute(command);

		return response;
	}

	// ===== ===== ===== ===== =====

	/**
	 * @param { string } profile_name
	 * 
	 * @returns { number }
	 */
	create (profile_name)
	{
		const command = this.sql_create
			.replace('{NAME}', profile_name);

		this.database.scheme(command);
		this.events.trigger(this.events.EVENT_REFRESH);

		return this.getIdByName(profile_name);
	}
}
