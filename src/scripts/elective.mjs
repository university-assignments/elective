
import { get_dependencies } from './configuration/get_dependencies.mjs';

import { Routers } from './configuration/Routers.mjs';
import { Containers } from './configuration/Containers.mjs';
import { Importer } from './configuration/Importer.mjs';


async function starter ()
{
	const dependencies = await get_dependencies();
	const invoker      = dependencies.singleton.invoker;

	const pages = invoker.runMethod(Routers, 'collection');
	invoker.runMethod(Containers, 'tags');
	invoker.runMethod(Importer, 'files');

	return { dependencies, invoker, pages };
}

async function elective ()
{
	window.elective = await starter();
}

elective();
