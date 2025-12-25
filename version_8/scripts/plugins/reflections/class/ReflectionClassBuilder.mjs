
import { Invoker } from '../../invoker/Invoker.mjs';


/**
 * @template TInstance
 */
export class ReflectionClassBuilder
{
	/**
	 * @param { TInstance } instance
	 * @param { Invoker } invoker
	 */
	constructor (instance, invoker)
	{
		this.instance = instance;
		this.invoker  = invoker;
	}

	/**
	 * @param {keyof TInstance} name
	 */
	async runMethod (name, ...options)
	{
		await this.invoker.runMethod(this.instance, name, options);
		return this;
	}
}
