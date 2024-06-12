
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
	static initialize (profiles_phrases, profiles, phrases)
	{
		// [profiles] 6 => [1..6]
		// [used] 5 => [1..5]
		for (let profile_id = 1; profile_id <= 6; profile_id++)
		{
			profiles.create('profile_' + profile_id);
		}

		// [phrases] 11 => [1..11]
		// [used] 10 => [1..10]
		for (let phrase_id = 1; phrase_id <= 11; phrase_id++)
		{
			phrases.create(
				'english_' + phrase_id,
				'russian_' + phrase_id,
				Array(phrase_id).fill(0).map((_, index) => 's' + index)
			);
		}

		// [profiles] 5 => [1..5]
		// [phrases] 10 => [1..10]
		// [profiles_phrases] 30 => [1..30]
		for (let profile_id = 1; profile_id <= 5; profile_id++)
		{
			for (let phrase_id = 1; phrase_id <= profile_id * 2; phrase_id++)
			{
				profiles_phrases.create(profile_id, phrase_id, phrase_id % 4 == 1);
			}
		}
	}
}
