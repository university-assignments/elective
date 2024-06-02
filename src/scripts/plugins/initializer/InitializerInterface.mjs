
/**
 * @interface
 */
export class InitializerInterface
{
	/**
	 * @abstract
	 */
	initialize ()
	{
		throw new Error('override');
	}
}
