
import { Dependencies } from '../dependencies/Dependencies.mjs';
import { ReflectionMethod } from '../reflections/method/ReflectionMethod.mjs';


export class Invoker
{
	constructor (dependencies = new Dependencies())
	{
		this.dependencies = dependencies;
	}

	// ===== ===== ===== ===== =====

	/**
	 * @template TInstance
	 * 
	 * @param { TInstance } instance
	 * @param { keyof TInstance } method_name
	 */
	runMethod (instance, method_name, parameters_custom = [])
	{
		const reflection = new ReflectionMethod(instance, method_name);

		const callable = reflection.method;
		const options  = reflection.options;

		return callable.call(
			instance,
			...this.dependencies.getSome(options),
			...parameters_custom
		);
	}

	/**
	 * @template TInstance
	 * 
	 * @param { TInstance } instance
	 * 
	 * @returns { new TInstance }
	 */
	runClass (instance, parameters_custom = [])
	{
		const reflection = new ReflectionMethod(instance, 'constructor');
		const options    = reflection.options;

		return new instance(
			...this.dependencies.getSome(options),
			...parameters_custom
		);
	}
}
