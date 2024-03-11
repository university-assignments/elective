import jQuery from 'jquery';

import { Events } from './Events.js';

export class DataCollection
{
	constructor ()
	{
		/** @type {Map<string, string[]>} */
		this.collection = new Map();

		this.listeners = new Events();
	}

	notification ()
	{
		this.listeners.trigger(Events.EVENT_REFRESH);
	}

	/**
	 * @param {string} option
	 * @param {any[]} values
	 * @param {boolean} notification
	 */
	register (option, values, notification = true)
	{
		this.collection.set(option, values);
		notification && this.notification();
	}

	/**
	 * @param {string} option
	 * @param {boolean} notification
	 */
	delete (option, notification = true)
	{
		this.collection.delete(option);
		notification && this.notification();
	}

	// ===== ===== ===== ===== =====
	// importing
	// ===== ===== ===== ===== =====

	/**
	 * @param { {[key: string]: any[]} } data
	 * @param {boolean} notification
	 */
	importData (data, notification = true)
	{
		jQuery.each(data, (option, values) => this.register(option, values, false));
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
			.getJSON('storage/' + address + '.json', data => this.importData(data, false))
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
