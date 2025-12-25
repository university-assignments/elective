
/**
 * @template TInstance
 */
export class ReflectionClass
{
	/**
	 * @param { TInstance } instance
	 */
	constructor (instance)
	{
		// 'new class' => object
		// 'class'     => function

		this.instance = instance;
	}

	// ===== ===== ===== ===== =====

	get code ()
	{
		switch (typeof this.instance)
		{
			case 'object':
				return this.instance.constructor.toString();

			case 'function':
				return this.instance.toString();

			default:
				throw new Error();
		}
	}

	get name ()
	{
		switch (typeof this.instance)
		{
			case 'object':
				return this.instance.constructor.name;

			case 'function':
				return this.instance.name;

			default:
				throw new Error();
		}
	}
}
