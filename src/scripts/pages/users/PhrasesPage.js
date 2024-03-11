import { TemplateSummary } from '../../templates/TemplateSummary.js';

import { DataCollection } from '../../memory/DataCollection.js';
import { Events } from '../../memory/Events.js';

import { PageFoundation } from '../../PageFoundation.js';

export class PhrasesPage extends PageFoundation
{
	/**
	 * @param {DataCollection} users
	 */
	constructor (users)
	{
		super('table', 'phrases');

		this.summary = new TemplateSummary();
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
	transformPhrases ()
	{
		const response = new Map();

		for (const phrases of this.users.collection.values())
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
