<?php $component = \ColibriWP\Theme\View::getData( 'component' ); ?>
<div class="wp-block wp-block-kubio-hero  position-relative wp-block-kubio-hero__outer monivo-front-header__k__J6FPNZyUrn-outer monivo-local-162-outer d-flex h-section-global-spacing align-items-lg-center align-items-md-center align-items-center" data-kubio="kubio/hero" id="hero">
	<?php $component->printBackground(); ?><?php $component->printSeparator(); ?>
	<div class="position-relative wp-block-kubio-hero__inner monivo-front-header__k__J6FPNZyUrn-inner monivo-local-162-inner h-navigation-padding h-section-grid-container h-section-boxed-container">
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
		<div class="wp-block wp-block-kubio-row  position-relative wp-block-kubio-row__container monivo-front-header__k__bgnhUSaQMl-container monivo-local-163-container gutters-row-lg-2 gutters-row-v-lg-2 gutters-row-md-0 gutters-row-v-md-3 gutters-row-2 gutters-row-v-2" data-kubio="kubio/row">
			<div class="position-relative wp-block-kubio-row__inner monivo-front-header__k__bgnhUSaQMl-inner monivo-local-163-inner h-row align-items-lg-stretch align-items-md-stretch align-items-stretch justify-content-lg-start justify-content-md-center justify-content-start gutters-col-lg-2 gutters-col-v-lg-2 gutters-col-md-0 gutters-col-v-md-3 gutters-col-2 gutters-col-v-2">
				<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container monivo-front-header__k__9IGHpldIpw-container monivo-local-164-container d-flex h-col-lg-auto h-col-md-auto h-col-auto" data-kubio="kubio/column">
					<div class="position-relative wp-block-kubio-column__inner monivo-front-header__k__9IGHpldIpw-inner monivo-local-164-inner d-flex h-flex-basis h-px-lg-0 v-inner-lg-0 h-px-md-1 v-inner-md-0 h-px-2 v-inner-2">
						<div class="position-relative wp-block-kubio-column__align monivo-front-header__k__9IGHpldIpw-align monivo-local-164-align h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-center align-self-md-center align-self-center">
							<?php monivo_theme()->get('front-title')->render(); ?><?php monivo_theme()->get('front-subtitle')->render(); ?><?php monivo_theme()->get('buttons')->render(); ?>
						</div>
					</div>
				</div>
				<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container monivo-front-header__k__A3ia3DXo4-container monivo-local-173-container d-flex h-col-lg-auto h-col-md-auto h-col-auto" data-kubio="kubio/column">
					<div class="position-relative wp-block-kubio-column__inner monivo-front-header__k__A3ia3DXo4-inner monivo-local-173-inner d-flex h-flex-basis h-px-lg-0 v-inner-lg-0 h-px-md-0 v-inner-md-0 h-px-0 v-inner-0">
						<div class="position-relative wp-block-kubio-column__align monivo-front-header__k__A3ia3DXo4-align monivo-local-173-align h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-start align-self-md-start align-self-start">
							<?php monivo_theme()->get('front-image')->render(); ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>