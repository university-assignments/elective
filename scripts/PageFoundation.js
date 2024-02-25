import jQuery from 'jquery';

/**
 * @abstract
 */
export class PageFoundation
{
	/**
	 * @abstract
	 * @returns {JQuery<HTMLElement>}
	 */
	getIdentifier ()
	{
		throw new Error();
	}

	/**
	 * @abstract
	 * @returns {JQuery<HTMLElement>}
	 */
	getContainer ()
	{
		throw new Error();
	}
}
