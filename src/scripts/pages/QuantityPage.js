import { TemplateSummary } from '../templates/TemplateSummary.js';

import { UsersCollection } from '../memory/users/UsersCollection.js';
import { UsersEvents } from '../memory/users/UsersEvents.js';

import { PageFoundation } from '../PageFoundation.js';

export class QuantityPage extends PageFoundation
{
	/**
	 * @param {UsersCollection} users
	 */
	constructor (users)
	{
		super('table', 'quantity');

		this.summary = new TemplateSummary();
		this.summary.lib_chart_type = 'pie';
		this.container.append(this.summary.tag_base);

		this.users = users;
		this.users.listeners.on(UsersEvents.EVENT_REFRESH, () => this.refreshContent());
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
