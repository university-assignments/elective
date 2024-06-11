
import { TemplateSummary } from '../../templates/TemplateSummary.js';

import { PageContainer } from '../PageContainer.mjs';

import { Database } from '../../database/Database.mjs';

export class CounterPage extends PageContainer
{
	/**
	 * @param { Database } database
	 * @param { string[] } columns
	 * @param { string } query
	 */
	async initialize (database, columns, query)
	{
		this.summary = new TemplateSummary();
		this.tag_container.append(this.summary.tag_base);

		this.database = database;
		this.events   = database.events;
		this.columns  = columns;
		this.query    = query;

		this.events.on(this.events.EVENT_REFRESH, () => this.refreshContent());
		this.refreshContent();
	}

	// ===== ===== ===== ===== =====
	// private
	// ===== ===== ===== ===== =====

	/**
	 * @private
	 */
	refreshContent ()
	{
		const response  = this.database.db.selectArrays(this.query);
		const converted = new Map();

		for (const data of response)
		{
			converted.set(data[0], data[1]);
		}

		this.summary.refresh(this.columns, converted);
	}
}
