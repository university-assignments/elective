
/**
 * @typedef { import('jquery') } jQuery
 */

import { import_json } from './json.js';


/**
 * @param {string} path
 * @param {string} reader
 */
export function import_file_csv (path, reader)
{
	return new Promise(function (resolve)
	{
		jQuery.get(path, function (buffer)
		{
			import_csv(buffer, reader)
				.then(data => resolve(data));
		});
	});
}

/**
 * @param {string} buffer
 * @param {string} reader
 */
export async function import_csv (buffer, reader)
{
	/** @type { (string | number | boolean)[][] } */
	const lines = jQuery.csv.toArrays(buffer);

	return await import_json(lines, reader);
}
