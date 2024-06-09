
import { Singleton } from './Singleton.mjs';


export class Dependencies
{
	constructor (singleton = new Singleton())
	{
		this.singleton = singleton;
		this.singleton.register(() => this);
	}

	// ===== ===== ===== ===== =====

	/**
	 * @param { string } instance_name
	 */
	getOne (instance_name)
	{
		return this.singleton.getOne(instance_name);
	}

	/**
	 * @param { string[] } instance_names
	 */
	getSome (instance_names)
	{
		return this.singleton.getSome(instance_names);
	}
}
