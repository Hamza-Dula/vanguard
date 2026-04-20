<?php


namespace ColibriWP\Theme\Components\FrontHeader;

use ColibriWP\Theme\Components\CSSOutput;
use ColibriWP\Theme\Core\ComponentBase;
use ColibriWP\Theme\Defaults;
use ColibriWP\Theme\Translations;
use ColibriWP\Theme\View;

class Title extends ComponentBase {

	protected static $settings_prefix = 'header_front_page.title.';

	/**
	 * @return array();
	 */
	protected static function getOptions() {
		$prefix = static::$settings_prefix;

		return array(
			'sections' => array(
				"{$prefix}section" => array(
					'title'  => Translations::get( 'title' ),
					'panel'  => 'header_panel',
					'type'   => 'colibri_section',
					'hidden' => true,
				),
			),

			'settings' => array(
				"{$prefix}show"               => array(
					'default'   => Defaults::get( "{$prefix}show" ),
					'transport' => 'refresh',
					'control'   => array(
						'label'       => Translations::get( 'show_title' ),
						'type'        => 'switch',
						'show_toggle' => true,
						'section'     => 'hero',
						'colibri_tab' => 'content',
					),

				),
				"{$prefix}localProps.content" => array(
					'default' => __( "Let's build this together", 'monivo' ),
					'control' => array(
						'label'       => Translations::get( 'title' ),
						'type'        => 'input',
						'input_type'  => 'textarea',
						'section'     => "{$prefix}section",
						'colibri_tab' => 'content',
					),
				),
				"{$prefix}style.textAlign"    => array(
					'default'    => Defaults::get( "{$prefix}style.textAlign" ),
					'control'    => array(
						'label'       => Translations::escHtml( 'align' ),
						'type'        => 'align-button-group',
						'button_size' => 'medium',
						'choices'     => array(
							'left'   => 'left',
							'center' => 'center',
							'right'  => 'right',
						),
						'none_value'  => 'flex-start',
						'section'     => "{$prefix}section",
						'colibri_tab' => 'content',
					),
					'css_output' => array(
						array(
							'selector' => static::selectiveRefreshSelector(),
							'media'    => CSSOutput::NO_MEDIA,
							'property' => 'text-align',
						),
					),
				),
			),
		);
	}

	public static function selectiveRefreshSelector() {
		return Defaults::get( static::$settings_prefix . 'selective_selector', false );
	}

	public function getPenPosition() {
		return static::PEN_ON_RIGHT;
	}

	public function renderContent( $parameters = array() ) {

		if ( $this->mod( static::$settings_prefix . 'show' ) ) {
			View::partial(
				'front-header',
				'title',
				array(
					'component' => $this,
				)
			);
		}
	}

	public function printTitle( $shortcode = '' ) {

		$prefix = static::$settings_prefix;

		if ( get_theme_mod( "{$prefix}localProps.content", false ) || is_user_logged_in() ) {
			$value = trim( $this->mod( "{$prefix}localProps.content" ) );
		} else {
			$value = get_bloginfo( 'name' );
		}

		// Case of highlighted word in title
		if ( Defaults::get( "{$prefix}highlight.enabled", false ) ) {
			$word       = Defaults::get( "{$prefix}highlight.word" );
			$fancy_word = sprintf( '<span class="fancy-title-headline d-inline-flex">
		<span class="text-wrapper-fancy">
			<span class="text-animation-fancy">
				%s
			</span>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" preserveAspectRatio="none">
				<path d="M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7"/></svg>
        </span>
    </span>', esc_html( $word ) );

			$fancy_word = str_replace( array( "\r\n", "\r", "\n", "\\n", "\t", "\\t" ), '', $fancy_word );
			$value      = str_replace( $word, $fancy_word, $value );
		}

		echo str_replace( array( "\r\n", "\r", "\n", "\\n" ), '<br>', $value );
	}
}








