import jQuery from 'jquery';

export class TagPopup
{
	constructor ()
	{
		this.tag_base = jQuery(document.createElement('section'))
			.addClass('popup')
			.append(this.newUser());
	}

	newUser ()
	{
		let editor_ace_tag;

		const response = jQuery(document.createElement('article'))
			.attr('id', 'new_user')
			.hide()

			.append(`
				<div>
					<input id="user_name" placeholder="пользователь" />
				</div>
			`)

			.append(
				jQuery(document.createElement('div'))
					.addClass('user_rules_wrap')
					.append(
						editor_ace_tag = jQuery(document.createElement('div'))
							.attr('id', 'user_rules')
				)
			)

			.append(`
				<div>
					<textarea id="user_phrase" placeholder="фразы"></textarea>
				</div>

				<div>
					<button id="user_send">отправить</button>
				</div>
			`);

		window.editor_ace = window.ace.edit(editor_ace_tag[0], {
			theme: 'ace/theme/monokai',
			mode: 'ace/mode/javascript',

			fontSize: 20
		});

		window.editor_ace.setValue(`user_phrases_value.indexOf('->') >= 0
	? [...new Set(user_phrases_value.toLowerCase().replace(/->/g, '').split('\\n').map(value => value.trim()))].filter(value => value)
	: [...new Set(user_phrases_value.toLowerCase().replace(/\\n/g, '').split(',').map(value => value.trim()))].filter(value => value);
`);

		return response;
	}
}
