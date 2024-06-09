
import { ReflectionClassBuilder } from '../reflections/class/ReflectionClassBuilder.mjs';
import { ReflectionClass } from '../reflections/class/ReflectionClass.mjs';
import { Invoker } from '../invoker/Invoker.mjs';


export class Singleton
{
	constructor (instances = new Map())
	{
		this.instances = instances;
		this.invoker   = new Invoker(this);

		this.register(() => this.invoker);
		this.register(() => this);
	}

	// ===== ===== ===== ===== =====

	/**
	 * @template TInstance
	 * 
	 * @param {() => TInstance} callback
	 */
	register (callback)
	{
		const class_data = callback();
		const class_info = new ReflectionClass(class_data);
		const class_name = class_info.name;

		this.instances.set(class_name, class_data);
		return new ReflectionClassBuilder(class_data, this.invoker);
	}

	// ===== ===== ===== ===== =====

	/**
	 * @param { string } instance_name
	 */
	getOne (instance_name)
	{
		return this.instances.get(instance_name.trim());
	}

	/**
	 * @param { string[] } instance_names
	 */
	getSome (instance_names)
	{
		return instance_names.map(instance_name => this.getOne(instance_name))
			.filter(instance => instance);
	}
}
