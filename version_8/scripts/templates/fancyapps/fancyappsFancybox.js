
/**
 * @typedef { import('./FancyappsFancyboxOptions').FancyappsFancyboxOptions } FancyappsFancyboxOptions
 */

import { Fancybox } from "@fancyapps/ui";


/**
 * @param {FancyappsFancyboxOptions} options
 */
export function fancyappsFancybox (options)
{
	const initialize = options.initialize;
	const destroy    = options.destroy;
	const content    = options.content;

	const container = jQuery(content);

	const fancybox = new Fancybox([
		{
			type: 'html',
			src: container.get(0)
		}
	]);

	fancybox.on('ready', () => initialize.call(options, container));
	fancybox.on('destroy', () => destroy.call(options, container));
}
