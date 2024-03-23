
/**
 * @typedef { import('jquery') } jQuery
 * 
 * @typedef { import('../../memory/users/user/UserData').UserData } UserData
 * @typedef { import('../../memory/users/UserCollection').UserCollection } UserCollection
 */

import { Fancybox } from 'fancyappsui';

import { PageFoundation } from '../../PageFoundation.js';


export class UsersPage extends PageFoundation
{
	/**
	 * @param {UserCollection} users
	 */
	constructor (users)
	{
		super();

		this.users = users;
		this.users.on(this.users.EVENT_REFRESH, () => this.refreshContent());
	}

	/**
	 * @private
	 * 
	 * @param {UserData} user
	 */
	editUser (user)
	{
		const phrases = user.phrases;
		const name    = user.name;

		const __icon_state = jQuery(document.createElement('img'))
			.addClass('user_icon_state')
			.attr('src', './icons/left-2-svgrepo-com.svg')
			.attr('alt', 'state');

		const __action_state = jQuery(document.createElement('article'))
			.addClass('user_action')
			.append(__icon_state);

		// ===== ===== ===== ===== =====

		const __icon_edit = jQuery(document.createElement('img'))
			.attr('src', './icons/edit-svgrepo-com.svg')
			.attr('alt', 'edit');

		const __action_edit = jQuery(document.createElement('article'))
			.addClass('user_action')
			.append(__icon_edit);

		// ===== ===== ===== ===== =====

		const __icon_delete = jQuery(document.createElement('img'))
			.attr('src', './icons/delete-svgrepo-com.svg')
			.attr('alt', 'delete');

		const __action_delete = jQuery(document.createElement('article'))
			.addClass('user_action')
			.append(__icon_delete);

		// ===== ===== ===== ===== =====

		const __actions = jQuery(document.createElement('section'))
			.addClass('user_actions')
			.addClass('flex')
			.append(__action_edit)
			.append(__action_delete)
			.append(__action_state);

		const __name = jQuery(document.createElement('span'))
			.addClass('user_name')
			.text(name);

		const __header = jQuery(document.createElement('article'))
			.addClass('user_header')
			.addClass('flex')
			.append(__name)
			.append(__actions);

		// ===== ===== ===== ===== =====

		const __phrases = jQuery(document.createElement('p'))
			.addClass('user_phrase')
			.addClass('remove_indents')
			.text(phrases.join(', '));

		const __content = jQuery(document.createElement('article'))
			.addClass('user_content')
			.append(__phrases);

		// ===== ===== ===== ===== =====

		const __container = jQuery(document.createElement('section'))
			.addClass('user')
			.addClass('hide')
			.append(__header)
			.append(__content);

		// TODO: доделать
		const users = this.users;
		__action_edit.on('click', function ()
		{
			Fancybox.show([{
				src: "#new_user",
				type: "inline"
			}]);

			const user_name   = document.getElementById('user_name');
			const user_phrase = document.getElementById('user_phrase');

			user_name.value   = user;
			user_phrase.value = phrases.join(', ');

			jQuery('#user_send').on('click', function ()
			{
				users.delete(name, false);

				const user_name_value    = user_name.value;
				const user_rules_value   = window.editor_ace.getValue();
				const user_phrases_value = user_phrase.value;

				if (!user_name_value || !user_rules_value || !user_phrases_value)
				{
					alert('Один или несколько пунктов пустой');
					return;
				}
				
				const _user = users.create(user_name.value, false);
				_user.addPhrases(eval(user_rules_value));
			});
		});

		__action_delete.on('click', () => this.users.delete(user));
		__action_state.on('click', () => __container.toggleClass('hide'));

		// ===== ===== ===== ===== =====

		this.container.append(__container);
	}

	addUser ()
	{
		const __name = jQuery(document.createElement('span'))
			.addClass('user_name')
			.text('add new user');

		const __header = jQuery(document.createElement('article'))
			.addClass('user_register')
			.append(__name);

		const __container = jQuery(document.createElement('section'))
			.addClass('user')
			.append(__header);

		// TODO: доделать
		const users = this.users;
		__container.on('click', function ()
		{
			Fancybox.show([{
				src: "#new_user",
				type: "inline"
			}]);

			const user_name   = document.getElementById('user_name');
			const user_phrase = document.getElementById('user_phrase');

			user_name.value   = '';
			user_phrase.value = '';

			jQuery('#user_send').on('click', function ()
			{
				const user_name_value    = user_name.value;
				const user_rules_value   = window.editor_ace.getValue();
				const user_phrases_value = user_phrase.value;

				if (!user_name_value || !user_rules_value || !user_phrases_value)
				{
					alert('Один или несколько пунктов пустой');
					return;
				}

				users.register(user_name.value, eval(user_rules_value));
			});
		});

		this.container.append(__container);
	}

	/**
	 * @private
	 */
	refreshContent ()
	{
		this.container.html('');

		this.users.all().forEach(user => this.editUser(user));

		this.addUser();
	}
}
