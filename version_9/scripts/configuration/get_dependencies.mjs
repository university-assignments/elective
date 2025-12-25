
import { DependencyInjection } from '../plugins/di/DependencyInjection.mjs';
import { Files } from '../plugins/files/Files.mjs';


import { SQLite3Connection } from '../plugins/sqlite3/connection/SQLite3Connection.mjs';
import { Database } from '../plugins/sqlite3/database/Database.mjs';

import { Profiles } from '../tables/profiles/Profiles.mjs';
import { Links } from '../tables/links/Links.mjs';

import { Phrases } from '../tables/phrases/Phrases.mjs';
import { Selected } from '../tables/selected/Selected.mjs';
import { Poll } from '../tables/poll/Poll.mjs';

import { TagsFoundation } from '../parts/foundation/TagsFoundation.mjs';
import { Content } from '../parts/content/Content.mjs';
import { Sidebar } from '../parts/sidebar/Sidebar.mjs';


export async function get_dependencies ()
{
	const dependencies = new DependencyInjection();

	// ===== ===== ===== ===== =====

	dependencies.singleton.register(() => new Files());

	// ===== ===== ===== ===== =====

	await dependencies.singleton.register(() => new SQLite3Connection())
		.runMethod('initialize');

	await dependencies.singleton.register(() => new Database())
		.runMethod('initialize');

	await dependencies.singleton.register(() => new Profiles())
		.runMethod('initialize');

	await dependencies.singleton.register(() => new Links())
		.runMethod('initialize');

	await dependencies.singleton.register(() => new Phrases())
		.runMethod('initialize');

	await dependencies.singleton.register(() => new Selected())
		.runMethod('initialize');

	await dependencies.singleton.register(() => new Poll())
		.runMethod('initialize');

	// ===== ===== ===== ===== =====

	await dependencies.singleton.register(() => new TagsFoundation())
		.runMethod('initialize');

	await dependencies.singleton.register(() => new Sidebar())
		.runMethod('initialize');

	await dependencies.singleton.register(() => new Content())
		.runMethod('initialize');

	// ===== ===== ===== ===== =====

	return dependencies;
}
