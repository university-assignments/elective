
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

	onPathProcessed ()
	{
		const prefixes = [ 'mustache', 'mst' ];

		if (prefixes.includes(this.prefix) === false)
		{
			throw new Error('INCORRECT_FILE_FORMAT => mustache');
		}
	}
}
