import jQuery from 'jquery';

export class UsersCollection
{
	constructor ()
	{
		/** @type {Map<string, string[]>} */
		this.collection = new Map();

		/** @see https://learn.jquery.com/events/introduction-to-custom-events/ */
		this.listeners = jQuery(document);
	}

	/**
	 * @param {string} user
	 */
	delete (user)
	{
		this.collection.delete(user);
		this.listeners.trigger('refresh');
	}

	/**
	 * @param {{[key: string]: string[]}} data
	 */
	import_data (data)
	{
		jQuery.each(data, (user, phrases) => this.collection.set(user, phrases));
	}

	/**
	 * @param {string} address
	 */
	import_file (address)
	{
		jQuery.getJSON(address, data => this.import_data(data))
			.done(() => this.listeners.trigger('refresh'));
	}
}
