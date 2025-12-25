
import { TagsFoundation } from '../parts/foundation/TagsFoundation.mjs';
import { Sidebar } from '../parts/sidebar/Sidebar.mjs';
import { Content } from '../parts/content/Content.mjs';


export class Containers
{
	/**
	 * @param { TagsFoundation } foundation
	 * @param { Sidebar } sidebar
	 * @param { Content } content
	 */
	static tags (foundation, sidebar, content)
	{
		foundation.root.append(sidebar.tag_sidebar);
		foundation.root.append(content.tag_content);
	}
}
