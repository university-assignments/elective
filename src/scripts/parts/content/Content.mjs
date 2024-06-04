
import { InitializerInterface } from '../../plugins/initializer/InitializerInterface.mjs';

export class Content extends InitializerInterface
{
	async initialize ()
	{
		this.tag_container = jQuery(document.createElement('section'))
			.addClass('container')
			.addClass('p-2');

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
