
/**
 * @abstract
 */
export class UserProperties
{
	/**
	 * Имя
	 * 
	 * @type {string}
	 */
	name;

	/**
	 * Фразы
	 * 
	 * @type {string[]}
	 */
	phrases = [];

	/**
	 * Опрос
	 * 
	 * @type {Map<string, boolean>}
	 */
	survey = new Map();
}
