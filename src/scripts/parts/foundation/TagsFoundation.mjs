
import { InitializerInterface } from '../../plugins/initializer/InitializerInterface.mjs';


export class TagsFoundation extends InitializerInterface
{
	async initialize ()
	{
		this.root = jQuery(document.createElement('root'))
			.addClass('d-flex')
			.addClass('flex-column')
			.addClass('flex-md-row')

			.addClass('gap-2')
			.addClass('p-2');

		this.body = jQuery(document.body)
			.append(this.root);
	}
}
