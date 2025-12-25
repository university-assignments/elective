
/**
 * @typedef { import('jquery') } jQuery
 */

import { import_json } from './json.js';


/**
 * @param {string} path
 * @param {string} reader
 */
export async function import_file_csv (path, reader)
{
	const text = await jQuery.get(path);
	const data = import_csv(text, reader);

	return data;
}

/**
 * @param {string} buffer
 * @param {string} reader
 */
export function import_csv (buffer, reader)
{
	/** @type { (string | number | boolean)[][] } */
	const lines = jQuery.csv.toArrays(buffer);

	return import_json(lines, reader);
}
