
/**
 * @typedef { import('../../memory/users/UserCollection').UserCollection } UserCollection
 */

import { TemplateSummary } from '../../templates/TemplateSummary.js';

import { PageFoundation } from '../PageFoundation.js';


export class CounterPage extends PageFoundation
{
	/**
	 * @param {UserCollection} users
	 * @param {string} filter
	 */
	async initialize (users, filter)
	{
		this.summary = new TemplateSummary();
		this.container.append(this.summary.tag_base);

		this.users = users;
		this.users.on(this.users.EVENT_REFRESH, () => this.refreshContent());

		this.filter = filter;

		this.refreshContent();
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

		this.users.all().forEach(function (user)
		{
			const key    = user.name;
			const values = user.phrases;

			values.forEach(function (value)
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
