
export class Listeners
{
	/**
	 * @property
	 * @type { Function[] }
	 */
	listeners = [];

	trigger (...options)
	{
		for (const listener of this.listeners)
		{
			listener(...options);
		}
	}

	on (handler)
	{
		this.listeners.push(handler);
	}
}
