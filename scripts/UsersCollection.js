import jQuery from 'jquery';

import { UsersEvents } from './UsersEvents.js';

export class UsersCollection
{
	constructor ()
	{
		/** @type {Map<string, string[]>} */
		this.collection = new Map();

		this.listeners = new UsersEvents();
	}

	/**
	 * @param {string} user
	 * @param {string[]} phrases
	 * @param {boolean} notification
	 */
	register (user, phrases, notification = true)
	{
		this.collection.set(user, phrases);
		notification && this.listeners.trigger(UsersEvents.EVENT_REFRESH);
	}

	/**
	 * @param {string} user
	 * @param {boolean} notification
	 */
	delete (user, notification = true)
	{
		this.collection.delete(user);
		notification && this.listeners.trigger(UsersEvents.EVENT_REFRESH);
	}

	// ===== ===== ===== ===== =====
	// importing
	// ===== ===== ===== ===== =====

	/**
	 * @param {{[key: string]: string[]}} data
	 * @param {boolean} notification
	 */
	importData (data, notification = true)
	{
		jQuery.each(data, (user, phrases) => this.register(user, phrases, notification));
	}

	/**
	 * @param {string} address
	 * @param {boolean} notification
	 */
	importFile (address, notification = true)
	{
		jQuery
			.getJSON(address, data => this.importData(data, false))
			.done(() => notification && this.listeners.trigger(UsersEvents.EVENT_REFRESH));
	}
}
