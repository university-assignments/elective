
import { TagsFoundation } from '../display/TagsFoundation.js';
import { QueryOptions } from '../memory/QueryOptions.js';
import { Objects } from '../memory/objects/Objects.js';

import { TagsDictionary } from '../memory/tags/TagsDictionary.js';
import { UserImport } from '../memory/users/UserImport.js';

import { Content } from '../parts/content/Content.js';
import { Sidebar } from '../parts/sidebar/Sidebar.js';


export function get_objects ()
{
	const objects = new Objects();

	objects.singleton.register(() => new QueryOptions());

	objects.singleton.register(() => new TagsDictionary());
	objects.singleton.register(() => new UserImport());

	objects.singleton.register(() => new TagsFoundation());
	objects.singleton.register(() => new Sidebar());
	objects.singleton.register(() => new Content());

	objects.singleton.override('UserCollection', 'UserImport');

	return objects;
}
