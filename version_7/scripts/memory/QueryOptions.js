
export class QueryOptions
{
	PARAM_SELECTION = 'selection';
	PARAM_PHRASES   = 'phrases';
	PARAM_TAGS      = 'tags';

	/**
	 * @param {string} search
	 */
	constructor (search = window.location.search)
	{
		this.options = new URLSearchParams(search);

		this.selection = this.options.has(this.PARAM_SELECTION)
			? this.options.get(this.PARAM_SELECTION)
			: '';

		this.phrases = this.options.has(this.PARAM_PHRASES)
			? this.options.get(this.PARAM_PHRASES)
			: '';

		this.tags = this.options.has(this.PARAM_TAGS)
			? this.options.get(this.PARAM_TAGS)
			: '';
	}
}
