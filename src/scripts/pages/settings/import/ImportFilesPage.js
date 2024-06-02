
/**
 * @typedef { import('../../../memory/users/UserImport').UserImport } UserImport
 */

import { PageFoundation } from '../../PageFoundation.js';
import { Files } from '../../../plugins/files/Files.mjs';
import { FileMustache } from '../../../plugins/files/html/FileMustache.mjs';


export class ImportFilesPage extends PageFoundation
{
	/**
	 * @private
	 * @type {UserImport}
	 */
	_users;

	/**
	 * @param {UserImport} users
	 * @param {Files} files
	 */
	async initialize (users, files)
	{
		this._users = users;

		this.container.html(await files.download(new FileMustache(
			'./scripts/pages/settings/import/template.mst'
		)));

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
