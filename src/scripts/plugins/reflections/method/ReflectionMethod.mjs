
import { StringsTools } from '../../strings/StringsTools.mjs';
import { ReflectionClass } from '../class/ReflectionClass.mjs';


/**
 * @template TInstance
 */
export class ReflectionMethod
{
	/**
	 * @param { TInstance } instance
	 * @param { keyof TInstance } method_name
	 */
	constructor (instance, method_name)
	{
		this.reflection  = new ReflectionClass(instance);
		this.method_name = method_name;
	}

	// ===== ===== ===== ===== =====

	get method ()
	{
		return this.reflection.instance[this.method_name];
	}

	get comment ()
	{
		const class_code = this.reflection.code;

		// function

		const regex_before_function = new RegExp(
			`${this.method_name}\\s*\\([,\\w\\s]*\\)\\s*{`, 'g'
		);

		const split_before_function = StringsTools.splitWithCheck(
			class_code,
			regex_before_function,
			`[NOT_FOUND] instance: ${this.reflection.name}, method: ${this.method_name}`
		);

		// comment close

		const regex_close_comment = '*/';
		const split_close_comment = StringsTools.lastSplit(
			split_before_function.before,
			regex_close_comment
		);

		if (split_close_comment.position === -1)
		{
			return '';
		}

		// comment begin

		const regex_begin_comment = '/**';
		const split_begin_comment = StringsTools.splitWithCheck(
			split_close_comment.before,
			regex_begin_comment,
			`[NOT FOUND START COMMENT] instance: ${this.reflection.name}, method: ${this.method_name}`
		);

		return split_begin_comment.after.trim();
	}

	get options ()
	{
		const parameters = this.comment.matchAll(/@param\s*{([^}]*)}\s*(\w*)/g);
		const response   = [];

		for (const parameter of parameters)
		{
			response.push(parameter[1]);
		}

		return response;
	}
}
