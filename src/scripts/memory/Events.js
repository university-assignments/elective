
export class Events
{
	constructor ()
	{
		/** @type {Map<string, Function[]>} */
		this.listeners = new Map();
	}

	/**
	 * @param {string} name
	 */
	trigger (name)
	{
		if (this.listeners.has(name) === false)
		{
			return false;
		}

		for (const handler of this.listeners.get(name))
		{
			handler();
		}

		return true;
	}

	/**
	 * @param {string} name
	 * @param {Function} handler
	 */
	on (name, handler)
	{
		if (this.listeners.has(name) === false)
		{
			this.listeners.set(name, []);
		}

		this.listeners.get(name).push(handler);
	}
}
