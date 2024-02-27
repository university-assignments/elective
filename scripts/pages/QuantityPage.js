import { TemplateSummary } from '../templates/TemplateSummary.js';

import { UsersCollection } from '../UsersCollection.js';
import { UsersEvents } from '../UsersEvents.js';

import { PageFoundation } from '../PageFoundation.js';

export class QuantityPage extends PageFoundation
{
	/**
	 * @param {UsersCollection} users
	 */
	constructor (users)
	{
		super('quantity');

		this.summary = new TemplateSummary();
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
