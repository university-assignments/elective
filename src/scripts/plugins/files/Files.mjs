
import { FileDownloader } from './FileDownloader.mjs';
import { FileInterface } from './FileInterface.mjs';


export class Files
{
	/**
	 * @private
	 * @property
	 * @type { Map<string, FileInterface> }
	 */
	files = new Map();

	// ===== ===== ===== ===== =====

	/**
	 * @param { FileInterface } file
	 */
	add (file)
	{
		this.files.set(file.full_path, file);
	}

	/**
	 * @param { string } path
	 */
	get (full_path)
	{
		return this.files.get(full_path);
	}

	/**
	 * @param { string } full_path
	 */
	exists (full_path)
	{
		return this.files.has(full_path);
	}

	/**
	 * @template TDownloader
	 * 
	 * @param { TDownloader & FileDownloader } downloader
	 * 
	 * @returns { Promise<TDownloader> }
	 */
	async download (downloader)
	{
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
