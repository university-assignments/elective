
import { FileDownloader } from '../FileDownloader.mjs';


export class FileJSON extends FileDownloader
{
	async download ()
	{
		const response = await jQuery.getJSON(this.full_path);

		this.state = true;
		this.data  = null;

		this.converted = response;

		this.onSuccessfulDownload();
	}
}
