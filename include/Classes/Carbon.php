<?php

namespace Cge\MappingTool\Classes;

use Carbon_Fields\Container;
use Carbon_Fields\Field;

class Carbon
{
	public static function register_fields(): void
	{

		Container::make( 'theme_options', 'settings', 'Configuration' )
			->set_page_parent( 'edit.php?post_type=mapping-tool_place' )
			->add_tab( 'General settings', array(
				Field::make( 'text', 'map_box_token', 'MapBox Token' ),
				Field::make( 'text', 'google_maps_token', 'Google Maps Token' ),
			) )
			->add_tab( 'Data Layers', array(
				Field::make( 'complex', 'mapping-tool-post-types', 'Data Layers' )
				     ->set_layout( 'grid' )
				     ->add_fields( array(
					     Field::make( 'text', 'slug', 'Slug' ),
					     Field::make( 'text', 'name', 'Data Layer Name' ),
					     Field::make( 'text', 'name_singular', 'Data Layer Name Singular' ),
					     Field::make( 'color', 'theme_color', 'Accent Colour' ),
					     Field::make( 'complex', 'taxonomies', 'Data Layer\'s Taxonomies' )
					          ->set_layout( 'grid' )
					          ->add_fields( array(
						          Field::make( 'text', 'slug', 'Slug' ),
						          Field::make( 'text', 'name', 'Taxonomy Name' ),
					          )),
				     )),
			))
			->add_tab( 'UI', array(
				Field::make( 'association', 'mapping-tool_menu', 'Displayed menu' )
					->set_max(1)
					->set_min(1)
					->set_types(array(
						 array(
						     'type'      => 'term',
						     'taxonomy' => 'nav_menu',
						 )
					)),
				Field::make('color', 'mapping-tool_accent-color', 'Accent Colour'),
			) );

		Container::make( 'post_meta', 'Map' )
	         ->where( 'post_type', '=', 'mapping-tool_place' )
	         ->add_fields( array(
		         Field::make( 'map', 'crb_place_location' )
		              ->set_position( 50.5, 10.5, 6.5 ),
	         ));

		foreach (carbon_get_theme_option( 'mapping-tool-post-types' ) as $item) {

			Container::make( 'post_meta', 'Places' )
			         ->where( 'post_type', '=', 'mapping-tool_' . $item['slug'] )
			         ->add_fields( array(
						 Field::make('date', 'timeline_date', 'Timeline Date'),
				         Field::make('association', 'associated_places', 'Associated Places')
				              ->set_types( array(
					              array(
						              'type'      => 'post',
						              'post_type' => 'mapping-tool_place',
					              )
				              ))
			         ));
		}
	}

	public static function gmaps_token(): string
	{
		return carbon_get_theme_option('google_maps_token');
	}

	public static function init(): void
	{
		add_action( 'carbon_fields_register_fields', [__CLASS__, 'register_fields'] );

		add_filter( 'carbon_fields_map_field_api_key', [__CLASS__, 'gmaps_token'] );
	}
}