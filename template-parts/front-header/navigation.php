<?php $component = \ColibriWP\Theme\View::getData( 'component' ); ?>
<div class="wp-block wp-block-kubio-navigation  position-relative wp-block-kubio-navigation__outer <?php echo $component->printNavigationClasses(); ?> monivo-front-header__k__Gp3qTlxXlu-outer monivo-local-89-outer h-navigation_overlap" data-kubio="kubio/navigation" data-kubio-component="overlap" data-kubio-settings="true" id="navigation">
	<?php monivo_theme()->get('front-top-bar')->render(); ?>
	<div class="wp-block wp-block-kubio-navigation-section <?php echo$component->printNavLayoutType();?> position-relative wp-block-kubio-navigation-section__nav monivo-front-header__k__xLwdIMLPC_l-nav monivo-local-106-nav h-section h-navigation" data-kubio="kubio/navigation-section" data-kubio-component="navigation" data-kubio-settings="{&quot;sticky&quot;:{&quot;startAfterNode&quot;:{&quot;enabled&quot;:false},&quot;animations&quot;:{&quot;enabled&quot;:false,&quot;duration&quot;:0.5,&quot;name&quot;:&quot;slideDown&quot;}},&quot;overlap&quot;:true}">
		<div class="position-relative wp-block-kubio-navigation-section__nav-section monivo-front-header__k__xLwdIMLPC_l-nav-section monivo-local-106-nav-section    <?php echo $component->printContainerClasses(); ?>">
			<div class="wp-block wp-block-kubio-navigation-items  position-relative wp-block-kubio-navigation-items__outer monivo-front-header__k__DqcL_YF9LKJ-outer monivo-local-107-outer" data-kubio="kubio/navigation-items" data-nav-normal="true">
				<div class="wp-block wp-block-kubio-row  position-relative wp-block-kubio-row__container monivo-front-header__k__MqErEXZ17Jm-container monivo-local-108-container gutters-row-lg-2 gutters-row-v-lg-2 gutters-row-md-2 gutters-row-v-md-2 gutters-row-2 gutters-row-v-2" data-kubio="kubio/row">
					<div class="position-relative wp-block-kubio-row__inner monivo-front-header__k__MqErEXZ17Jm-inner monivo-local-108-inner h-row align-items-lg-stretch align-items-md-stretch align-items-stretch justify-content-lg-center justify-content-md-center justify-content-center gutters-col-lg-2 gutters-col-v-lg-2 gutters-col-md-2 gutters-col-v-md-2 gutters-col-2 gutters-col-v-2">
						<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container monivo-front-header__k__SFXC9Ze09eu-container monivo-local-109-container d-flex h-col-lg-auto h-col-md-auto h-col" data-kubio="kubio/column">
							<div class="position-relative wp-block-kubio-column__inner monivo-front-header__k__SFXC9Ze09eu-inner monivo-local-109-inner d-flex h-flex-basis h-px-lg-0 v-inner-lg-0 h-px-md-0 v-inner-md-0 h-px-2 v-inner-2">
								<div class="position-relative wp-block-kubio-column__align monivo-front-header__k__SFXC9Ze09eu-align monivo-local-109-align h-y-container h-column__content h-column__v-align flex-basis-auto align-self-lg-center align-self-md-center align-self-center">
									<?php monivo_theme()->get('logo')->render(array (
  'wrapper_class' => 'wp-block wp-block-kubio-logo position-relative wp-block-kubio-logo__container  kubio-logo-direction-row monivo-front-header__k__YpuDHFCdd-container monivo-local--container',
  'logo_image_class' => 'position-relative wp-block-kubio-logo__image  kubio-logo-image  monivo-front-header__k__YpuDHFCdd-image monivo-local--image',
  'alt_logo_image_class' => 'position-relative wp-block-kubio-logo__alternateImage kubio-logo-image kubio-alternate-logo-image   monivo-front-header__k__YpuDHFCdd-alternateImage monivo-local--alternateImage',
  'logo_text_class' => 'position-relative wp-block-kubio-logo__text  monivo-front-header__k__YpuDHFCdd-text monivo-local--text',
)); ?>
								</div>
							</div>
						</div>
						<div class="wp-block wp-block-kubio-column  kubio-hide-on-mobile position-relative wp-block-kubio-column__container monivo-front-header__k__Cu9zji0X5O-container monivo-local-111-container d-flex h-col-lg h-col-md h-col" data-kubio="kubio/column">
							<div class="position-relative wp-block-kubio-column__inner monivo-front-header__k__Cu9zji0X5O-inner monivo-local-111-inner d-flex h-flex-basis h-px-lg-0 v-inner-lg-0 h-px-md-0 v-inner-md-0 h-px-0 v-inner-0">
								<div class="position-relative wp-block-kubio-column__align monivo-front-header__k__Cu9zji0X5O-align monivo-local-111-align h-y-container h-column__content h-column__v-align flex-basis-100 align-self-lg-center align-self-md-center align-self-center">
									<div class="wp-block wp-block-kubio-spacer  position-relative wp-block-kubio-spacer__container monivo-front-header__k__uj2bfOyqkL-container monivo-local-112-container" data-kubio="kubio/spacer"></div>
								</div>
							</div>
						</div>
						<div class="wp-block wp-block-kubio-column  position-relative wp-block-kubio-column__container monivo-front-header__k__ZEkYpBrx7RA-container monivo-local-113-container d-flex h-col-lg-auto h-col-md-auto h-col-auto" data-kubio="kubio/column">
							<div class="position-relative wp-block-kubio-column__inner monivo-front-header__k__ZEkYpBrx7RA-inner monivo-local-113-inner d-flex h-flex-basis h-px-lg-0 v-inner-lg-0 h-px-md-0 v-inner-md-0 h-px-2 v-inner-2">
								<div class="position-relative wp-block-kubio-column__align monivo-front-header__k__ZEkYpBrx7RA-align monivo-local-113-align h-y-container h-column__content h-column__v-align flex-basis-auto align-self-lg-center align-self-md-center align-self-center">
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