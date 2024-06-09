
import { TagsFoundation } from '../display/TagsFoundation.mjs';

import { QueryOptions } from '../memory/QueryOptions.js';

import { DependencyInjection } from '../plugins/di/DependencyInjection.mjs';
import { Files } from '../plugins/files/Files.mjs';

import { Content } from '../parts/content/Content.mjs';
import { Sidebar } from '../parts/sidebar/Sidebar.mjs';

import { Database } from '../database/Database.mjs';
import { Profiles } from '../database/profiles/Profiles.mjs';
import { Phrases } from '../database/phrases/Phrases.mjs';
import { ProfilesPhrases } from '../database/profiles_phrases/ProfilesPhrases.mjs';


export async function get_dependencies ()
{
	const dependencies = new DependencyInjection();

	dependencies.singleton.register(() => new Files());

	await dependencies.singleton.register(() => new Database())
		.runMethod('initialize');

	await dependencies.singleton.register(() => new Profiles())
		.runMethod('initialize');

	await dependencies.singleton.register(() => new Phrases())
		.runMethod('initialize');

	await dependencies.singleton.register(() => new ProfilesPhrases())
		.runMethod('initialize');

	dependencies.singleton.register(() => new QueryOptions());

	dependencies.singleton.register(() => new TagsFoundation());

	await dependencies.singleton.register(() => new Sidebar())
		.runMethod('initialize');

	await dependencies.singleton.register(() => new Content())
		.runMethod('initialize');

	return dependencies;
}
