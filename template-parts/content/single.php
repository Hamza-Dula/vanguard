<div id="post-<?php the_ID(); ?>" class="<?php echo esc_attr( implode( ' ', get_post_class() ) ); ?> wp-block wp-block-kubio-query-layout  position-relative wp-block-kubio-query-layout__outer monivo-single__k__single-lAFSH8Xo9x-outer monivo-local-712-outer d-flex h-section-global-spacing align-items-lg-center align-items-md-center align-items-center" data-kubio="kubio/query-layout" id="blog-layout">
	<div class="position-relative wp-block-kubio-query-layout__inner monivo-single__k__single-lAFSH8Xo9x-inner monivo-local-712-inner h-section-grid-container h-section-boxed-container">
		<div class="wp-block wp-block-kubio-row  position-relative wp-block-kubio-row__container monivo-single__k__single-baLWB4dRKjp-container monivo-local-713-container gutters-row-lg-0 gutters-row-v-lg-0 gutters-row-md-0 gutters-row-v-md-0 gutters-row-2 gutters-row-v-2" data-kubio="kubio/row">
			<div class="position-relative wp-block-kubio-row__inner monivo-single__k__single-baLWB4dRKjp-inner monivo-local-713-inner h-row align-items-lg-stretch align-items-md-stretch align-items-stretch justify-content-lg-center justify-content-md-center justify-content-center gutters-col-lg-0 gutters-col-v-lg-0 gutters-col-md-0 gutters-col-v-md-0 gutters-col-2 gutters-col-v-2">
				<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container monivo-single__k__single-kxeqsSpdy-n-container monivo-local-714-container d-flex h-col-lg h-col-md h-col-auto" data-kubio="kubio/column">
					<div class="position-relative wp-block-kubio-column__inner monivo-single__k__single-kxeqsSpdy-n-inner monivo-local-714-inner d-flex h-flex-basis h-px-lg-2 v-inner-lg-2 h-px-md-2 v-inner-md-2 h-px-2 v-inner-2">
						<div class="position-relative wp-block-kubio-column__align monivo-single__k__single-kxeqsSpdy-n-align monivo-local-714-align h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-start align-self-md-start align-self-start">
							<div class="wp-block wp-block-kubio-post-meta  position-relative wp-block-kubio-post-meta__metaDataContainer monivo-single__k__in2mlwF4a-metaDataContainer monivo-local-715-metaDataContainer h-blog-meta" data-kubio="kubio/post-meta" id="post-metadata">
								<span class="metadata-item">
									<a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta("ID"))); ?>">
										<span class="h-svg-icon">
											<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="pencil" viewBox="0 0 512 545.5">
												<path d="M395 96.5c13.39 0 26.867 5.367 37 15.5 20.267 20.267 20.267 53.233 0 73.5l-.5 1-1 1 9.5 9.5-11 11-249.5 249.5-3.5 3.5-5 1-88 17.5-23.5 5 5-23.5L82 373l1-5 3.5-3.5L336 115l11-11 10 9.5 1.5-1.5c10.133-10.133 23.11-15.5 36.5-15.5zm0 31.5c-4.99 0-9.733 2.233-14 6.5l-1.5 1.5 28.5 28.5 1.5-1.5c8.533-8.533 8.533-19.967 0-28.5-4.267-4.267-9.51-6.5-14.5-6.5zm-47.5 21L324 172l48 48 23-23.5zM302 195L134.5 362l29 6.5 10 2 2 10 6.5 29L349 242zM111.5 389.5L105 422l17 17 32.5-6.5-8-35z" /></svg>
											</span>
											<?php echo esc_html(get_the_author_meta("display_name",get_post_field("post_author"))); ?>
										</a>
									</span>
									<span class="metadata-separator">
										-
									</span>
									<span class="metadata-item">
										<a href="<?php echo esc_url(get_day_link(get_post_time( 'Y' ),get_post_time( 'm' ),get_post_time( 'j' ))); ?>">
											<span class="h-svg-icon">
												<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="hourglass-3" viewBox="0 0 512 545.5">
													<path d="M112 96h288v32h-32v64c0 40.674-21.898 76.378-54.5 96 32.602 19.622 54.5 55.326 54.5 96v64h32v32H112v-32h32v-64c0-40.674 21.898-76.378 54.5-96-32.602-19.622-54.5-55.326-54.5-96v-64h-32V96zm64 32v64c0 44.38 35.62 80 80 80s80-35.62 80-80v-64H176zm80 176c-44.38 0-80 35.62-80 80v64h16v-32c0-35.344 28.656-64 64-64s64 28.656 64 64v32h16v-64c0-44.38-35.62-80-80-80z" /></svg>
												</span>
												<?php echo esc_html(get_the_date('m.d.Y')); ?>
											</a>
										</span>
									</div>
									<figure class="wp-block wp-block-kubio-post-featured-image  position-relative wp-block-kubio-post-featured-image__container monivo-single__k__iE82N7AEu-container monivo-local-716-container h-aspect-ratio--16-9 <?php monivo_post_missing_featured_image_class(); ?>" data-kubio="kubio/post-featured-image" data-kubio-settings="{{kubio_settings_value}}">
										<?php if(has_post_thumbnail()): ?>
										<img class='position-relative wp-block-kubio-post-featured-image__image monivo-single__k__iE82N7AEu-image monivo-local--image' src='<?php echo esc_url(get_the_post_thumbnail_url());?>' />
										<?php endif; ?>
										<div class="position-relative wp-block-kubio-post-featured-image__inner monivo-single__k__iE82N7AEu-inner monivo-local-716-inner">
											<div class="position-relative wp-block-kubio-post-featured-image__align monivo-single__k__iE82N7AEu-align monivo-local-716-align h-y-container align-self-lg-end align-self-md-end align-self-end">
												<div class="wp-block wp-block-kubio-row  position-relative wp-block-kubio-row__container monivo-single__k__oDKdvm4v0Z-container monivo-local-717-container gutters-row-lg-2 gutters-row-v-lg-2 gutters-row-md-2 gutters-row-v-md-2 gutters-row-2 gutters-row-v-2" data-kubio="kubio/row">
													<div class="position-relative wp-block-kubio-row__inner monivo-single__k__oDKdvm4v0Z-inner monivo-local-717-inner h-row align-items-lg-stretch align-items-md-stretch align-items-stretch justify-content-lg-start justify-content-md-start justify-content-start gutters-col-lg-2 gutters-col-v-lg-2 gutters-col-md-2 gutters-col-v-md-2 gutters-col-2 gutters-col-v-2">
														<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container monivo-single__k__XyvxqABp0B-container monivo-local-718-container d-flex h-col-lg-auto h-col-md-auto h-col-auto" data-kubio="kubio/column">
															<div class="position-relative wp-block-kubio-column__inner monivo-single__k__XyvxqABp0B-inner monivo-local-718-inner d-flex h-flex-basis h-px-lg-0 v-inner-lg-0 h-px-md-0 v-inner-md-0 h-px-0 v-inner-0">
																<div class="position-relative wp-block-kubio-column__align monivo-single__k__XyvxqABp0B-align monivo-local-718-align h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-start align-self-md-start align-self-start">
																	<div class="wp-block wp-block-kubio-post-categories  position-relative wp-block-kubio-post-categories__container monivo-single__k__jhteyJMlk-container monivo-local-719-container kubio-post-categories-container" data-kubio="kubio/post-categories">
																		<div class="position-relative wp-block-kubio-post-categories__placeholder monivo-single__k__jhteyJMlk-placeholder monivo-local-719-placeholder kubio-post-categories-placeholder"></div>
																		<div class="position-relative wp-block-kubio-post-categories__tags monivo-single__k__jhteyJMlk-tags monivo-local-719-tags">
																			<?php monivo_categories_list(__('No category', 'monivo')); ?>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</figure>
									<div class="wp-block wp-block-kubio-row  position-relative wp-block-kubio-row__container monivo-single__k__single-SbdKxHs2YI-container monivo-local-720-container gutters-row-lg-0 gutters-row-v-lg-0 gutters-row-md-0 gutters-row-v-md-0 gutters-row-0 gutters-row-v-0" data-kubio="kubio/row">
										<div class="position-relative wp-block-kubio-row__inner monivo-single__k__single-SbdKxHs2YI-inner monivo-local-720-inner h-row align-items-lg-stretch align-items-md-stretch align-items-stretch justify-content-lg-center justify-content-md-center justify-content-center gutters-col-lg-0 gutters-col-v-lg-0 gutters-col-md-0 gutters-col-v-md-0 gutters-col-0 gutters-col-v-0">
											<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container monivo-single__k__single-3VGwAjm9cX-container monivo-local-721-container d-flex h-col-lg-auto h-col-md-auto h-col-auto" data-kubio="kubio/column">
												<div class="position-relative wp-block-kubio-column__inner monivo-single__k__single-3VGwAjm9cX-inner monivo-local-721-inner d-flex h-flex-basis h-px-lg-0 v-inner-lg-0 h-px-md-0 v-inner-md-0 h-px-0 v-inner-0">
													<div class="position-relative wp-block-kubio-column__align monivo-single__k__single-3VGwAjm9cX-align monivo-local-721-align h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-start align-self-md-start align-self-start">
														<div class="wp-block wp-block-kubio-post-tags  position-relative wp-block-kubio-post-tags__container monivo-single__k__single-tlSt_AyBi-container monivo-local-722-container kubio-post-tags-container" data-kubio="kubio/post-tags">
															<div class="position-relative wp-block-kubio-post-tags__placeholder monivo-single__k__single-tlSt_AyBi-placeholder monivo-local-722-placeholder kubio-post-tags-placeholder"></div>
															<div class="position-relative wp-block-kubio-post-tags__tags monivo-single__k__single-tlSt_AyBi-tags monivo-local-722-tags">
																<?php monivo_tags_list(__('No tags', 'monivo')); ?>
															</div>
														</div>
														<?php the_content(); ?>
													</div>
												</div>
											</div>
										</div>
									</div>
									<?php if(monivo_has_pagination()): ?>
									<div class="wp-block wp-block-kubio-query-pagination  position-relative wp-block-kubio-query-pagination__container monivo-single__k__single-nqLiVZCaYo-container monivo-local-723-container gutters-row-lg-0 gutters-row-v-lg-0 gutters-row-md-0 gutters-row-v-md-0 gutters-row-0 gutters-row-v-0" data-kubio="kubio/query-pagination">
										<div class="position-relative wp-block-kubio-query-pagination__inner monivo-single__k__single-nqLiVZCaYo-inner monivo-local-723-inner h-row align-items-lg-stretch align-items-md-stretch align-items-stretch justify-content-lg-center justify-content-md-center justify-content-center gutters-col-lg-0 gutters-col-v-lg-0 gutters-col-md-0 gutters-col-v-md-0 gutters-col-0 gutters-col-v-0">
											<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container monivo-single__k__single-3ndM77FkZV-container monivo-local-724-container d-flex h-col-lg h-col-md h-col-auto" data-kubio="kubio/column">
												<div class="position-relative wp-block-kubio-column__inner monivo-single__k__single-3ndM77FkZV-inner monivo-local-724-inner d-flex h-flex-basis h-px-lg-0 v-inner-lg-2 h-px-md-0 v-inner-md-2 h-px-0 v-inner-2">
													<div class="position-relative wp-block-kubio-column__align monivo-single__k__single-3ndM77FkZV-align monivo-local-724-align h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-start align-self-md-start align-self-start">
														<?php if(monivo_has_pagination_button(true)): ?>
														<div class="position-relative wp-block-kubio-pagination-nav-button__spacing monivo-single__k__ELgmeRXRD--spacing monivo-local-725-spacing">
															<span class="wp-block wp-block-kubio-pagination-nav-button  position-relative wp-block-kubio-pagination-nav-button__outer monivo-single__k__ELgmeRXRD--outer monivo-local-725-outer kubio-button-container" data-kubio="kubio/pagination-nav-button">
																<a class="position-relative wp-block-kubio-pagination-nav-button__link monivo-single__k__ELgmeRXRD--link monivo-local-725-link h-w-100 h-global-transition" href="<?php monivo_get_navigation_button_link(true); ?>">
																	<span class="h-svg-icon wp-block-kubio-pagination-nav-button__icon monivo-single__k__ELgmeRXRD--icon monivo-local-725-icon" name="icons8-line-awesome/long-arrow-left">
																		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="long-arrow-left" viewBox="0 0 512 545.5">
																			<path d="M173 180.5l22.5 23L127 272h321v32H127l68.5 68.5-22.5 23-96-96L65.5 288 77 276.5z"/></svg>
																		</span>
																		<span class="position-relative wp-block-kubio-pagination-nav-button__text monivo-single__k__ELgmeRXRD--text monivo-local-725-text kubio-inherit-typography">
																			<?php esc_html_e('Previous', 'monivo'); ?>
																		</span>
																	</a>
																</span>
															</div>
															<?php endif; ?>
														</div>
													</div>
												</div>
												<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container monivo-single__k__single-mMPMCQqWfs-container monivo-local-726-container d-flex h-col-lg h-col-md h-col-auto" data-kubio="kubio/column">
													<div class="position-relative wp-block-kubio-column__inner monivo-single__k__single-mMPMCQqWfs-inner monivo-local-726-inner d-flex h-flex-basis h-px-lg-0 v-inner-lg-2 h-px-md-0 v-inner-md-2 h-px-0 v-inner-2">
														<div class="position-relative wp-block-kubio-column__align monivo-single__k__single-mMPMCQqWfs-align monivo-local-726-align h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-start align-self-md-start align-self-start">
															<?php if(monivo_has_pagination_button()): ?>
															<div class="position-relative wp-block-kubio-pagination-nav-button__spacing monivo-single__k__ESogDGG6--spacing monivo-local-727-spacing">
																<span class="wp-block wp-block-kubio-pagination-nav-button  position-relative wp-block-kubio-pagination-nav-button__outer monivo-single__k__ESogDGG6--outer monivo-local-727-outer kubio-button-container" data-kubio="kubio/pagination-nav-button">
																	<a class="position-relative wp-block-kubio-pagination-nav-button__link monivo-single__k__ESogDGG6--link monivo-local-727-link h-w-100 h-global-transition" href="<?php monivo_get_navigation_button_link(); ?>">
																		<span class="position-relative wp-block-kubio-pagination-nav-button__text monivo-single__k__ESogDGG6--text monivo-local-727-text kubio-inherit-typography">
																			<?php esc_html_e('Next', 'monivo'); ?>
																		</span>
																		<span class="h-svg-icon wp-block-kubio-pagination-nav-button__icon monivo-single__k__ESogDGG6--icon monivo-local-727-icon" name="icons8-line-awesome/long-arrow-right">
																			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="long-arrow-right" viewBox="0 0 512 545.5">
																				<path d="M339 180.5l96 96 11.5 11.5-11.5 11.5-96 96-22.5-23L385 304H64v-32h321l-68.5-68.5z"/></svg>
																			</span>
																		</a>
																	</span>
																</div>
																<?php endif; ?>
															</div>
														</div>
													</div>
												</div>
											</div>
											<?php endif; ?>
											<div class="wp-block wp-block-kubio-post-comments kubio-migration--1 position-relative wp-block-kubio-post-comments__commentsContainer monivo-single__k__single-s5UQRGEAN-commentsContainer monivo-local-728-commentsContainer" data-kubio="kubio/post-comments">
												<?php monivo_post_comments(array (
  'none' => __('No responses yet', 'monivo'),
  'one' => __('One response', 'monivo'),
  'multiple' => __('{COMMENTS-COUNT} Responses', 'monivo'),
  'disabled' => __('Comments are closed', 'monivo'),
  'avatar_size' => __('32', 'monivo'),
)); ?>
											</div>
											<div class="wp-block wp-block-kubio-post-comments-form  position-relative wp-block-kubio-post-comments-form__container monivo-single__k__single-oXoikmHxB-container monivo-local-729-container" data-kubio="kubio/post-comments-form">
												<?php comment_form(); ?>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>