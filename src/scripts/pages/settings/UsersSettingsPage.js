
/**
 * @typedef { import('jquery') } jQuery
 * 
 * @typedef { import('../../memory/users/UserCollection').UserCollection } UserCollection
 */

import { Fancybox } from '@fancyapps/ui';

import { PageFoundation } from '../PageFoundation.mjs';


export class UsersSettingsPage extends PageFoundation
{
	/**
	 * @param {UserCollection} users
	 */
	async initialize (users)
	{
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
