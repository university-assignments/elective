
import { PartConstructor } from '../PartConstructor.js';

export class Content extends PartConstructor
{
	async initialize ()
	{
		this.tag_container = jQuery(document.createElement('section'))
			.addClass('container');

		this.tag_content = jQuery(document.createElement('main'))
			.addClass('bg-white')
			.addClass('rounded')

			.append(this.tag_container);
	}

	register (container)
	{
		this.tag_container.append(container);
	}
}
