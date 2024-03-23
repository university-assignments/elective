
import { UserProperties } from './UserProperties.js';


export class UserData extends UserProperties
{
	/**
	 * @param {string} name
	 */
	constructor (name)
	{
		super();

		this.name = name;
	}

	/**
	 * @param {string[]} phrases
	 */
	addPhrases (phrases)
	{
		for (const phrase of phrases)
		{
			this.phrases.push(phrase);
		}
	}

	/**
	 * @param { Map<string, boolean> } survey
	 */
	addSurvey (survey)
	{
		for (const [phrase, selected] of survey)
		{
			this.survey.set(phrase, selected);
		}
	}
}
