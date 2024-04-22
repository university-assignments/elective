
/**
 * @typedef { import('./Objects').Objects } Objects
 */

import { ReflectionMethod } from './ReflectionMethod.js';


export class MethodsCaller
{
	/**
	 * @private
	 * @type {Objects}
	 */
	objects;

	/**
	 * @param {Objects} objects
	 */
	constructor (objects)
	{
		this.objects = objects;
	}

	/**
	 * @template TObj
	 * 
	 * @param {TObj} obj
	 * @param {keyof TObj} method
	 * @param {any[]} parameters_custom
	 */
	runMethod (obj, method, parameters_custom = [])
	{
		const reflection      = new ReflectionMethod(obj, method);
		const parameters_list = reflection.getParameters();

		const parameters_data = this.objects.filter(parameters_list).filter(value => value);

		const callable = reflection.getMethod();
		const response = callable.call(obj, ...parameters_data, ...parameters_custom);

		return response;
	}

	/**
	 * @template TObj
	 * 
	 * @param {TObj} obj
	 * @param {any[]} parameters_custom
	 * 
	 * @returns {new TObj}
	 */
	runClass (obj, parameters_custom = [])
	{
		const reflection      = new ReflectionMethod(obj, 'constructor');
		const parameters_list = reflection.getParameters();

		const parameters_data = this.objects.filter(parameters_list).filter(value => value);

		return new obj(...parameters_data, ...parameters_custom);
	}
}
