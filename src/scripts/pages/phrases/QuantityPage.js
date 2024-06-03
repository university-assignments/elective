
/**
 * @typedef { import('../../memory/users/UserCollection.js').UserCollection } UserCollection
 */

import { TemplateSummary } from '../../templates/TemplateSummary.js';

import { PageFoundation } from '../PageFoundation.mjs';


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

		for (const user of this.users.all())
		{
			response.set(user.name, user.phrases.length);
		}

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
