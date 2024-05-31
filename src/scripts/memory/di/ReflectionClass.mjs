
import { ReflectionMethod } from './ReflectionMethod.js';

/**
 * @template TInstance
 */
export class ReflectionClass
{
	/**
	 * @param {TInstance} instance
	 */
	constructor (instance)
	{
		this.instance = instance;
	}

	/**
	 * @param {keyof TInstance} name
	 */
	async runMethod (name, ...options)
	{
		const reflection = new ReflectionMethod(this.instance, name);
		const callback   = reflection.getMethod();

		await callback.call(this.instance, ...options);
		return this;
	}
}
