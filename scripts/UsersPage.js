import jQuery from 'jquery';

import { UsersCollection } from './UsersCollection.js';
import { UsersEvents } from './UsersEvents.js';

import { PageFoundation } from './PageFoundation.js';

export class UsersPage extends PageFoundation
{
	/**
	 * @param {UsersCollection} users
	 */
	constructor (users)
	{
		super();

		this.users = users;

		this.identifier = jQuery(document.createElement('article'))
			.addClass('page_identifier')
			.text('users');

		this.container = jQuery(document.createElement('article'))
			.addClass('page_container')
			.hide();

		this.users.listeners.on(UsersEvents.EVENT_REFRESH, () => this.refreshContent());
	}

	/**
	 * @override
	 */
	getIdentifier ()
	{
		return this.identifier;
	}

	/**
	 * @override
	 */
	getContainer ()
	{
		return this.container;
	}

	/**
	 * @private
	 * 
	 * @param {string[]} phrases
	 * @param {string} user
	 */
	addUser (phrases, user)
	{
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
			.text(user);

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
		__action_edit.on('click', () => alert('не работает'));

		__action_delete.on('click', () => this.users.delete(user));
		__action_state.on('click', () => __container.toggleClass('hide'));

		// ===== ===== ===== ===== =====

		this.container.append(__container);
	}

	/**
	 * @private
	 */
	refreshContent ()
	{
		this.container.html('');
		this.users.collection.forEach((phrases, user) => this.addUser(phrases, user));
	}
}
