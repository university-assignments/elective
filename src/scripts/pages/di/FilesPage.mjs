
import { Grid, h } from 'gridjs';

import { Files } from '../../plugins/files/Files.mjs';

import { PageFoundation } from '../PageFoundation.mjs';


export class FilesPage extends PageFoundation
{
	/**
	 * @param {FileDownloader[]} files
	 */
	getData (files)
	{
		const response = [];

		for (const file of files)
		{
			response.push([
				file.full_path,

				file.state
					? h('span', { className: 'fw-bold text-success' }, 'LOADED')
					: h('span', { className: 'fw-bold text-danger'  }, 'ERROR'),

				file.data
					? file.data.length
					: h('span', { className: 'fw-bold text-primary' }, 'EMPTY')
			]);
		}

		return response;
	}

	/**
	 * @param {string} class_name
	 * @param {FileDownloader[]} files
	 */
	refreshDisplay (class_name, files)
	{
		const display = new Grid({
			columns: [ 'path', 'state', 'data' ],
			data: this.getData(files)
		});

		const name = jQuery(document.createElement('article'))
			.html('<h3>' + class_name + '</h3>');

		const data = jQuery(document.createElement('article'));
		display.render(data.get(0));

		this.container.append(
			jQuery(document.createElement('section'))
				.addClass('mb-2')

				.append(name)
				.append(data)
		);
	}

	refresh ()
	{
		/** @type { Map<string, FileDownloader[]> } */
		const groups = new Map();

		for (const file of this.files.all().values())
		{
			const class_name = file.constructor.name;

			groups.has(class_name)
				? groups.get(class_name).push(file)
				: groups.set(class_name, [ file ]);
		}

		this.container.html('');

		for (const [ class_name, files ] of groups)
		{
			this.refreshDisplay(class_name, files);
		}
	}

	/**
	 * @param { Files } files
	 */
	async initialize (files)
	{
		this.files = files;

		this.files.events.on(this.files.events.EVENT_REFRESH, () => this.refresh());
		this.refresh();
	}
}
