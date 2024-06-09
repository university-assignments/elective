
export class StringsTools
{
	/**
	 * @param { string } buffer
	 * @param { string | RegExp } search
	 */
	static lastSplit (buffer, search)
	{
		const position = typeof search === 'string'
			? buffer.lastIndexOf(search)
			: buffer.search(search);

		const response = {
			position,
			search,

			before: buffer,
			after:  ''
		};

		if (position > 0)
		{
			response.before = buffer.substring(0, position);
			response.after  = buffer.substring(position + search.length);
		}

		return response;
	}

	/**
	 * @param { string } buffer
	 * @param { string | RegExp } search
	 * @param { string } message
	 */
	static splitWithCheck (buffer, search, message)
	{
		const response = this.lastSplit(buffer, search);

		if (response.position === -1)
		{
			throw new Error(message);
		}

		return response;
	}
}
