
import { Invoker } from '../../plugins/invoker/Invoker.mjs';

import { PageFoundation } from '../PageFoundation.mjs';


export class ExecutePage extends PageFoundation
{
	initializeTags ()
	{
		this.tag_editor = jQuery(document.createElement('article'))
			.css('height', '100%')
			.css('width',  '100%')

			.css('position', 'absolute')
			.css('left',     '0')
			.css('top',      '0');

		this.tag_launch = jQuery(document.createElement('article'))
			.css('position', 'absolute')
			.css('bottom',   '20px')
			.css('right',    '20px')
			.css('z-index',  '10')

			.addClass('bg-success')
			.addClass('text-white')

			.addClass('rounded')
			.addClass('px-3')
			.addClass('py-2')

			.text('run');

		this.tag_container = jQuery(document.createElement('section'))
			.css('position', 'relative')

			.css('height', '100%')
			.css('width',  '100%')

			.append(this.tag_launch)
			.append(this.tag_editor);

		this.tag_page
			.append(this.tag_container);
	}

	initializeEditor ()
	{
		this.editor = ace.edit(this.tag_editor.get(0), {
			theme: 'ace/theme/monokai',
			mode: 'ace/mode/javascript',

			fontSize: 20
		});

		this.editor.setValue([
			'',
			'class UserCode',
			'{',
			'    /**',
			'     * ',
			'     */',
			'    constructor ()',
			'    {',
			'        // code ...',
			'    }',
			'}',
			'',
			'this.invoker.runClass(UserCode);',
			''
		].join('\r\n'));
	}

	runCode ()
	{
		eval(this.editor.getValue());
	}

	listenerClicks ()
	{
		this.tag_launch.on('click', () => this.runCode());
	}

	// ===== ===== ===== ===== =====

	/**
	 * @param { Invoker } invoker
	 */
	async initialize (invoker)
	{
		this.invoker = invoker;

		this.initializeTags();
		this.initializeEditor();
		this.listenerClicks();
	}
}
