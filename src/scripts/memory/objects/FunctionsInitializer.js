
/**
 * @typedef { import('./Objects').Objects } Objects
 */


export class FunctionsInitializer
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
	 * @param {string} comment
	 */
	getOptions (comment)
	{
		const results = comment.matchAll(/@param\s*{([^}]*)}\s*(\w*)/g);
		const options = [];

		for (const result of results)
		{
			options.push(result[1]);
		}

		return options;
	}

	/**
	 * @param { {} | Function } obj
	 * @param {string} func
	 */
	getComment (obj, func)
	{
		// 'new class' => object
		// 'class' => function
		const class_buffer = typeof obj === 'object'
			? obj.constructor.toString()
			: obj.toString();

		// function
		const func_index = class_buffer.indexOf(func);
		const func_value = class_buffer.substring(0, func_index);

		// comment close
		const comment_close_index = func_value.lastIndexOf('*/');
		const comment_close_value = func_value.substring(0, comment_close_index);

		// comment begin
		const comment_begin_index = comment_close_value.lastIndexOf('/**') + '/**'.length;
		const comment_begin_value = comment_close_value.substring(comment_begin_index);

		return comment_begin_value.trim();
	}

	/**
	 * @param { {} | Function } obj
	 * @param {string} func
	 * @param {any[]} parameters
	 */
	runFunction (obj, func, parameters = [])
	{
		const comment = this.getComment(obj, func);
		const options = this.getOptions(comment);
		const values  = this.objects.filter(options);

		const gived = [...values, ...parameters];

		return obj[func](...gived);
	}

	/**
	 * @param { {} | Function } obj
	 * @param {any[]} parameters
	 */
	runClass (obj, parameters = [])
	{
		const comment = this.getComment(obj, 'constructor');
		const options = this.getOptions(comment);
		const values  = this.objects.filter(options);

		const gived = [...values, ...parameters];

		return new obj(...gived);
	}
}
