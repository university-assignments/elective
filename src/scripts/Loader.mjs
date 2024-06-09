
import { InitializerInterface } from './plugins/initializer/InitializerInterface.mjs';

import { get_dependencies } from './configuration/get_dependencies.mjs';

import { Routers } from './configuration/Routers.mjs';
import { Containers } from './configuration/Containers.mjs';
import { Importer } from './configuration/Importer.mjs';


export class Loader extends InitializerInterface
{
	async initialize ()
	{
		this.dependencies = await get_dependencies();
		this.invoker      = this.dependencies.singleton.invoker;

		this.pages = this.invoker.runMethod(Routers, 'collection');
		this.invoker.runMethod(Containers, 'tags');
		this.invoker.runMethod(Importer, 'files');
	}
};
