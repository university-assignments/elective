
import { InitializerInterface } from '../../plugins/initializer/InitializerInterface.mjs';

import { FileSQL } from '../../plugins/files/sql/FileSQL.mjs';
import { Files } from '../../plugins/files/Files.mjs';
import { Database } from '../Database.mjs';


export class Phrases extends InitializerInterface
{
	/**
	 * @param {Database} database
	 * @param {Files} files
	 */
	async initialize (database, files)
	{
		const path = './scripts/database/phrases/sql/phrases.sql';
		const info = new FileSQL(path);
		const file = await files.download(info);

		this.database = database;
		this.database.scheme(file.data);
	}
}
