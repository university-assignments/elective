
import { Loader } from './Loader.mjs';


function main ()
{
	const loader = new Loader();

	loader.initialize();

	return loader;
}

window.elective = main();
