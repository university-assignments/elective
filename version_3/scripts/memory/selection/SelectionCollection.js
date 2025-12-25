import { SelectionEvents } from './SelectionEvents.js';

export class SelectionCollection
{
	constructor ()
	{
		/** @type { { [key: string]: number }[] } */
		this.collection = [];

		this.listeners = new SelectionEvents();
	}

	notification ()
	{
		this.listeners.trigger(SelectionEvents.EVENT_REFRESH);
	}

	/**
	 * @param { { [key: string]: number } } user
	 * @param {boolean} notification
	 */
	add (user, notification = true)
	{
		const index = this.collection.push(user);

		notification && this.notification();

		return index;
	}

	/**
	 * @param {string} user
	 * @param {boolean} notification
	 */
	delete (user, notification = true)
	{
		delete this.collection[user];
		notification && this.notification();
	}

	// ===== ===== ===== ===== =====
	// importing
	// ===== ===== ===== ===== =====

	/**
	 * @param { { [key: string]: number }[] } data
	 * @param {boolean} notification
	 */
	importData (data, notification = true)
	{
		jQuery.each(data, (_, data) => this.add(data, false));
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
