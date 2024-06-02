
import { TagsFoundation } from '../display/TagsFoundation.js';
import { QueryOptions } from '../memory/QueryOptions.js';
import { DependencyInjection } from '../memory/di/DependencyInjection.js';

import { TranslatedPhrases } from '../memory/phrases/TranslatedPhrases.js';
import { SectionsPhrases } from '../memory/phrases/SectionsPhrases.js';
import { UserImport } from '../memory/users/UserImport.js';

import { Content } from '../parts/content/Content.js';
import { Sidebar } from '../parts/sidebar/Sidebar.js';

import { Database } from '../database/Database.mjs';


export async function get_di ()
{
	const di = new DependencyInjection();

	await di.singleton.register(() => new Database())
		.runMethod('initialize');

	di.singleton.register(() => new QueryOptions());

	di.singleton.register(() => new TranslatedPhrases());
	di.singleton.register(() => new SectionsPhrases());
	di.singleton.register(() => new UserImport());

	di.singleton.register(() => new TagsFoundation());

	await di.singleton.register(() => new Sidebar())
		.runMethod('initialize');

	await di.singleton.register(() => new Content())
		.runMethod('initialize');

	di.singleton.override('UserCollection', 'UserImport');

	return di;
}
