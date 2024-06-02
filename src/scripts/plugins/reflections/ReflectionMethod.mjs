
/**
 * @template TObj
 */
export class ReflectionMethod
{
	/**
	 * @param {TObj} instance
	 * @param {keyof TObj} method
	 */
	constructor (instance, method)
	{
		this.instance = instance;
		this.method   = method;
	}

	getMethod ()
	{
		return this.instance[this.method];
	}

	getDocComment ()
	{
		// 'new class' => object
		// 'class'     => function

		/** @type {string} */
		const class_buffer = typeof this.instance === 'object'
			? this.instance.constructor.toString()
			: this.instance.toString();

		// function
		const func_regex = new RegExp(`${this.method}\\s*\\([,\\w\\s]*\\)\\s*{`, 'g');
		const func_index = class_buffer.search(func_regex);

		if (func_index === -1)
		{
			throw new Error(`[NOT_FOUND] instance: ${this.instance}, method: ${this.method}`);
		}

		const func_value = class_buffer.substring(0, func_index);

		// comment close
		const comment_close_index = func_value.lastIndexOf('*/');

		if (comment_close_index === -1)
		{
			return '';
		}

		const comment_close_value = func_value.substring(0, comment_close_index);

		// comment begin
		const comment_begin_index = comment_close_value.lastIndexOf('/**') + '/**'.length;

		if (comment_begin_index === -1)
		{
			throw new Error(`[NOT FOUND START COMMENT] instance: ${this.instance}, method: ${this.method}`);
		}

		const comment_begin_value = comment_close_value.substring(comment_begin_index);

		return comment_begin_value.trim();
	}

	getParameters ()
	{
		const results = this.getDocComment().matchAll(/@param\s*{([^}]*)}\s*(\w*)/g);
		const options = [];

		for (const result of results)
		{
			options.push(result[1]);
		}

		return options;
	}
}
