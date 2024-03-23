
import { Events } from '../Events.js';

export class TagsDictionary extends Events
{
	EVENT_REFRESH = 'refresh';

	/**
	 * @type { Map<string, string[]> }
	 */
	dictionary = new Map();
}
