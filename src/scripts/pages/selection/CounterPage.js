import { TemplateSummary } from '../../templates/TemplateSummary.js';

import { DataCollection } from '../../memory/DataCollection.js';
import { Events } from '../../memory/Events.js';

import { PageFoundation } from '../../PageFoundation.js';

export class CounterPage extends PageFoundation
{
	/**
	 * @param {DataCollection} selection
	 */
	constructor (selection)
	{
		super('table', 'counter');

		this.summary = new TemplateSummary();
		this.container.append(this.summary.tag_base);

		this.selection = selection;
		this.selection.listeners.on(Events.EVENT_REFRESH, () => this.refreshContent());
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

		this.selection.collection.forEach(function (users, phrase)
		{
			jQuery.each(users, function (_, user)
			{
				if (!user)
				{
					return;
				}

				response.has(phrase)
					? response.set(phrase, response.get(phrase) + 1)
					: response.set(phrase, 1);
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
