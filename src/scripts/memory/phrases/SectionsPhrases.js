
import { Events } from '../Events.js';


export class SectionsPhrases extends Events
{
	EVENT_REFRESH = 'refresh';

	/**
	 * @type { Map<string, string[]> }
	 */
	dictionary = new Map();
}
