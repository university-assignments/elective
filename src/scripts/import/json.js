
/**
 * @typedef { import('jquery') } jQuery
 */


/**
 * @param {string} path
 * @param {string} reader
 */
export function import_file_json (path, reader)
{
	return new Promise(function (resolve)
	{
		jQuery.getJSON(path, function (data)
		{
			import_json(data, reader)
				.then(data => resolve(data));
		});
	});
}

/**
 * @template { (string | number | boolean)[][] } TLines
 */

const readers = {

	/**
	 * @param {TLines} lines
	 */
	'top-left': function* (lines)
	{
		const header = lines.splice(0, 1)[0];
		const rows   = lines;

		// top (ignore column 1 => left)
		for (let column_index = header.length - 1; column_index > 0; column_index--)
		{
			const key    = header[column_index];
			const values = [];

			// left
			for (const row of rows)
			{
				const left_key   = row[0];
				const left_value = row[column_index];

				values.push([ left_key, left_value ]);
			}

			yield [ key, values ];
		}
	},

	/**
	 * @param {TLines} lines
	 */
	'left': function* (lines)
	{
		// left
		for (const line of lines)
		{
			const key    = line.splice(0, 1)[0];
			const values = line;

			yield [ key, values ];
		}
	}

};

/**
 * @param {TLines} lines
 * @param {string} reader
 */
export async function import_json (lines, reader)
{
	const handler = readers[reader];

	if (typeof handler === 'undefined')
	{
		throw new Error('handler');
	}

	return [...handler(lines)];
}
