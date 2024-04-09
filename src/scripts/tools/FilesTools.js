
export class FilesTools
{
	/**
	 * @param {string} path
	 * 
	 * @returns { Promise<string> }
	 */
	static async getText (path)
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
