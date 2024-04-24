
/**
 * @typedef { import('jquery') } jQuery
 * 
 * @typedef { import('../../memory/users/user/UserData').UserData } UserData
 * @typedef { import('../../memory/users/UserCollection').UserCollection } UserCollection
 */

import { fancyappsFancybox } from '../../templates/fancyapps/fancyappsFancybox.js';

import { PageFoundation } from '../PageFoundation.js';


export class UsersPage extends PageFoundation
{
	/**
	 * @param {UserCollection} users
	 */
	async initialize (users)
	{
		this.users = users;
		this.users.on(this.users.EVENT_REFRESH, () => this.refreshContent());

		this.refreshContent();
	}

	/**
	 * @private
	 * 
	 * @param {?UserData} user
	 */
	editUser (user)
	{
		const phrases = (user && user.phrases) || [];
		const name    = (user && user.name   ) || '';

		const users = this.users;

		fancyappsFancybox({

			initialize (container)
			{
				/** @type { JQuery<HTMLInputElement> } */
				const user_name = container.find('#user_name');

				/** @type { JQuery<HTMLTemplateElement> } */
				const user_rules = container.find('#user_rules');

				/** @type { JQuery<HTMLTextAreaElement> } */
				const user_phrases = container.find('#user_phrases');

				/** @type { JQuery<HTMLButtonElement> } */
				const user_send = container.find('#user_send');

				user_name.val(name);
				user_phrases.val(phrases.join(', '));

				const editor_ace = this.editor_ace = window.ace.edit(user_rules.get(0), {
					theme: 'ace/theme/monokai',
					mode: 'ace/mode/javascript',

					fontSize: 20
				});

				editor_ace.setValue([
					"value_user_phrases.indexOf('->') >= 0",
					"    ? [...new Set(value_user_phrases.toLowerCase().replace(/->/g, '').split('\\n').map(value => value.trim()))].filter(value => value)",
					"    : [...new Set(value_user_phrases.toLowerCase().replace(/\\n/g, '').split(',').map(value => value.trim()))].filter(value => value);",
				].join('\r\n'));

				user_send.on('click', function ()
				{
					const value_user_name    = user_name.val();
					const value_user_rules   = editor_ace.getValue();
					const value_user_phrases = user_phrases.val();

					if (!value_user_name || !value_user_rules || !value_user_phrases)
					{
						alert('Один или несколько пунктов пустой');
						return;
					}

					if (user)
					{
						users.delete(name, false);
					}

					const new_user = users.create(value_user_name, false);
					new_user.addPhrases(eval(value_user_rules));

					users.trigger(users.EVENT_REFRESH);
				});
			},

			destroy (container)
			{
				this.editor_ace.destroy();
			},

			content: `
				<section class="w-75">
					<article>
						<input id="user_name" placeholder="пользователь" />
					</article>

					<article class="user_rules_wrap">
						<div id="user_rules"></div>
					</article>

					<article>
						<textarea id="user_phrases"></textarea>
					</article>

					<article>
						<button id="user_send">отправить</button>
					</article>
				</section>
			`

		});
	}

	/**
	 * @private
	 * 
	 * @param {UserData} user
	 */
	viewUser (user)
	{
		const phrases = user.phrases;
		const name    = user.name;

		const container = jQuery(`
			<section class="m-2 border rounded-4">
				<article class="px-3 py-2 d-flex flex-row justify-content-between">
					<div>
						<h4 class="m-0">${name}</h4>
					</div>

					<div>
						<img class="user_action" alt="edit"   src="./icons/edit-svgrepo-com.svg" />
						<img class="user_action" alt="delete" src="./icons/delete-svgrepo-com.svg" />
						<img class="user_action user_icon_state" data-bs-toggle="collapse" data-bs-target="#user_${name}" alt="state" src="./icons/left-2-svgrepo-com.svg" />
					</div>
				</article>

				<article id="user_${name}" class="px-3 py-2 border-top collapse">
					${phrases.join(', ')}
				</article>
			</section
		`);

		container.find('[alt=edit]').on('click', () => this.editUser(user));
		container.find('[alt=delete]').on('click', () => this.users.delete(name));

		return container;
	}

	/**
	 * @private
	 */
	addUser ()
	{
		const container = jQuery(`
			<section class="m-2 p-2 border rounded-4 text-center">
				<h4>add new user</h4>
			</section>
		`);

		container.on('click', () => this.editUser());

		return container;
	}

	/**
	 * @private
	 */
	refreshContent ()
	{
		this.container.html('');

		this.container.append(this.users.all().map(user => this.viewUser(user)));
		this.container.append(this.addUser());
	}
}
