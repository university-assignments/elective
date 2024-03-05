import { TemplateSummary } from '../templates/TemplateSummary.js';

import { SelectionCollection } from '../memory/selection/SelectionCollection.js';
import { SelectionEvents } from '../memory/selection/SelectionEvents.js';

import { PageFoundation } from '../PageFoundation.js';

export class SelectionPage extends PageFoundation
{
	/**
	 * @param {SelectionCollection} selection
	 */
	constructor (selection)
	{
		super('selection');

		this.summary = new TemplateSummary();
		this.container.append(this.summary.tag_base);

		this.selection = selection;
		this.selection.listeners.on(SelectionEvents.EVENT_REFRESH, () => this.refreshContent());
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

		this.selection.collection.forEach(function (phrases)
		{
			jQuery.each(phrases, function (phrase, state)
			{
				if (!state)
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
