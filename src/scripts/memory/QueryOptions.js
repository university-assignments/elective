
export class QueryOptions
{
	PARAMETER_PHRASES    = 'phrases';
	PARAMETER_SECTIONS   = 'sections';
	PARAMETER_TRANSLATED = 'translated';

	PARAMETER_SELECTION = 'selection';

	/**
	 * @param {string} search
	 */
	constructor (search = window.location.search)
	{
		this.options = new URLSearchParams(search);

		this.phrases = this.options.has(this.PARAMETER_PHRASES)
			? this.options.get(this.PARAMETER_PHRASES)
			: '';

		this.sections = this.options.has(this.PARAMETER_SECTIONS)
			? this.options.get(this.PARAMETER_SECTIONS)
			: '';

		this.translated = this.options.has(this.PARAMETER_TRANSLATED)
			? this.options.get(this.PARAMETER_TRANSLATED)
			: '';

		// ===== ===== ===== ===== =====

		this.selection = this.options.has(this.PARAMETER_SELECTION)
			? this.options.get(this.PARAMETER_SELECTION)
			: '';
	}
}
