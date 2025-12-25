
import { FileDownloader } from '../FileDownloader.mjs';


export class FileSQL extends FileDownloader
{
	onPathProcessed ()
	{
		if (this.prefix !== 'html')
		{
			throw new Error('INCORRECT_FILE_FORMAT => SQL');
		}
	}
}
