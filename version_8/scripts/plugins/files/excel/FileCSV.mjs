
import { FileDownloader } from '../FileDownloader.mjs';


export class FileCSV extends FileDownloader
{
	/**
	 * @property
	 * @type { string }
	 */
	separator_line = '\r\n';

	/**
	 * @property
	 * @type { string }
	 */
	separator_value = ';';

	/**
	 * @property
	 * @type { string[][] }
	 */
	converted;

	// ===== ===== ===== ===== =====

	onPathProcessed ()
	{
		if (this.prefix !== 'csv')
		{
			throw new Error('INCORRECT_FILE_FORMAT => CSV');
		}
	}

	onSuccessfulDownload ()
	{
		const lines_inputs = this.data.split(this.separator_line);
		const lines_result = [];

		for (const line of lines_inputs)
		{
			const values_inputs = line.split(this.separator_value);
			const values_result = [];

			for (const value of values_inputs)
			{
				values_result.push(value.trim());
			}

			lines_result.push(values_result);
		}

		this.converted = lines_result;
	}
}
