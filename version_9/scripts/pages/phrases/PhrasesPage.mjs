
import { PageContainer } from '../PageContainer.mjs';

import { Phrases } from '../../tables/phrases/Phrases.mjs';


export class PhrasesPage extends PageContainer
{
	/**
	 * 
	 * @param { Phrases } phrases 
	 */
	initialize (phrases)
	{
		this.phrases = phrases;
		this.events  = phrases.events;

		this.tag_phrases = jQuery(document.createElement('section'))
			.addClass('justify-content-center')
			.addClass('row');

		this.tag_container
			.append(this.tag_phrases);

		this.events.on(this.events.EVENT_REFRESH, () => this.refresh());
		this.refresh();
	}

	refresh ()
	{
		for (const { english, russian, sections } of this.phrases.getAll())
		{
			const converted_sections = JSON.parse(sections)
				.map(section => '<article class="col m-2"><span class="card-text p-1 bg-light border rounded">' + section + '</span></article>');

			const tag_phrase = jQuery(`
				<article class="col-3 col-xl-2 m-2">
					<div class="card h-100">
						<div class="card-header">
							<h5 class="card-title">${ english }</h5>
							<h6 class="card-subtitle mb-2 text-body-secondary">${ russian }</h6>
						</div>

						<div class="card-body">
							<section class="row">
								${ converted_sections.join('') }
							</section>
						</div>
					</div>
				</article>
			`);

			this.tag_phrases.append(tag_phrase);
		}
	}
}
