
import { Grid, h } from 'gridjs';

import { MethodsCaller } from '../../../plugins/di/MethodsCaller.js';
import { Files } from '../../../plugins/files/Files.mjs';

import { PageFoundation } from '../../PageFoundation.mjs';


export class FilesPage extends PageFoundation
{
	getData ()
	{
		const response = [];

		for (const [ _, file ] of this.files.all())
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

	refreshDisplay ()
	{
		if (typeof this.display === 'undefined')
		{
			this.display = new Grid();
			this.display.render(this.container.get(0));
		}

		this.display.updateConfig({
			columns: [ 'path', 'state', 'data' ],
			data: this.getData()
		});

		this.display.forceRender();
	}

	/**
	 * @param { MethodsCaller } caller
	 * @param { Files } files
	 */
	async initialize (caller, files)
	{
		this.caller = caller;
		this.files  = files;

		this.container.addClass('m-2');

		this.files.events.on(this.files.events.EVENT_REFRESH, () => this.refreshDisplay());
		this.refreshDisplay();
	}
}
