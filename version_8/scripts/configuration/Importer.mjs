
import { ImporterVersion1 } from '../importers/v1/ImporterVersion1.mjs';
// import { ImporterTests } from '../importers/tests/ImporterTests.mjs';

import { Invoker } from '../plugins/invoker/Invoker.mjs';


export class Importer
{
	/**
	 * @param { Invoker } invoker
	 */
	static async files (invoker)
	{
		invoker.runMethod(ImporterVersion1, 'initialize');
		// invoker.runMethod(ImporterTests, 'initialize');
	}
}
