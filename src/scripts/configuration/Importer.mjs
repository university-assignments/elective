
/**
 * @typedef { import('../memory/QueryOptions').QueryOptions } QueryOptions
 * 
 * @typedef { import('../memory/phrases/TranslatedPhrases').TranslatedPhrases } TranslatedPhrases
 * @typedef { import('../memory/phrases/SectionsPhrases').SectionsPhrases } SectionsPhrases
 * 
 * @typedef { import('../memory/users/UserImport').UserImport } UserImport
 */

import { import_file_auto } from '../import/auto.js';


export class Importer
{
	/**
	 * @param {QueryOptions} search
	 * 
	 * @param {TranslatedPhrases} translated
	 * @param {SectionsPhrases} sections
	 * 
	 * @param {UserImport} users
	 */
	static async files (search, translated, sections, users)
	{
		if (search.translated.length > 0)
		{
			const file_translated = await import_file_auto(search.translated, 'left');

			file_translated.forEach(function (value)
			{
				translated.dictionary.set(value[0], value[1]);
			});

			translated.trigger(translated.EVENT_REFRESH);
		}

		if (search.sections.length > 0)
		{
			const file_sections = await import_file_auto(search.sections, 'left');

			file_sections.forEach(function (value)
			{
				sections.dictionary.set(value[0], value[1]);
			});

			sections.trigger(sections.EVENT_REFRESH);
		}

		if (search.phrases.length > 0)
		{
			users.importPhrases(
				await import_file_auto(search.phrases, 'left')
			);
		}

		if (search.selection.length > 0)
		{
			users.importSurvey(
				await import_file_auto(search.selection, 'top-left')
			);
		}
	}
}
