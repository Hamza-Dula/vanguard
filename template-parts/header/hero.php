<?php $component = \ColibriWP\Theme\View::getData( 'component' ); ?>
<div style="<?php $component->printPostFeaturedImage(); ?>" class="wp-block wp-block-kubio-hero  position-relative wp-block-kubio-hero__outer monivo-header__k__KFTMhA6WOVh-outer monivo-local-683-outer d-flex h-section-global-spacing align-items-lg-center align-items-md-center align-items-center" data-kubio="kubio/hero" id="hero">
	<?php $component->printBackground(); ?><?php $component->printSeparator(); ?>
	<div class="position-relative wp-block-kubio-hero__inner monivo-header__k__KFTMhA6WOVh-inner monivo-local-683-inner h-navigation-padding h-section-grid-container h-section-boxed-container">
		<script type='text/javascript'>
			(function () {
				// forEach polyfill
				if (!NodeList.prototype.forEach) {
					NodeList.prototype.forEach = function (callback) {
						for (var i = 0; i < this.length; i++) {
							callback.call(this, this.item(i));
						}
					}
				}
				var navigation = document.querySelector('[data-colibri-navigation-overlap="true"], .h-navigation_overlap');
				if (navigation) {
					var els = document
						.querySelectorAll('.h-navigation-padding');
					if (els.length) {
						els.forEach(function (item) {
							item.style.paddingTop = navigation.offsetHeight + "px";
						});
					}
				}
			})();
		</script>
		<div class="wp-block wp-block-kubio-row  position-relative wp-block-kubio-row__container monivo-header__k__vv0pRzL5YoZ-container monivo-local-684-container gutters-row-lg-2 gutters-row-v-lg-2 gutters-row-md-2 gutters-row-v-md-2 gutters-row-2 gutters-row-v-2" data-kubio="kubio/row">
			<div class="position-relative wp-block-kubio-row__inner monivo-header__k__vv0pRzL5YoZ-inner monivo-local-684-inner h-row align-items-lg-stretch align-items-md-stretch align-items-stretch justify-content-lg-center justify-content-md-center justify-content-center gutters-col-lg-2 gutters-col-v-lg-2 gutters-col-md-2 gutters-col-v-md-2 gutters-col-2 gutters-col-v-2">
				<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container monivo-header__k__vPVKm6K-swr-container monivo-local-685-container d-flex h-col-lg-auto h-col-md-auto h-col-auto" data-kubio="kubio/column">
					<div class="position-relative wp-block-kubio-column__inner monivo-header__k__vPVKm6K-swr-inner monivo-local-685-inner d-flex h-flex-basis h-px-lg-2 v-inner-lg-2 h-px-md-1 v-inner-md-2 h-px-2 v-inner-2">
						<div class="position-relative wp-block-kubio-column__align monivo-header__k__vPVKm6K-swr-align monivo-local-685-align h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-center align-self-md-center align-self-center">
							<?php monivo_theme()->get('inner-title')->render(); ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>