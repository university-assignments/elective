
import { PageFoundation } from '../../PageFoundation.mjs';

import { Database } from '../../../database/Database.mjs';

import { Files } from '../../../plugins/files/Files.mjs';

import { FileCSV } from '../../../plugins/files/excel/FileCSV.mjs';

import { FileMustache } from '../../../plugins/files/html/FileMustache.mjs';

import { FileSQL } from '../../../plugins/files/sql/FileSQL.mjs';


export class ImportPart extends PageFoundation
{
	/**
	 * @private
	 * @property
	 * @readonly
	 * @type { Database }
	 */
	database;

	/**
	 * @private
	 * @property
	 * @readonly
	 * @type { Files }
	 */
	files;

	// ===== ===== ===== ===== =====

	/**
	 * @param { Database } database
	 * @param { Files } files
	 */
	async initialize (database, files)
	{
		this.database = database;
		this.files    = files;

		// ===== ===== ===== ===== =====

		const path = './scripts/pages/settings/import/template.mst';
		const info = new FileMustache(path);
		const file = await files.download(info);

		this.container.html(file.data);

		// ===== ===== ===== ===== =====

		this.download_format = this.container.find('#download_format');
		this.download_filter = this.container.find('#download_filter');
		this.download_file   = this.container.find('#download_file');

		const _self = this;
		this.download_file.on('change', function ()
		{
			_self.download(this);
		});
	}

	/**
	 * @param {HTMLInputElement} tag
	 */
	async download (tag)
	{
		const files = tag.files;

		if (files.length === 0)
		{
			return;
		}

		const file_format = this.download_format.val();
		const file_filter = this.download_filter.val();

		const file_0 = files.item(0);
		const text_0 = await file_0.text();

		// TODO: ДОДЕЛАТЬ

		switch (file_format)
		{
			case 'phrases':

				this._users.importPhrases();

				break;

			case 'survey':

				this._users.importSurvey();

				break;

			default:
				throw new Error('');
		}
	}
}
