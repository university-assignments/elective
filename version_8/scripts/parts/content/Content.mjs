
import { InitializerInterface } from '../../plugins/initializer/InitializerInterface.mjs';

export class Content extends InitializerInterface
{
	async initialize ()
	{
		this.tag_content = jQuery(document.createElement('main'))
			.addClass('bg-white')
			.addClass('rounded')

			.addClass('h-100');
	}

	register (container)
	{
		this.tag_content.append(container);
	}
}
