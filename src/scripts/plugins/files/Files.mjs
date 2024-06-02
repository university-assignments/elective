
import { FileDownloader } from './FileDownloader.mjs';
import { FileInterface } from './FileInterface.mjs';
import { FileSQL } from './sql/FileSQL.mjs';


export class Files
{
	/**
	 * @private
	 * @property
	 * @type { { [path: string]: FileInterface } }
	 */
	files = {};

	// ===== ===== ===== ===== =====

	/**
	 * @param {FileInterface} file
	 */
	add (file)
	{
		this.files[file.full_path] = file;
	}

	/**
	 * @param {string} path
	 */
	get (full_path)
	{
		return this.files[full_path];
	}

	/**
	 * @param {string} full_path
	 */
	exists (full_path)
	{
		return this.files[full_path] instanceof FileInterface;
	}

	/**
	 * @template TDownloader
	 * 
	 * @param { TDownloader } downloader
	 * 
	 * @returns { TDownloader }
	 */
	async download (downloader)
	{
		if (downloader instanceof FileDownloader === false)
		{
			throw new Error('FileDownloader');
		}

		const full_path = downloader.full_path;

		if (this.exists(full_path))
		{
			return this.get(full_path);
		}

		await downloader.download();
		this.add(downloader);

		return downloader;
	}
}
