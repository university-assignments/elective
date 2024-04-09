
/**
 * @abstract
 */
export class PartConstructor
{
	/**
	 * @abstract
	 */
	async initialize ()
	{
		throw new Error('override');
	}
}
