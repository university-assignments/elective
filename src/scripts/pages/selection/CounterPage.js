import { TemplateSummary } from '../../templates/TemplateSummary.js';

import { DataCollection } from '../../memory/DataCollection.js';
import { Events } from '../../memory/Events.js';

import { PageFoundation } from '../../PageFoundation.js';

export class CounterPage extends PageFoundation
{
	/**
	 * @param {DataCollection} collection
	 * @param {string} filter
	 */
	constructor (collection, filter)
	{
		super();

		this.summary = new TemplateSummary();
		this.container.append(this.summary.tag_base);

		this.collection = collection;
		this.collection.listeners.on(Events.EVENT_REFRESH, () => this.refreshContent());

		this.filter = filter;
	}

	// ===== ===== ===== ===== =====
	// private
	// ===== ===== ===== ===== =====

	/**
	 * @private
	 */
	transformSelection ()
	{
		const response = new Map();

		const _filter = this.filter;

		this.collection.collection.forEach(function (values, key)
		{
			jQuery.each(values, function (index, value)
			{
				if (_filter.includes('check') && !value)
				{
					return;
				}

				if (_filter.includes('key'))
				{
					response.has(key)
						? response.set(key, response.get(key) + 1)
						: response.set(key, 1);
				}

				if (_filter.includes('value'))
				{
					response.has(value)
						? response.set(value, response.get(value) + 1)
						: response.set(value, 1);
				}
			});
		});

		return response;
	}

	/**
	 * @private
	 */
	refreshContent ()
	{
		this.summary.refresh(this.transformSelection());
	}
}
