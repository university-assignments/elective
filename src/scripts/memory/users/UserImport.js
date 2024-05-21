
/**
 * @typedef { import('./user/UserData').UserData } UserData
 */

import { UserCollection } from './UserCollection.js';


export class UserImport extends UserCollection
{
	import (lines, handler, notification = true)
	{
		const users = new Map(lines);

		for (const [name, data] of users)
		{
			const user = this.exists(name)
				? this.get(name)
				: this.create(name, false);

			handler(user, data);
		}

		notification && this.trigger(this.EVENT_REFRESH);
	}

	importPhrases (lines, notification = true)
	{
		/**
		 * @param {UserData} user
		 * @param {string[]} phrases
		 */
		const handler = function (user, phrases)
		{
			user.addPhrases(phrases);
		};

		this.import(lines, handler, notification);
	}

	importSurvey (lines, notification = true)
	{
		/**
		 * @param {UserData} user
		 * @param { (string | number | boolean)[][] } survey
		 */
		const handler = function (user, survey)
		{
			survey = survey.map(function (selected)
			{
				const key   = selected[0];
				const value = selected[1];

				return [key, Boolean(value)];
			});

			survey = new Map(survey);

			user.addSurvey(survey);
		};

		this.import(lines, handler, notification);
	}
}
