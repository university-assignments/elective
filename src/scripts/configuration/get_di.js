
import { TagsFoundation } from '../display/TagsFoundation.js';
import { TagPopup } from '../display/TagPopup.js';

import { QueryOptions } from '../memory/QueryOptions.js';
import { DependencyInjection } from '../plugins/di/DependencyInjection.js';

import { TranslatedPhrases } from '../memory/phrases/TranslatedPhrases.js';
import { SectionsPhrases } from '../memory/phrases/SectionsPhrases.js';
import { UserImport } from '../memory/users/UserImport.js';

import { Content } from '../parts/content/Content.js';
import { Sidebar } from '../parts/sidebar/Sidebar.js';

import { Files } from '../plugins/files/Files.mjs';
import { Database } from '../database/Database.mjs';

import { Profiles } from '../database/profiles/Profiles.mjs';
import { Phrases } from '../database/phrases/Phrases.mjs';
import { ProfilesPhrases } from '../database/profiles_phrases/ProfilesPhrases.mjs';


export async function get_di ()
{
	const di = new DependencyInjection();

	di.singleton.register(() => new Files());

	await di.singleton.register(() => new Database())
		.runMethod('initialize');

	await di.singleton.register(() => new Profiles())
		.runMethod('initialize');

	await di.singleton.register(() => new Phrases())
		.runMethod('initialize');

	await di.singleton.register(() => new ProfilesPhrases())
		.runMethod('initialize');

	di.singleton.register(() => new QueryOptions());

	di.singleton.register(() => new TranslatedPhrases());
	di.singleton.register(() => new SectionsPhrases());
	di.singleton.register(() => new UserImport());

	di.singleton.register(() => new TagsFoundation());
	di.singleton.register(() => new TagPopup());

	await di.singleton.register(() => new Sidebar())
		.runMethod('initialize');

	await di.singleton.register(() => new Content())
		.runMethod('initialize');

	di.singleton.override('UserCollection', 'UserImport');

	return di;
}
