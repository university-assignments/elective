
import { ProfilesPhrases } from '../../database/profiles_phrases/ProfilesPhrases.mjs';
import { Profiles } from '../../database/profiles/Profiles.mjs';
import { Phrases } from '../../database/phrases/Phrases.mjs';


export class ImporterTests
{
	/**
	 * @param { ProfilesPhrases } profiles_phrases
	 * @param { Profiles } profiles
	 * @param { Phrases } phrases
	 */
	static async initialize (profiles_phrases, profiles, phrases)
	{
		// [profiles] 10 => [1..11]
		for (let profile_id = 1; profile_id <= 11; profile_id++)
		{
			profiles.create('profile_' + profile_id);
		}

		// [phrases] 11 => [1..12]
		for (let phrase_id = 1; phrase_id <= 12; phrase_id++)
		{
			phrases.create(
				'english_' + phrase_id,
				'russian_' + phrase_id,
				Array(phrase_id).fill(0).map((_, index) => 's' + index).join(', ')
			);
		}

		// [profiles_phrases] profiles => phrases => 66
		for (let profile_id = 1; profile_id <= 11; profile_id++)
		{
			for (let phrase_id = 1; phrase_id <= profile_id; phrase_id++)
			{
				profiles_phrases.create(profile_id, phrase_id, phrase_id % 2 == 1);
			}
		}
	}
}
