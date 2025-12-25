
export class Events
{
	/**
	 * @private
	 * @type {Map<string, Function[]>}
	 */
	listeners = new Map();

	/**
	 * @param {string} name
	 */
	trigger (name, ...options)
	{
		if (this.listeners.has(name) === false)
		{
			return false;
		}

		for (const handler of this.listeners.get(name))
		{
			handler(...options);
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
