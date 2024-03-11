import jQuery from 'jquery';
import { Fancybox } from 'fancyappsui';

import { UsersCollection } from '../memory/users/UsersCollection.js';

import { PageFoundation } from '../PageFoundation.js';

export class SettingsPage extends PageFoundation
{
	/**
	 * @param {UsersCollection} users
	 */
	constructor (users)
	{
		super('settings', 'settings');

		this.container.append(
			jQuery(document.createElement('button'))
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
