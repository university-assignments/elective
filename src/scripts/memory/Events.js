import 'jquery';

export class Events
{
	constructor ()
	{
		/** @see https://learn.jquery.com/events/introduction-to-custom-events/ */
		this.listeners = jQuery(document);
	}

	/**
	 * @param {string} name
	 */
	trigger (name)
	{
		this.listeners.trigger(name);
	}

	/**
	 * @param {string} name
	 * @param {Function} handler
	 */
	on (name, handler)
	{
		this.listeners.on(name, handler);
	}
}
