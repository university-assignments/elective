import { TemplateSummary } from '../../templates/TemplateSummary.js';

import { DataCollection } from '../../memory/DataCollection.js';
import { Events } from '../../memory/Events.js';

import { PageFoundation } from '../../PageFoundation.js';

export class QuantityPage extends PageFoundation
{
	/**
	 * @param {DataCollection} users
	 */
	constructor (users)
	{
		super('table', 'quantity');

		this.summary = new TemplateSummary();
		this.summary.lib_chart_type = 'pie';
		this.container.append(this.summary.tag_base);

		this.users = users;
		this.users.listeners.on(Events.EVENT_REFRESH, () => this.refreshContent());
	}

	// ===== ===== ===== ===== =====
	// private
	// ===== ===== ===== ===== =====

	/**
	 * @private
	 */
	transformUsers ()
	{
		const response = new Map();

		this.users.collection.forEach(function (phrases, user)
		{
			response.set(user, phrases.length);
		});

		return response;
	}

	/**
	 * @private
	 */
	refreshContent ()
	{
		this.summary.refresh(this.transformUsers());
	}
}
