
import { Listeners } from './Listeners.mjs';


export class Events
{
	/**
	 * @property
	 * @type { Map<string, Listeners> }
	 */
	events = new Map();

	// ===== ===== ===== ===== =====

	/**
	 * @param {string} name
	 */
	exists (name)
	{
		return this.events.has(name);
	}

	/**
	 * @param {string} name
	 */
	get (name)
	{
		return this.events.get(name);
	}

	// ===== ===== ===== ===== =====

	/**
	 * @param {string} name
	 */
	trigger (name, ...options)
	{
		if (this.exists(name) === false)
		{
			return false;
		}

		this.get(name).trigger(...options);
		return true;
	}

	/**
	 * @param {string} name
	 * @param {Function} handler
	 */
	on (name, handler)
	{
		if (this.exists(name) === false)
		{
			this.events.set(name, new Listeners());
		}

		this.get(name).on(handler);
	}
}
