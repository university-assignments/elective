
/**
 * @interface
 */
export class InitializerInterface
{
	/**
	 * @abstract
	 */
	async initialize ()
	{
		throw new Error('override');
	}
}
