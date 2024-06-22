
import { FileJSON } from '../../plugins/files/json/FileJSON.mjs';
import { FileCSV } from '../../plugins/files/excel/FileCSV.mjs';
import { Files } from '../../plugins/files/Files.mjs';

import { Profiles } from '../../tables/profiles/Profiles.mjs';
import { Links } from '../../tables/links/Links.mjs';

import { Phrases } from '../../tables/phrases/Phrases.mjs';
import { Selected } from '../../tables/selected/Selected.mjs';
import { Poll } from '../../tables/poll/Poll.mjs';


export class ImporterVersion1
{
	/**
	 * @param { Files } files
	 */
	static async files (files)
	{
		const storage_path = '../storage';

		// ===== ===== ===== ===== =====

		const profiles_path = storage_path + '/users.json';
		const profiles_info = new FileJSON(profiles_path);
		const profiles_file = await files.download(profiles_info);
		const profiles_data = profiles_file.converted;

		// ===== ===== ===== ===== =====

		const sections_path = storage_path + '/tags.json';
		const sections_info = new FileJSON(sections_path);
		const sections_file = await files.download(sections_info);
		const sections_data = sections_file.converted;

		// ===== ===== ===== ===== =====

		const poll_path = storage_path + '/security.json';
		const poll_info = new FileJSON(poll_path);
		const poll_file = await files.download(poll_info);
		const poll_data = poll_file.converted;

		// ===== ===== ===== ===== =====

		const translated_path = storage_path + '/translated.csv';
		const translated_info = new FileCSV(translated_path);

		translated_info.separator_value = ',';

		const translated_file = await files.download(translated_info);
		const translated_data = translated_file.converted;

		// ===== ===== ===== ===== =====

		return {
			profiles:   profiles_data,
			translated: translated_data,
			sections:   sections_data,

			poll: poll_data
		};
	}

	/**
	 * @param { Profiles } profiles
	 * @param { Links } links
	 * 
	 * @param { Phrases } phrases
	 * @param { Selected } selected
	 * @param { Poll } poll
	 * @param { Files } files
	 */
	static async initialize (profiles, links, phrases, selected, poll, files)
	{
		const downloader = await this.files(files);

		const translated_map = new Map(downloader.translated);
		const profiles_ids = new Map();
		const phrases_ids = new Map();

		// ===== ===== ===== ===== =====
		// profiles
		// ===== ===== ===== ===== =====

		for (const profile_name in downloader.profiles)
		{
			profiles_ids.set(profile_name, profiles.create(profile_name));
		}

		// ===== ===== ===== ===== =====
		// links
		// ===== ===== ===== ===== =====

		// Ужас, но я должен был написать за 1 час.
		links.create(2, 'https://cdn1.mindomo.com/resources/favicon/favicon-32x32.png', 'mindomo', 'https://www.mindomo.com/mindmap/information-da6f92a30648424bb0a7b4ac27addd60');
		links.create(4, 'https://www.mindmeister.com/mm_favicon.ico', 'mindmeister', 'https://www.mindmeister.com/ru/3289952532/information-security');
		links.create(5, 'https://www.mindmeister.com/mm_favicon.ico', 'mindmeister', 'https://www.mindmeister.com/app/map/3301962240');
		links.create(6, 'https://www.mindmeister.com/mm_favicon.ico', 'mindmeister', 'https://www.mindmeister.com/ru/3289953009/information-security');

		// Не известно, кто ее выполнил
		links.create(12, 'https://www.mindmeister.com/mm_favicon.ico', 'mindmeister', 'https://www.mindmeister.com/app/map/3292370076');

		// ===== ===== ===== ===== =====
		// phrases
		// ===== ===== ===== ===== =====

		for (const profile_name in downloader.profiles)
		{
			const phrases_array = downloader.profiles[profile_name];

			for (let english of phrases_array)
			{
				english = english.toLocaleLowerCase();

				// Проверить существует ли фраза в базе
				if (phrases_ids.has(english))
				{
					continue;
				}

				const russian = translated_map.has(english)
					? translated_map.get(english).toLocaleLowerCase()
					: '';

				const sections = typeof downloader.sections[english] === 'object'
					? downloader.sections[english]
					: [];

				phrases_ids.set(english, phrases.create(english, russian, sections));
			}
		}

		// ===== ===== ===== ===== =====
		// selected
		// ===== ===== ===== ===== =====

		for (const profile_name in downloader.profiles)
		{
			for (let english of downloader.profiles[profile_name])
			{
				english = english.toLocaleLowerCase();

				selected.create(profiles_ids.get(profile_name), phrases_ids.get(english));
			}
		}

		// ===== ===== ===== ===== =====
		// poll
		// ===== ===== ===== ===== =====

		for (const phrase_name in downloader.poll)
		{
			const phrase_id = phrases_ids.get(phrase_name.toLocaleLowerCase());

			if (!phrase_id)
			{
				throw new Error(`[importers | v1 | poll] phrase_name: ${phrase_name}`);
			}

			const profile_ids = downloader.poll[phrase_name];

			profile_ids.forEach(function (poll_state, profile_id)
			{
				poll.create(profile_id + 1, phrase_id, poll_state);
			});
		}
	}
}
