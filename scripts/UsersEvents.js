import jQuery from 'jquery';

export class UsersEvents
{
	static EVENT_REFRESH = 'refresh';

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
