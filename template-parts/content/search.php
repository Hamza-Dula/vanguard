<div class="wp-block wp-block-kubio-query-layout  position-relative wp-block-kubio-query-layout__outer vanguard-search__k__1MCYzfcZN-outer vanguard-local-492-outer d-flex h-section-global-spacing align-items-lg-center align-items-md-center align-items-center" data-kubio="kubio/query-layout" id="blog-layout">
	<div class="position-relative wp-block-kubio-query-layout__inner vanguard-search__k__1MCYzfcZN-inner vanguard-local-492-inner h-section-grid-container h-section-boxed-container">
		<div class="wp-block wp-block-kubio-row  position-relative wp-block-kubio-row__container vanguard-search__k__baLWB4dRKjp-container vanguard-local-493-container gutters-row-lg-0 gutters-row-v-lg-0 gutters-row-md-0 gutters-row-v-md-0 gutters-row-2 gutters-row-v-2" data-kubio="kubio/row">
			<div class="position-relative wp-block-kubio-row__inner vanguard-search__k__baLWB4dRKjp-inner vanguard-local-493-inner h-row align-items-lg-stretch align-items-md-stretch align-items-stretch justify-content-lg-center justify-content-md-center justify-content-center gutters-col-lg-0 gutters-col-v-lg-0 gutters-col-md-0 gutters-col-v-md-0 gutters-col-2 gutters-col-v-2">
				<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container vanguard-search__k__kxeqsSpdy-n-container vanguard-local-494-container d-flex h-col-lg h-col-md h-col-auto" data-kubio="kubio/column">
					<div class="position-relative wp-block-kubio-column__inner vanguard-search__k__kxeqsSpdy-n-inner vanguard-local-494-inner d-flex h-flex-basis h-px-lg-0 v-inner-lg-0 h-px-md-2 v-inner-md-2 h-px-2 v-inner-2">
						<div class="position-relative wp-block-kubio-column__align vanguard-search__k__kxeqsSpdy-n-align vanguard-local-494-align h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-start align-self-md-start align-self-start">
							<div class="wp-block wp-block-kubio-query  position-relative wp-block-kubio-query__container vanguard-search__k__CtKC_EuIZL-container vanguard-local-495-container" data-kubio="kubio/query">
								<div class="wp-block wp-block-kubio-query-loop  position-relative wp-block-kubio-query-loop__container vanguard-search__k__vrf0UGkWrN-container vanguard-local-496-container gutters-row-lg-2 gutters-row-v-lg-2 gutters-row-md-0 gutters-row-v-md-3 gutters-row-0 gutters-row-v-2" data-kubio="kubio/query-loop" data-kubio-component="masonry" data-kubio-settings="{&quot;enabled&quot;:&quot;1&quot;,&quot;targetSelector&quot;:&quot;.wp-block-kubio-query-loop__inner&quot;}">
									<div class="position-relative wp-block-kubio-query-loop__inner vanguard-search__k__vrf0UGkWrN-inner vanguard-local-496-inner h-row">
										<?php vanguard_theme()->get('archive-loop')->render(array (
  'view' => 'content/search/loop-item',
)); ?>
									</div>
								</div>
								<?php if(vanguard_has_pagination()): ?>
								<div class="wp-block wp-block-kubio-query-pagination  position-relative wp-block-kubio-query-pagination__container vanguard-search__k__vD7AVCTELY-container vanguard-local-503-container gutters-row-lg-0 gutters-row-v-lg-2 gutters-row-md-2 gutters-row-v-md-2 gutters-row-0 gutters-row-v-2" data-kubio="kubio/query-pagination">
									<div class="position-relative wp-block-kubio-query-pagination__inner vanguard-search__k__vD7AVCTELY-inner vanguard-local-503-inner h-row align-items-lg-stretch align-items-md-stretch align-items-stretch justify-content-lg-center justify-content-md-center justify-content-center gutters-col-lg-0 gutters-col-v-lg-2 gutters-col-md-2 gutters-col-v-md-2 gutters-col-0 gutters-col-v-2">
										<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container vanguard-search__k__tBYU0uM8Xx-container vanguard-local-504-container d-flex h-col-lg-auto h-col-md-auto h-col-auto" data-kubio="kubio/column">
											<div class="position-relative wp-block-kubio-column__inner vanguard-search__k__tBYU0uM8Xx-inner vanguard-local-504-inner d-flex h-flex-basis h-px-lg-2 v-inner-lg-2 h-px-md-2 v-inner-md-2 h-px-0 v-inner-2">
												<div class="position-relative wp-block-kubio-column__align vanguard-search__k__tBYU0uM8Xx-align vanguard-local-504-align h-y-container h-column__content h-column__v-align flex-basis-auto align-self-lg-center align-self-md-center align-self-center">
													<?php if(vanguard_has_pagination_button(true)): ?>
													<div class="position-relative wp-block-kubio-pagination-nav-button__spacing vanguard-search__k__ELgmeRXRD--spacing vanguard-local-505-spacing">
														<span class="wp-block wp-block-kubio-pagination-nav-button  position-relative wp-block-kubio-pagination-nav-button__outer vanguard-search__k__ELgmeRXRD--outer vanguard-local-505-outer kubio-button-container" data-kubio="kubio/pagination-nav-button">
															<a class="position-relative wp-block-kubio-pagination-nav-button__link vanguard-search__k__ELgmeRXRD--link vanguard-local-505-link h-w-100 h-global-transition" href="<?php vanguard_get_navigation_button_link(true); ?>">
																<span class="position-relative wp-block-kubio-pagination-nav-button__text vanguard-search__k__ELgmeRXRD--text vanguard-local-505-text kubio-inherit-typography">
																	<?php esc_html_e('Previous', 'vanguard'); ?>
																</span>
															</a>
														</span>
													</div>
													<?php endif; ?>
												</div>
											</div>
										</div>
										<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container vanguard-search__k__P2OarhUKUK-container vanguard-local-506-container d-flex h-col-lg h-col-md h-col" data-kubio="kubio/column">
											<div class="position-relative wp-block-kubio-column__inner vanguard-search__k__P2OarhUKUK-inner vanguard-local-506-inner d-flex h-flex-basis h-px-lg-2 v-inner-lg-2 h-px-md-2 v-inner-md-2 h-px-1 v-inner-2">
												<div class="position-relative wp-block-kubio-column__align vanguard-search__k__P2OarhUKUK-align vanguard-local-506-align h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-center align-self-md-center align-self-center">
													<div class="wp-block wp-block-kubio-pagination-numbers  position-relative wp-block-kubio-pagination-numbers__outer vanguard-search__k__tRiQFlrj8q-outer vanguard-local-507-outer" data-kubio="kubio/pagination-numbers">
														<?php vanguard_pagination_numbers(); ?>
													</div>
												</div>
											</div>
										</div>
										<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container vanguard-search__k__tBYU0uM8Xx-container vanguard-local-508-container d-flex h-col-lg-auto h-col-md-auto h-col-auto" data-kubio="kubio/column">
											<div class="position-relative wp-block-kubio-column__inner vanguard-search__k__tBYU0uM8Xx-inner vanguard-local-508-inner d-flex h-flex-basis h-px-lg-2 v-inner-lg-2 h-px-md-2 v-inner-md-2 h-px-0 v-inner-2">
												<div class="position-relative wp-block-kubio-column__align vanguard-search__k__tBYU0uM8Xx-align vanguard-local-508-align h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-center align-self-md-center align-self-center">
													<?php if(vanguard_has_pagination_button()): ?>
													<div class="position-relative wp-block-kubio-pagination-nav-button__spacing vanguard-search__k__iXYys9eZW-spacing vanguard-local-509-spacing">
														<span class="wp-block wp-block-kubio-pagination-nav-button  position-relative wp-block-kubio-pagination-nav-button__outer vanguard-search__k__iXYys9eZW-outer vanguard-local-509-outer kubio-button-container" data-kubio="kubio/pagination-nav-button">
															<a class="position-relative wp-block-kubio-pagination-nav-button__link vanguard-search__k__iXYys9eZW-link vanguard-local-509-link h-w-100 h-global-transition" href="<?php vanguard_get_navigation_button_link(); ?>">
																<span class="position-relative wp-block-kubio-pagination-nav-button__text vanguard-search__k__iXYys9eZW-text vanguard-local-509-text kubio-inherit-typography">
																	<?php esc_html_e('Next', 'vanguard'); ?>
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>