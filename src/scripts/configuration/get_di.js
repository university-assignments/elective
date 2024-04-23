
import { TagsFoundation } from '../display/TagsFoundation.js';
import { QueryOptions } from '../memory/QueryOptions.js';
import { DependencyInjection } from '../memory/di/DependencyInjection.js';

import { TagsDictionary } from '../memory/tags/TagsDictionary.js';
import { UserImport } from '../memory/users/UserImport.js';

import { Content } from '../parts/content/Content.js';
import { Sidebar } from '../parts/sidebar/Sidebar.js';


export function get_di ()
{
	const di = new DependencyInjection();

	di.singleton.register(() => new QueryOptions());

	di.singleton.register(() => new TagsDictionary());
	di.singleton.register(() => new UserImport());

	di.singleton.register(() => new TagsFoundation());
	di.singleton.register(() => new Sidebar());
	di.singleton.register(() => new Content());

	di.singleton.override('UserCollection', 'UserImport');

	return di;
}
