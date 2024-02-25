
export class PageFoundation
{
	/**
	 * @abstract
	 * @returns {HTMLElement}
	 */
	getIdentifier ()
	{
		throw new Error();
	}

	/**
	 * @abstract
	 * @returns {HTMLElement}
	 */
	getContainer ()
	{
		throw new Error();
	}
}
