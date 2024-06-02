
import { MethodsCaller } from '../di/MethodsCaller.js';


/**
 * @template TInstance
 */
export class ReflectionClass
{
	/**
	 * @param {TInstance} instance
	 * @param {MethodsCaller} caller
	 */
	constructor (instance, caller)
	{
		this.instance = instance;
		this.caller   = caller;
	}

	/**
	 * @param {keyof TInstance} name
	 */
	async runMethod (name, ...options)
	{
		await this.caller.runMethod(this.instance, name, options);
		return this;
	}
}
