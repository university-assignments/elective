import jQuery from 'jquery';
import { Fancybox } from 'fancyappsui';

import { DataCollection } from '../memory/DataCollection.js';

import { PageFoundation } from '../PageFoundation.js';

export class SettingsPage extends PageFoundation
{
	/**
	 * @param {DataCollection} users
	 */
	constructor (users)
	{
		super();

		this.container.append(
			jQuery(document.createElement('button'))
				.addClass('btn-primary')
				.addClass('btn')

				.on('click', function ()
				{
					Fancybox.show([{
						src: "#list_user",
						type: "inline"
					}]);

					jQuery('#list_user_array').text(
						JSON.stringify(
							Object.fromEntries(
								users.collection
							)
						)
					);
				})

				.text('list user')
		);
	}
}
