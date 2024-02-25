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
		return jQuery(document.createElement('article'))
			.attr('id', 'new_user')
			.hide()

			.append(`
				<div>
					<input id="user_name" placeholder="пользователь" />
				</div>

				<div>
					<div id="user_rules"></div>
				</div>

				<div>
					<textarea id="user_phrase" placeholder="фразы"></textarea>
				</div>

				<div>
					<button id="user_send">отправить</button>
				</div>
			`);
	}
}
