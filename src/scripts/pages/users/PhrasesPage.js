
/**
 * @typedef { import('../../memory/users/UserCollection').UserCollection } UserCollection
 */

import { TemplateSummary } from '../../templates/TemplateSummary.js';

import { PageFoundation } from '../PageFoundation.js';


export class PhrasesPage extends PageFoundation
{
	/**
	 * @param {UserCollection} users
	 */
	async initialize (users)
	{
		this.summary = new TemplateSummary();
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
	transformPhrases ()
	{
		const response = new Map();

		for (const phrases of this.users.all().map(user => user.phrases))
		{
			for (const phrase of phrases)
			{
				response.has(phrase)
					? response.set(phrase, response.get(phrase) + 1)
					: response.set(phrase, 1);
			}
		}

		return response;
	}

	/**
	 * @private
	 */
	refreshContent ()
	{
		this.summary.refresh(this.transformPhrases());
	}
}
