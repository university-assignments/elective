import { Grid, html } from 'gridjs';

import { DataCollection } from '../../memory/DataCollection.js';
import { Events } from '../../memory/Events.js';

import { PageFoundation } from '../../PageFoundation.js';

export class SelectPage extends PageFoundation
{
	/**
	 * @param {DataCollection} selection
	 */
	constructor (selection)
	{
		super('table', 'select');

		this.selection = selection;
		this.selection.listeners.on(Events.EVENT_REFRESH, () => this.refreshContent());
	}

	// ===== ===== ===== ===== =====
	// private
	// ===== ===== ===== ===== =====

	/**
	 * @param { (string | boolean)[][] } data
	 */
	refreshTable (data)
	{
		if (typeof this.lib_table === 'object')
		{
			this.lib_table.destroy();
			delete this.lib_table;
		}

		const counter = data.map(values => values.length - 1);
		const maximum = Math.max(...counter);

		const users = Array(maximum).fill().map(function (_, value)
		{
			return {
				name: 'user' + value,
				formatter: (cell) => html(`
					<svg style="stroke-width: 2; stroke: #${ cell ? '6aff6a' : 'ff0033' };" class="svg_icon me-2" width="24" height="24" role="img">
						<use xlink:href="#yes"></use>
					</svg>
				`)
			};
		});

		this.lib_table = new Grid({
			columns: [ 'phrase', ...users ],
			data: data,

			pagination: {
				limit: 20
			},

			search: true,
			sort: true
		});

		this.lib_table.render(this.container.get(0));
	}

	refreshContent ()
	{
		const response = [];

		for (const [phrase, users] of this.selection.collection)
		{
			response.push([
				phrase,
				...users
			]);
		}

		this.refreshTable(response);
	}
}
