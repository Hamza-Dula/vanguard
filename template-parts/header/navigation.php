<?php $component = \ColibriWP\Theme\View::getData( 'component' ); ?>
<div class="wp-block wp-block-kubio-navigation  position-relative wp-block-kubio-navigation__outer <?php echo $component->printNavigationClasses(); ?> monivo-header__k__xOrN-kQnxqX-outer monivo-local-610-outer h-navigation_overlap" data-kubio="kubio/navigation" data-kubio-component="overlap" data-kubio-settings="true" id="navigation">
	<?php monivo_theme()->get('inner-top-bar')->render(); ?>
	<div class="wp-block wp-block-kubio-navigation-section <?php echo$component->printNavLayoutType();?> position-relative wp-block-kubio-navigation-section__nav monivo-header__k__Z1VDHLWijX2-nav monivo-local-627-nav h-section h-navigation" data-kubio="kubio/navigation-section" data-kubio-component="navigation" data-kubio-settings="{&quot;sticky&quot;:{&quot;startAfterNode&quot;:{&quot;enabled&quot;:false},&quot;animations&quot;:{&quot;enabled&quot;:false,&quot;duration&quot;:0.5,&quot;name&quot;:&quot;slideDown&quot;}},&quot;overlap&quot;:true}">
		<div class="position-relative wp-block-kubio-navigation-section__nav-section monivo-header__k__Z1VDHLWijX2-nav-section monivo-local-627-nav-section    <?php echo $component->printContainerClasses(); ?>">
			<div class="wp-block wp-block-kubio-navigation-items  position-relative wp-block-kubio-navigation-items__outer monivo-header__k__pz6tzWfEC9g-outer monivo-local-628-outer" data-kubio="kubio/navigation-items" data-nav-normal="true">
				<div class="wp-block wp-block-kubio-row  position-relative wp-block-kubio-row__container monivo-header__k__jvmvBEMhtfb-container monivo-local-629-container gutters-row-lg-2 gutters-row-v-lg-2 gutters-row-md-2 gutters-row-v-md-2 gutters-row-2 gutters-row-v-2" data-kubio="kubio/row">
					<div class="position-relative wp-block-kubio-row__inner monivo-header__k__jvmvBEMhtfb-inner monivo-local-629-inner h-row align-items-lg-stretch align-items-md-stretch align-items-stretch justify-content-lg-center justify-content-md-center justify-content-center gutters-col-lg-2 gutters-col-v-lg-2 gutters-col-md-2 gutters-col-v-md-2 gutters-col-2 gutters-col-v-2">
						<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container monivo-header__k__BjATl0A_gte-container monivo-local-630-container d-flex h-col-lg-auto h-col-md-auto h-col" data-kubio="kubio/column">
							<div class="position-relative wp-block-kubio-column__inner monivo-header__k__BjATl0A_gte-inner monivo-local-630-inner d-flex h-flex-basis h-px-lg-0 v-inner-lg-0 h-px-md-0 v-inner-md-0 h-px-2 v-inner-2">
								<div class="position-relative wp-block-kubio-column__align monivo-header__k__BjATl0A_gte-align monivo-local-630-align h-y-container h-column__content h-column__v-align flex-basis-auto align-self-lg-center align-self-md-center align-self-center">
									<?php monivo_theme()->get('logo')->render(array (
  'wrapper_class' => 'wp-block wp-block-kubio-logo position-relative wp-block-kubio-logo__container  kubio-logo-direction-row monivo-header__k__i8De4Jk2IZP-container monivo-local--container',
  'logo_image_class' => 'position-relative wp-block-kubio-logo__image  kubio-logo-image  monivo-header__k__i8De4Jk2IZP-image monivo-local--image',
  'alt_logo_image_class' => 'position-relative wp-block-kubio-logo__alternateImage kubio-logo-image kubio-alternate-logo-image   monivo-header__k__i8De4Jk2IZP-alternateImage monivo-local--alternateImage',
  'logo_text_class' => 'position-relative wp-block-kubio-logo__text  monivo-header__k__i8De4Jk2IZP-text monivo-local--text',
)); ?>
								</div>
							</div>
						</div>
						<div class="wp-block wp-block-kubio-column  kubio-hide-on-mobile position-relative wp-block-kubio-column__container monivo-header__k__ufAcntjGXV6-container monivo-local-632-container d-flex h-col-lg h-col-md h-col" data-kubio="kubio/column">
							<div class="position-relative wp-block-kubio-column__inner monivo-header__k__ufAcntjGXV6-inner monivo-local-632-inner d-flex h-flex-basis h-px-lg-0 v-inner-lg-0 h-px-md-0 v-inner-md-0 h-px-0 v-inner-0">
								<div class="position-relative wp-block-kubio-column__align monivo-header__k__ufAcntjGXV6-align monivo-local-632-align h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-center align-self-md-center align-self-center">
									<div class="wp-block wp-block-kubio-spacer  position-relative wp-block-kubio-spacer__container monivo-header__k__qhPwzRdR7Er-container monivo-local-633-container" data-kubio="kubio/spacer"></div>
								</div>
							</div>
						</div>
						<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container monivo-header__k__xVvHFy0TI7q-container monivo-local-634-container d-flex h-col-lg-auto h-col-md-auto h-col-auto" data-kubio="kubio/column">
							<div class="position-relative wp-block-kubio-column__inner monivo-header__k__xVvHFy0TI7q-inner monivo-local-634-inner d-flex h-flex-basis h-px-lg-0 v-inner-lg-0 h-px-md-0 v-inner-md-0 h-px-2 v-inner-2">
								<div class="position-relative wp-block-kubio-column__align monivo-header__k__xVvHFy0TI7q-align monivo-local-634-align h-y-container h-column__content h-column__v-align flex-basis-auto align-self-lg-center align-self-md-center align-self-center">
									<?php monivo_theme()->get('header-menu')->render(); ?>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>