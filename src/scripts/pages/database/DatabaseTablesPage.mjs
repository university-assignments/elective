
import { Database } from '../../database/Database.mjs';

import { PageFoundation } from '../PageFoundation.mjs';

import { DatabaseTablesPart } from './parts/DatabaseTablesPart.mjs';
import { DatabaseTablePart } from './parts/DatabaseTablePart.mjs';


export class DatabaseTablesPage extends PageFoundation
{
	initializeTags ()
	{
		this.tables_container = jQuery(document.createElement('div'))
			.addClass('mb-2');

		this.table_container = jQuery(document.createElement('div'))
			.addClass('mb-2');

		this.container
			.append(this.tables_container)
			.append(this.table_container);
	}

	/**
	 * @param {Database} database
	 */
	async initialize (database)
	{
		this.initializeTags();

		const tables_options = name => {
			return {
				onClick: () => {
					this.table.selected = name;
					this.table.refresh();
				}
			};
		};

		this.tables = new DatabaseTablesPart(database, this.tables_container, tables_options);
		this.table  = new DatabaseTablePart (database, this.table_container );

		database.events.on(database.events.EVENT_REFRESH, () => {
			this.tables.refresh();
			this.table.refresh();
		});

		this.tables.refresh();
	}
}
