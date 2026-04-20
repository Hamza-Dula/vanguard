<div class="<?php vanguard_print_archive_entry_class('wp-block wp-block-kubio-query-loop-item  position-relative wp-block-kubio-query-loop-item__container vanguard-search__k__QtetVXHJ9I-container vanguard-local-497-container d-flex    align-self-lg-start align-self-md-start align-self-start'); ?>"" data-kubio="kubio/query-loop-item">
	<div class="position-relative wp-block-kubio-query-loop-item__inner vanguard-search__k__QtetVXHJ9I-inner vanguard-local-497-inner d-flex h-flex-basis h-px-lg-2 v-inner-lg-2 h-px-md-2 v-inner-md-2 h-px-2 v-inner-2">
		<div class="position-relative wp-block-kubio-query-loop-item__align vanguard-search__k__QtetVXHJ9I-align vanguard-local-497-align h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-start align-self-md-start align-self-start">
			<figure class="wp-block wp-block-kubio-post-featured-image  position-relative wp-block-kubio-post-featured-image__container vanguard-search__k__iE82N7AEu-container vanguard-local-498-container kubio-post-featured-image--has-image h-aspect-ratio--1-1 <?php vanguard_post_missing_featured_image_class(); ?>" data-kubio="kubio/post-featured-image" data-kubio-settings="{{kubio_settings_value}}">
				<?php if(has_post_thumbnail()): ?>
				<img class='position-relative wp-block-kubio-post-featured-image__image vanguard-search__k__iE82N7AEu-image vanguard-local--image' src='<?php echo esc_url(get_the_post_thumbnail_url());?>' />
				<?php endif; ?>
				<div class="position-relative wp-block-kubio-post-featured-image__inner vanguard-search__k__iE82N7AEu-inner vanguard-local-498-inner">
					<div class="position-relative wp-block-kubio-post-featured-image__align vanguard-search__k__iE82N7AEu-align vanguard-local-498-align h-y-container align-self-lg-center align-self-md-center align-self-center"></div>
				</div>
			</figure>
			<a class="position-relative wp-block-kubio-post-title__link vanguard-search__k__tstzQ_uACq-link vanguard-local-499-link d-block" href="<?php echo esc_url(get_the_permalink()); ?>">
				<h4 class="wp-block wp-block-kubio-post-title  position-relative wp-block-kubio-post-title__container vanguard-search__k__tstzQ_uACq-container vanguard-local-499-container" data-kubio="kubio/post-title">
					<?php the_title(); ?>
				</h4>
			</a>
			<p class="wp-block wp-block-kubio-post-excerpt  position-relative wp-block-kubio-post-excerpt__text vanguard-search__k__-hWWlFyCEF-text vanguard-local-500-text" data-kubio="kubio/post-excerpt">
				<?php vanguard_post_excerpt(array (
  'max_length' => 16,
)); ?>
			</p>
			<div class="wp-block wp-block-kubio-post-meta  position-relative wp-block-kubio-post-meta__metaDataContainer vanguard-search__k__in2mlwF4a-metaDataContainer vanguard-local-501-metaDataContainer h-blog-meta" data-kubio="kubio/post-meta">
				<span class="metadata-item">
					<span class="metadata-prefix">
						<?php esc_html_e('Written by', 'vanguard'); ?>
					</span>
					<a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta("ID"))); ?>">
						<?php echo esc_html(get_the_author_meta("display_name",get_post_field("post_author"))); ?>
					</a>
				</span>
			</div>
			<div class="position-relative wp-block-kubio-read-more-button__spacing vanguard-search__k__7TrnS1SQ70-spacing vanguard-local-502-spacing">
				<span class="wp-block wp-block-kubio-read-more-button  position-relative wp-block-kubio-read-more-button__outer vanguard-search__k__7TrnS1SQ70-outer vanguard-local-502-outer kubio-button-container" data-kubio="kubio/read-more-button">
					<a class="position-relative wp-block-kubio-read-more-button__link vanguard-search__k__7TrnS1SQ70-link vanguard-local-502-link h-w-100 h-global-transition" href="<?php echo esc_url(get_the_permalink()); ?>">
						<span class="position-relative wp-block-kubio-read-more-button__text vanguard-search__k__7TrnS1SQ70-text vanguard-local-502-text kubio-inherit-typography">
							<?php esc_html_e('Read more', 'vanguard'); ?>
						</span>
						<span class="h-svg-icon wp-block-kubio-read-more-button__icon vanguard-search__k__7TrnS1SQ70-icon vanguard-local-502-icon" name="font-awesome/caret-right">
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="caret-right" viewBox="0 0 720.451 1896.0833">
								<path d="M576 896q0 26-19 45l-448 448q-19 19-45 19t-45-19-19-45V448q0-26 19-45t45-19 45 19l448 448q19 19 19 45z"/></svg>
							</span>
						</a>
					</span>
				</div>
			</div>
		</div>
	</div>