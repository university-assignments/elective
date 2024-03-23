
import { import_file_csv } from './csv.js';
import { import_file_json } from './json.js';


/**
 * @param {string} path
 * @param {string} reader
 */
export async function import_file_auto (path, reader)
{
	// JSON
	if (path.endsWith('.json'))
	{
		return await import_file_json(path, reader);
	}

	// CSV
	if (path.endsWith('.csv'))
	{
		return await import_file_csv(path, reader);
	}

	throw new Error('');
}
