
/**
 * @typedef { import('../display/TagsFoundation.mjs').TagsFoundation } TagsFoundation
 * 
 * @typedef { import('../parts/sidebar/Sidebar.mjs').Sidebar } Sidebar
 * @typedef { import('../parts/content/Content.mjs').Content } Content
 */


export class Containers
{
	/**
	 * @param { TagsFoundation } tags
	 * @param { Sidebar } sidebar
	 * @param { Content } content
	 */
	static tags (tags, sidebar, content)
	{
		tags.page.append(sidebar.tag_sidebar);
		tags.page.append(content.tag_content);
	}
}
