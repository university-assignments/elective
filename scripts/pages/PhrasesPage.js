import jQuery from 'jquery';

import { TemplateSummary } from '../templates/TemplateSummary.js';

import { UsersCollection } from '../UsersCollection.js';
import { UsersEvents } from '../UsersEvents.js';

import { PageFoundation } from '../PageFoundation.js';

export class PhrasesPage extends PageFoundation
{
	/**
	 * @param {UsersCollection} users
	 */
	constructor (users)
	{
		super();

		this.users = users;

		this.identifier = jQuery(document.createElement('article'))
			.addClass('page_identifier')
			.text('phrases');

		this.summary = new TemplateSummary();

		this.container = jQuery(document.createElement('article'))
			.addClass('page_container')
			.append(this.summary.tag_base)
			.hide();

		this.users.listeners.on(UsersEvents.EVENT_REFRESH, () => this.refreshContent());
	}

	/**
	 * @override
	 */
	getIdentifier ()
	{
		return this.identifier;
	}

	/**
	 * @override
	 */
	getContainer ()
	{
		return this.container;
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
