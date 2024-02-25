
export class QueryOptions
{
	/**
	 * @param {string} search
	 */
	constructor (search = window.location.search)
	{
		this.options = new URLSearchParams(search);

		this.file = this.options.has('file')
			? this.options.get('file')
			: '';
	}
}
