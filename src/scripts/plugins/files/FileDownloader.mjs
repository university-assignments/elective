
import { FileInterface } from './FileInterface.mjs';


export class FileDownloader extends FileInterface
{
	/**
	 * @property
	 * @type { boolean }
	 */
	state = false;

	/**
	 * @property
	 * @type { string }
	 */
	data = null;

	// ===== ===== ===== ===== =====

	onSuccessfulDownload ()
	{
	}

	// ===== ===== ===== ===== =====

	async download ()
	{
		const resource = await fetch(this.full_path);
		const response = await resource.text();

		this.state = true;
		this.data  = response;

		this.onSuccessfulDownload();
	}
}
