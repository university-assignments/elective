
import { FileDownloader } from '../FileDownloader.mjs';


export class FileSQL extends FileDownloader
{
	/**
	 * @param {string} full_path
	 */
	constructor (full_path)
	{
		super(full_path);

		if (this.prefix !== 'sql')
		{
			throw new Error('INCORRECT_FILE_FORMAT => SQL');
		}
	}
}
