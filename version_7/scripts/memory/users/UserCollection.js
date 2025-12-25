
import { UserEvents } from './UserEvents.js';
import { UserError } from './errors/UserError.js';
import { UserData } from './user/UserData.js';


export class UserCollection extends UserEvents
{
	/**
	 * @private
	 * @type {UserData[]}
	 */
	users = [];

	/**
	 * @param {string} name
	 */
	index (name)
	{
		return this.users.findIndex(user => user.name === name);
	}

	/**
	 * @param {string} name
	 */
	exists (name)
	{
		return this.index(name) !== -1;
	}

	all ()
	{
		return this.users;
	}

	/**
	 * @param {string} name
	 */
	get (name)
	{
		const index = this.index(name);

		if (index === -1)
		{
			throw new UserError('get exists');
		}

		return this.users[index];
	}

	/**
	 * @param {string} name
	 */
	create (name, notification = true)
	{
		if (this.exists(name))
		{
			throw new UserError('create exists');
		}

		const user = new UserData(name);

		this.users.push(user);
		notification && this.trigger(this.EVENT_REFRESH);

		return user;
	}

	/**
	 * @param {string} name
	 */
	delete (name, notification = true)
	{
		const index = this.index(name);

		if (index === -1)
		{
			throw new UserError('delete exists');
		}

		const user = this.users.splice(index, 1)[0];
		notification && this.trigger(this.EVENT_REFRESH);

		return user;
	}
}
