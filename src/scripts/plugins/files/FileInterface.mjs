
import { InitializerInterface } from '../initializer/InitializerInterface.mjs';


/**
 * @interface
 */
export class FileInterface extends InitializerInterface
{
	/**
	 * @property
	 * @readonly
	 * @type { string }
	 */
	full_path;

	/**
	 * @private
	 * @property
	 * @readonly
	 * @type { string }
	 */
	copy_path;

	/**
	 * @property
	 * @readonly
	 * @type { string }
	 */
	path;

	/**
	 * @private
	 * @property
	 * @readonly
	 * @type { number }
	 */
	name_index;

	/**
	 * @property
	 * @readonly
	 * @type { string }
	 */
	name;

	/**
	 * @private
	 * @property
	 * @readonly
	 * @type { number }
	 */
	prefix_index;

	/**
	 * @property
	 * @readonly
	 * @type { string }
	 */
	prefix;

	// ===== ===== ===== ===== =====

	/**
	 * @param {string} full_path
	 */
	constructor (full_path)
	{
		super();

		this.full_path = full_path;
		this.copy_path = full_path;

		// ===== ===== ===== ===== =====

		this.prefix_index = this.copy_path.lastIndexOf('.');

		if (this.prefix_index >= 0)
		{
			this.prefix    = this.copy_path.substring(this.prefix_index + 1);
			this.copy_path = this.copy_path.substring(0, this.prefix_index);
		}

		this.name_index = this.copy_path.lastIndexOf('/');

		if (this.name_index >= 0)
		{
			this.name      = this.copy_path.substring(this.name_index + 1);
			this.path      = this.copy_path.substring(0, this.name_index);
			this.copy_path = '';

			return;
		}

		this.name      = this.copy_path;
		this.copy_path = '';
	}
}
