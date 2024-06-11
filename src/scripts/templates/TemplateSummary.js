import jQuery from 'jquery';
import { Grid } from 'gridjs';
import { Chart } from 'chart.js';

export class TemplateSummary
{
	constructor ()
	{
		this.tag_chart_canvas = jQuery(document.createElement('canvas'));

		this.tag_chart = jQuery(document.createElement('article'))
			.addClass('phrases')
			.append(this.tag_chart_canvas);

		this.tag_table = jQuery(document.createElement('article'))
			.addClass('phrases');

		this.tag_base = jQuery(document.createElement('section'))
			.append(this.tag_chart)
			.append(this.tag_table);

		this.lib_chart_type = 'line';
	}

	/**
	 * @param { string } columns
	 * @param { Map<string, number> } data
	 */
	refresh (columns, data)
	{
		const entries = Object.fromEntries(data);

		this.refreshTable(columns, entries);
	}

	// ===== ===== ===== ===== =====
	// Chart
	// ===== ===== ===== ===== =====

	initializeChart ()
	{
	}

	/**
	 * @param { { [key: string]: number } } entries
	 */
	refreshChart (entries)
	{
		if (typeof this.lib_chart === 'object')
		{
			this.lib_chart.destroy();
		}

		this.lib_chart = new Chart(this.tag_chart_canvas, {
			type: this.lib_chart_type
		});

		this.lib_chart.data.labels = jQuery.map(entries, (_, field) => field);
		this.lib_chart.data.datasets[0] = {
			label: '#',
			data: jQuery.map(entries, amount => amount)
		};
		this.lib_chart.render();
	}

	// ===== ===== ===== ===== =====
	// Table
	// ===== ===== ===== ===== =====

	synchronizeChart (store)
	{
		const state = store.getState();
		const data  = state.data;

		if (!data)
		{
			return;
		}

		const rows = data.rows;
		const view = {};

		for (const row of rows)
		{
			const cells = row.cells;

			const field  = cells[1].data;
			const amount = cells[2].data;

			view[field] = amount;
		}

		this.refreshChart(view);
	}

	initializeTable ()
	{
		this.lib_table = new Grid();

		this.lib_table.render(this.tag_table.get(0));

		const store = this.lib_table.config.store;
		store.subscribe(() => this.synchronizeChart(store));
	}

	/**
	 * @param { string[] } columns
	 * @param { { [key: string]: number } } entries
	 */
	refreshTable (columns, entries)
	{
		if (typeof this.lib_table === 'undefined')
		{
			this.initializeTable();
		}

		const data_table = jQuery
			.map(entries, (amount, field) => [[field, amount]])
			.map((values, index) => [index, ...values]);

		this.lib_table.updateConfig({
			columns: columns,
			data: data_table,

			search: true,
			sort: true
		});

		this.lib_table.forceRender();
	}
}
