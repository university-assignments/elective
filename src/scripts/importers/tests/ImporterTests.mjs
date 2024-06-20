
import { Profiles } from '../../tables/profiles/Profiles.mjs';
import { Links } from '../../tables/links/Links.mjs';

import { Phrases } from '../../tables/phrases/Phrases.mjs';
import { Selected } from '../../tables/selected/Selected.mjs';
import { Poll } from '../../tables/poll/Poll.mjs';


export class ImporterTests
{
	/**
	 * @param { Profiles } profiles
	 * @param { Links } links
	 * 
	 * @param { Phrases } phrases
	 * @param { Selected } selected
	 * @param { Poll } poll
	 */
	static initialize (profiles, links, phrases, selected, poll)
	{
		// [profiles] 6 => [1..6]
		// [used] 5 => [1..5]
		for (let profile_id = 1; profile_id <= 6; profile_id++)
		{
			profiles.create('profile_' + profile_id);
		}

		for (let profile_id = 1; profile_id <= 5; profile_id++)
		{
			for (let link_id = 1; link_id <= profile_id * 2; link_id++)
			{
				links.create(
					profile_id,
					'icon_'  + link_id,
					'title_' + link_id,
					'link_'  + link_id + '_' + profile_id
				);
			}
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
		// [selected] 15 => [1..15..2]
		for (let profile_id = 1; profile_id <= 5; profile_id++)
		{
			for (let phrase_id = 1; phrase_id <= profile_id * 2; phrase_id += 2)
			{
				selected.create(profile_id, phrase_id);
			}
		}

		// [profiles] 5 => [1..5]
		// [phrases] 10 => [1..10]
		// [poll] 30 => [1..30]
		for (let profile_id = 1; profile_id <= 5; profile_id++)
		{
			for (let phrase_id = 1; phrase_id <= profile_id * 2; phrase_id++)
			{
				poll.create(profile_id, phrase_id, phrase_id % 4 == 1);
			}
		}
	}
}
