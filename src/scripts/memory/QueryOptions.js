
export class QueryOptions
{
	static PARAM_SELECTION = 'selection';
	static PARAM_USERS     = 'users';

	/**
	 * @param {string} search
	 */
	constructor (search = window.location.search)
	{
		this.options = new URLSearchParams(search);

		this.selection = this.options.has(QueryOptions.PARAM_SELECTION)
			? this.options.get(QueryOptions.PARAM_SELECTION)
			: '';

		this.users = this.options.has(QueryOptions.PARAM_USERS)
			? this.options.get(QueryOptions.PARAM_USERS)
			: '';
	}
}
