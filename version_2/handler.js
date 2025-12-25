import { Grid } from 'https://unpkg.com/gridjs?module';

const schedule = window.schedule = new class
{
	constructor ()
	{
		this.tag = document.getElementById('schedule');

		this.draw = document.createElement('canvas');
		this.tag.appendChild(this.draw);

		this.chart = new Chart(this.draw, {
			type: 'line',
			data: {
				labels: [ 'пусто' ],
				datasets: [{
					label: '#',
					data: [0],
					borderWidth: 1
				}]
			}
		});
	}

	refresh (data)
	{
		const filter = data.sort((arr1, arr2) => arr1[2] - arr2[2]);
		const keys   = filter.map(options => options[1]);
		const values = filter.map(options => options[2]);

		this.chart.data.labels = keys;
		this.chart.data.datasets[0].data = values;
		this.chart.update();
	}
};

const users = window.users = new class
{
	constructor ()
	{
		/**
		 * @private
		 * @type {HTMLElement}
		 */
		this.tag = document.getElementById('users');

		/**
		 * @private
		 * @type {Map<string, string[]>}
		 */
		this.collection = new Map();
	}

	refresh ()
	{
		this.tag.innerHTML = '';

		for (const [user, phrases] of this.collection)
		{
			this.tag.innerHTML += `
				<section class="user">
					<article class="info flex">
						<span class="name">${user}</span>

						<div>
							<!-- TODO: ПОЗЖЕ СДЕЛАТЬ НОРМАЛЬНО -->
							<input type="button" onclick="uv_change('${user}')" class="edit"   value="редактировать" />
							<input type="button" onclick="uv_remove('${user}')" class="remove" value="удалить" />
						<div>
					</article>

					<article class="phrases">
						${phrases.join(', ')}
					</article>
				</section>
			`;
		}
	}

	/**
	 * @param {string} user
	 * @param {string[]} phrases
	 */
	add (user, phrases)
	{
		this.collection.set(user, phrases);
	}

	get ()
	{
		return this.collection.entries();
	}
};

// ===== ===== ===== ===== =====
// TODO: ПОЗЖЕ СДЕЛАТЬ НОРМАЛЬНО
// ===== ===== ===== ===== =====

window.uv_change = function (user)
{
	tags_options.user_name.value   = user;
	tags_options.user_phrase.value = users.collection.get(user).join(', ');
};

window.uv_remove = function (user)
{
	users.collection.delete(user);
	users.refresh();

	counter_refresh();
};

// ===== ===== ===== ===== =====
// /TODO
// ===== ===== ===== ===== =====

const counter = window.counter = new class
{
	constructor ()
	{
		this.tag = document.getElementById('counter');

		this.refresh([
			[ 'пусто', 'пусто', 'пусто' ]
		]);
	}

	refresh (data)
	{
		if (typeof this.lib !== 'undefined')
		{
			this.lib.destroy();
		}

		this.lib = new Grid();
		this.lib.render(this.tag);

		this.lib.updateConfig({
			columns: [ 'идентификатор', 'название', 'количество' ],
			data: data,

			search: true,
			sort: true
		});

		// TODO: ПОЗЖЕ СДЕЛАТЬ НОРМАЛЬНО
		schedule.refresh(data);
	}
};

// ===== ===== ===== ===== =====
// ===== ===== ===== ===== =====

const tags_options = {
	user_name:   document.getElementById('user_name'),
	user_rules:  document.getElementById('user_rules'),
	user_phrase: document.getElementById('user_phrase'),
	user_add:    document.getElementById('user_add')
};

const editor_ace = window.editor_ace = ace.edit(tags_options.user_rules, {
	theme: 'ace/theme/monokai',
	mode: 'ace/mode/javascript',

	fontSize: 20
});

function counter_refresh ()
{
	const phrase_counter = {};

	for (const [user, phrases] of users.get())
	{
		phrases.forEach(phrase => typeof phrase_counter[phrase] === 'undefined'
			? phrase_counter[phrase] = 1
			: phrase_counter[phrase]++);
	}

	const phrases_response = [];

	for (const phrase in phrase_counter)
	{
		phrases_response.push([
			phrases_response.length,
			phrase,
			phrase_counter[phrase]
		]);
	}

	counter.refresh(phrases_response);
}

tags_options.user_add.onclick = function ()
{
	const user_name   = tags_options.user_name.value;
	let user_rules  = editor_ace.getValue();
	const user_phrase = tags_options.user_phrase.value;

	if (!user_name || !user_rules || !user_phrase)
	{
		return;
	}

	const converted_phrases = eval(user_rules);

	users.add(user_name, converted_phrases);
	users.refresh();

	counter_refresh();
};
