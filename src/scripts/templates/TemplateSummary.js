import jQuery from 'jquery';
import { Grid } from 'gridjs';
import { Chart, registerables } from 'chart.js';

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
	 * @param {Map<string, number>} data
	 */
	refresh (data)
	{
		const entries = Object.fromEntries(data);

		this.refreshChart(entries);
		this.refreshTable(entries);
	}

	// ===== ===== ===== ===== =====
	// Chart
	// ===== ===== ===== ===== =====

	initializeChart ()
	{
	}

	/**
	 * @param { {[key: string]: number} } entries
	 */
	refreshChart (entries)
	{
		if (typeof this.lib_chart === 'object')
		{
			this.lib_chart.destroy();
		}

		Chart.register(...registerables);
		this.lib_chart = new Chart(this.tag_chart_canvas, {
			type: this.lib_chart_type
		});

		this.lib_chart.data.labels = jQuery.map(entries, (_, phrase) => phrase);
		this.lib_chart.data.datasets[0] = {
			label: '#',
			data: jQuery.map(entries, amount => amount)
		};
		this.lib_chart.render();
	}

	// ===== ===== ===== ===== =====
	// Table
	// ===== ===== ===== ===== =====

	initializeTable ()
	{
		this.lib_table = new Grid();

		this.lib_table.render(this.tag_table.get(0));
	}

	/**
	 * @param { {[key: string]: number} } entries
	 */
	refreshTable (entries)
	{
		if (typeof this.lib_table === 'undefined')
		{
			this.initializeTable();
		}

		const data_table = jQuery
			.map(entries, (amount, phrase) => [[phrase, amount]])
			.map((values, index) => [index, ...values]);

		this.lib_table.updateConfig({
			columns: [ '#', 'phrase', 'amount' ],
			data: data_table,

			pagination: {
				limit: 20
			},

			search: true,
			sort: true
		});

		this.lib_table.forceRender();
	}
}
