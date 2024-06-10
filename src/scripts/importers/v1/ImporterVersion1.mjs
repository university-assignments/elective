
import { FileJSON } from '../../plugins/files/json/FileJSON.mjs';
import { FileCSV } from '../../plugins/files/excel/FileCSV.mjs';
import { Files } from '../../plugins/files/Files.mjs';

import { ProfilesPhrases } from '../../database/profiles_phrases/ProfilesPhrases.mjs';
import { Profiles } from '../../database/profiles/Profiles.mjs';
import { Phrases } from '../../database/phrases/Phrases.mjs';


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

		const translated_path = storage_path + '/translated.csv';
		const translated_info = new FileCSV(translated_path);

		translated_info.separator_value = ',';

		const translated_file = await files.download(translated_info);
		const translated_data = translated_file.converted;

		// ===== ===== ===== ===== =====

		return {
			profiles: profiles_data,
			sections: sections_data,
			translated: translated_data
		};
	}

	/**
	 * @param { ProfilesPhrases } profiles_phrases
	 * @param { Profiles } profiles
	 * @param { Phrases } phrases
	 * @param { Files } files
	 */
	static async initialize (profiles_phrases, profiles, phrases, files)
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
		// phrases
		// ===== ===== ===== ===== =====

		for (const profile_name in downloader.profiles)
		{
			const phrases_array = downloader.profiles[profile_name];

			for (const english of phrases_array)
			{
				// Проверить существует ли фраза в базе
				if (phrases_ids.has(english))
				{
					continue;
				}

				const russian = translated_map.has(english)
					? translated_map.get(english)
					: '';

				const sections = typeof downloader.sections[english] === 'object'
					? downloader.sections[english].join(', ')
					: '';

				phrases_ids.set(english, phrases.create(english, russian, sections));
			}
		}
	}
}
