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

	notification ()
	{
		this.listeners.trigger(UsersEvents.EVENT_REFRESH);
	}

	/**
	 * @param {string} user
	 * @param {string[]} phrases
	 * @param {boolean} notification
	 */
	register (user, phrases, notification = true)
	{
		this.collection.set(user, phrases);
		notification && this.notification();
	}

	/**
	 * @param {string} user
	 * @param {boolean} notification
	 */
	delete (user, notification = true)
	{
		this.collection.delete(user);
		notification && this.notification();
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
		jQuery.each(data, (user, phrases) => this.register(user, phrases, false));
		notification && this.notification();
	}

	/**
	 * @param {string} address
	 * @param {boolean} notification
	 */
	importFile (address, notification = true)
	{
		const notification_options = {
			headerSmall: 'только что',

			closeButton: true,
			animation: true,
			delay: 5000
		};

		jQuery
			.getJSON(address, data => this.importData(data, false))
			.done(() => notification && this.notification())

			// notification
			.done(() => bootstrap.showToast({
				...notification_options,

				header: 'Файл успешно загружен',
				body: `Файл '${address}' успешно загружен`,

				toastClass: 'text-bg-success'
			}))

			.fail(() => bootstrap.showToast({
				...notification_options,

				header: 'Не удалось загрузить файл',
				body: `Файл '${address}' не удалось загрузить`,

				toastClass: 'text-bg-danger'
			}));
	}
}
