
/**
 * @typedef { import('../../memory/users/UserCollection').UserCollection } UserCollection
 */

import { TemplateSummary } from '../../templates/TemplateSummary.js';

import { PageFoundation } from '../../PageFoundation.js';


export class QuantityPage extends PageFoundation
{
	/**
	 * @param {UserCollection} users
	 */
	async initialize (users)
	{
		this.summary = new TemplateSummary();
		this.summary.lib_chart_type = 'pie';
		this.container.append(this.summary.tag_base);

		this.users = users;
		this.users.on(this.users.EVENT_REFRESH, () => this.refreshContent());

		this.refreshContent();
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
