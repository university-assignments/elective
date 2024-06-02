
import { MethodsCaller } from './MethodsCaller.js';
import { ReflectionMethod } from './ReflectionMethod.js';


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
