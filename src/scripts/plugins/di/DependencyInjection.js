
import { Singleton } from './Singleton.js';


export class DependencyInjection
{
	singleton = new Singleton();

	/**
	 * @param {string[]} args
	 */
	filter (args)
	{
		return this.singleton.filter(args);
	}

	/**
	 * @param {string} name
	 */
	get (name)
	{
		return this.singleton.get(name);
	}
}
