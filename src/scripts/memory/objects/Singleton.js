
export class Singleton
{
	/**
	 * @private
	 * @type { Map<string, Object> }
	 */
	objects = new Map();

	/**
	 * @param {string} name_1
	 * @param {string} name_2
	 */
	override (name_1, name_2)
	{
		this.objects.set(name_1, this.objects.get(name_2));
	}

	/**
	 * @param {() => Object} callback
	 */
	register (callback)
	{
		const class_data = callback();
		const class_name = class_data.constructor.name;

		this.objects.set(class_name, class_data);
	}

	/**
	 * @param {string[]} args
	 */
	filter (args)
	{
		return args.map(arg => this.get(arg));
	}

	/**
	 * @param {string} name
	 */
	get (name)
	{
		return this.objects.get(name);
	}
}
