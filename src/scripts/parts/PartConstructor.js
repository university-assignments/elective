import jQuery from 'jquery';

export class PartConstructor
{
	async initialize ()
	{
	}

	/**
	 * @protected
	 * 
	 * @param {string} path
	 * 
	 * @returns {Promise<string>}
	 */
	template (path)
	{
		return new Promise(function (resolve)
		{
			const loaded = function ()
			{
				resolve(this.innerHTML);
			};

			jQuery(document.createElement('template'))
				.load(path, loaded);
		});
	}
}
