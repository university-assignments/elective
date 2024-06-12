
import { InitializerInterface } from '../../plugins/initializer/InitializerInterface.mjs';

import { FileSQL } from '../../plugins/files/sql/FileSQL.mjs';
import { Files } from '../../plugins/files/Files.mjs';

import { Database } from '../Database.mjs';

import { ProfilesPhrasesEvents } from './ProfilesPhrasesEvents.mjs';

export class ProfilesPhrases extends InitializerInterface
{
	/**
	 * @param { Database } database
	 * @param { Files } files
	 */
	async initialize (database, files)
	{
		const sql_folder = './scripts/database/profiles_phrases/sql';

		// table
		{
			const path = sql_folder + '/profiles_phrases.sql';
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

		this.events = new ProfilesPhrasesEvents();

		this.database = database;
		this.database.scheme(this.sql_table);
	}

	// ===== ===== ===== ===== =====

	/**
	 * @param { string } where
	 * 
	 * @returns { ?number }
	 */
	getIdByWhere (where)
	{
		const command  = `SELECT identifier FROM profiles_phrases WHERE ${where} LIMIT 1`;
		const response = this.database.execute(command);

		return response.length > 0
			? response[0].identifier
			: null;
	}

	getAll ()
	{
		const command  = 'SELECT * FROM profiles_phrases';
		const response = this.database.execute(command);

		return response;
	}

	// ===== ===== ===== ===== =====

	/**
	 * @param { number } profile
	 * @param { number } phrase
	 * @param { boolean } state
	 * 
	 * @returns { number }
	 */
	create (profile, phrase, state)
	{
		const command = this.sql_create
			.replace('{profile}', profile)
			.replace('{phrase}',  phrase)
			.replace('{state}',   state ? 'TRUE' : 'FALSE');

		this.database.scheme(command);
		this.events.trigger(this.events.EVENT_REFRESH);

		return this.getIdByWhere(`profile = ${profile} AND phrase = ${phrase}`);
	}
}
