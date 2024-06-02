
import { FileDownloader } from '../FileDownloader.mjs';


export class FileMustache extends FileDownloader
{
	download ()
	{
		const _self = this;

		return new Promise(function (resolve)
		{
			const loaded = function ()
			{
				_self.data = this.innerHTML;

				resolve();
			};
	
			jQuery(document.createElement('template'))
				.load(_self.full_path, loaded);
		});
	}

	/**
	 * @param {string} full_path
	 */
	constructor (full_path)
	{
		super(full_path);

		if
		(
			   this.prefix !== 'mustache'
			&& this.prefix !== 'mst'
		)
		{
			throw new Error('INCORRECT_FILE_FORMAT => mustache');
		}
	}
}
