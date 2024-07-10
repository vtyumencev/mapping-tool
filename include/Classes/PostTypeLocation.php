<?php

namespace Cge\MappingTool\Classes;

class PostTypeLocation
{
	const PLUGIN_NAME = 'mapping-tool';
	public static function register_post_type(): void
	{
		$themeColor = carbon_get_theme_option( 'mapping-tool_accent-color' );

		$args = array(
			'labels'             => array(
				'name'                  => 'Places',
				'singular_name'         => 'Place',
				'add_new'               => 'Add Place',
			),
			'public'             => true,
			'publicly_queryable' => false,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'place' ),
			'capability_type'    => 'post',
			'has_archive'        => false,
			'hierarchical'       => true,
			'menu_position'      => 7,
			'menu_icon'           => 'dashicons-location-alt',
			'supports'           => array( 'title', 'author', 'thumbnail', 'excerpt', 'page-attributes' ),
		);

		register_post_type( 'mapping-tool_place', $args );

		foreach (carbon_get_theme_option( 'mapping-tool-post-types' ) as $item) {

			$args = array(
				'labels'             => array(
					'name'                  => $item['name'],
					'singular_name'         => $item['name_singular'],
				),
				'public'             => true,
				'publicly_queryable' => false,
				'show_ui'            => true,
				'show_in_menu'       => 'edit.php?post_type=mapping-tool_place',
				'query_var'          => true,
				'rewrite'            => array( 'slug' => $item['slug'] ),
				'capability_type'    => 'post',
				'has_archive'        => false,
				'hierarchical'       => false,
				'show_in_rest'       => true,
				'supports'           => array( 'title', 'author', 'thumbnail', 'excerpt', 'editor' ),
				'accent_color'       => empty($item['theme_color']) ? $themeColor : $item['theme_color']
			);

			register_post_type( self::PLUGIN_NAME . '_' . $item['slug'], $args );

			foreach ($item['taxonomies'] as $taxonomy) {
				$args = array(
					'hierarchical'          => false,
					'labels'                => array(
						'name' => $taxonomy['name'],
						'singular_name' => $taxonomy['name'],
					),
					'show_ui'               => true,
					'show_in_rest'          => true,
					'show_admin_column'     => true,
					'update_count_callback' => '_update_post_term_count',
					'query_var'             => true,
				);

				register_taxonomy( self::PLUGIN_NAME. '_' . $item['slug'] . '_' . $taxonomy['slug'], self::PLUGIN_NAME . '_' . $item['slug'], $args );
			}

		}
	}

	public static function init(): void
	{
		add_action( 'init', [__CLASS__, 'register_post_type'] );

	}
}