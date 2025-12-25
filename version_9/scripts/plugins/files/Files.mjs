
import { FileDownloader } from './FileDownloader.mjs';
import { FilesEvents } from './FilesEvents.mjs';


export class Files
{
	/**
	 * @property
	 * @readonly
	 * @type { FilesEvents }
	 */
	events = new FilesEvents();

	/**
	 * @private
	 * @property
	 * @readonly
	 * @type { Map<string, FileDownloader> }
	 */
	files = new Map();

	// ===== ===== ===== ===== =====

	all ()
	{
		return this.files;
	}

	/**
	 * @param { FileDownloader } file
	 */
	add (file)
	{
		this.files.set(file.full_path, file);
		this.events.trigger(this.events.EVENT_REFRESH);
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

	// ===== ===== ===== ===== =====

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
