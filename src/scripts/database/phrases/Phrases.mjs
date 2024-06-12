
import { InitializerInterface } from '../../plugins/initializer/InitializerInterface.mjs';

import { FileSQL } from '../../plugins/files/sql/FileSQL.mjs';
import { Files } from '../../plugins/files/Files.mjs';

import { Database } from '../Database.mjs';
import { PhrasesEvents } from './PhrasesEvents.mjs';


export class Phrases extends InitializerInterface
{
	/**
	 * @param { Database } database
	 * @param { Files } files
	 */
	async initialize (database, files)
	{
		const sql_folder = './scripts/database/phrases/sql';

		// table
		{
			const path = sql_folder + '/phrases.sql';
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

		this.events = new PhrasesEvents();

		this.database = database;
		this.database.scheme(this.sql_table);
	}

	// ===== ===== ===== ===== =====

	/**
	 * @param { string } english
	 * 
	 * @returns { ?number }
	 */
	getIdByEnglish (english)
	{
		const command  = `SELECT identifier FROM phrases WHERE english = '${english}' LIMIT 1`;
		const response = this.database.execute(command);

		return response.length > 0
			? response[0].identifier
			: null;
	}

	getAll ()
	{
		const command  = 'SELECT * FROM phrases';
		const response = this.database.execute(command);

		return response;
	}

	// ===== ===== ===== ===== =====

	/**
	 * @param { string } english
	 * @param { string } russian
	 * @param { string[] } sections
	 * 
	 * @returns { number }
	 */
	create (english, russian, sections)
	{
		const command = this.sql_create
			.replace('{english}',  english)
			.replace('{russian}',  russian)
			.replace('{sections}', JSON.stringify(sections));

		this.database.scheme(command);
		this.events.trigger(this.events.EVENT_REFRESH);

		return this.getIdByEnglish(english);
	}
}
