
import { Dependencies } from '../dependencies/Dependencies.mjs';


export class DependencyInjection extends Dependencies
{
	constructor (options)
	{
		super(options);

		this.singleton.register(() => this);
	}
}
