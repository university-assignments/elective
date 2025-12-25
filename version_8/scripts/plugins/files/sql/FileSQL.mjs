
import { FileDownloader } from '../FileDownloader.mjs';


export class FileSQL extends FileDownloader
{
	onPathProcessed ()
	{
		return;

		if (this.prefix !== 'sql')
		{
			throw new Error('INCORRECT_FILE_FORMAT => SQL');
		}
	}
}
