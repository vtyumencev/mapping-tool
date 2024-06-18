<?php

namespace Cge\MappingTool\Classes;

use WP_Error;
use WP_Query;
use WP_REST_Request;
use WP_REST_Response;

class RestAPI
{
	public static function get_entries(WP_REST_Request $request)
	{
		$postTypes = carbon_get_theme_option( 'mapping-tool-post-types' );

		$postTypesForQuery = array();

		$taxonomies = array();

		foreach ($postTypes as $postType) {
			$postTypesForQuery[] = 'mapping-tool_' . $postType['slug'];
		}

		if ($request->get_param('source')) {

			$sourcePostType = array();
			foreach ($postTypes as $postType) {
				if ($postType['slug'] == $request->get_param('source')) {
					$sourcePostType = $postType;
				}
			}

			if (! $sourcePostType) {
				return new WP_Error(
					'mapping-tool_wrong-source',
					'Source not found',
					array( 'status' => rest_authorization_required_code() )
				);
			}

			foreach ($sourcePostType['taxonomies'] as $taxonomy) {
				if (! $request->get_param($taxonomy['slug'])) {
					continue;
				}
				$taxSlug = 'mapping-tool_'. $sourcePostType['slug'] .'_' . $taxonomy['slug'];
				$taxonomies[] = array(
					'taxonomy' => $taxSlug,
					'field' => 'slug',
					'terms' => explode(',', $request->get_param($taxonomy['slug'])),
				);
			}

			$postTypesForQuery[0] = 'mapping-tool_' . $sourcePostType['slug'];
		}

		$sourceEntries = new WP_Query(array(
			'post_type'         => $postTypesForQuery,
			'post_status'       => array('publish'),
			'posts_per_page'    => '-1',
			'tax_query'         => $taxonomies
		));

		$entries = [];

		foreach ($sourceEntries->posts as $sourceEntry) {

			$postTypeName = null;

			foreach ($postTypes as $postType) {
				if ('mapping-tool_' . $postType['slug'] === $sourceEntry->post_type) {
					$postTypeName = $postType['name_singular'];
				}
			}

			$entries[] = array(
				'post_title' => $sourceEntry->post_title,
				'post_type_name' => $postTypeName,
			);
		}

		return new WP_REST_Response(
			array(
				'entries' => $entries,
			),
		);
	}
	public static function get_points(WP_REST_Request $request)
	{
		$args = array(
			'post_type'         => 'mapping-tool_place',
			'post_status'       => array( 'publish' ),
			'posts_per_page'    => '-1'
		);
		$pointsListRaw = new WP_Query($args);

		$postTypes = carbon_get_theme_option( 'mapping-tool-post-types' );

		$postTypesForQuery = array();

		$taxonomies = array();

		foreach ($postTypes as $postType) {
			$postTypesForQuery[] = 'mapping-tool_' . $postType['slug'];
		}

		if ($request->get_param('source')) {

			$sourcePostType = array();
			foreach ($postTypes as $postType) {
				if ($postType['slug'] == $request->get_param('source')) {
					$sourcePostType = $postType;
				}
			}

			if (! $sourcePostType) {
				return new WP_Error(
					'mapping-tool_wrong-source',
					'Source not found',
					array( 'status' => rest_authorization_required_code() )
				);
			}

			foreach ($sourcePostType['taxonomies'] as $taxonomy) {
				if (! $request->get_param($taxonomy['slug'])) {
					continue;
				}
				$taxSlug = 'mapping-tool_'. $sourcePostType['slug'] .'_' . $taxonomy['slug'];
				$taxonomies[] = array(
					'taxonomy' => $taxSlug,
					'field' => 'slug',
					'terms' => explode(',', $request->get_param($taxonomy['slug'])),
				);
			}

			$postTypesForQuery[0] = 'mapping-tool_' . $sourcePostType['slug'];
		}

		$sourceEntries = new WP_Query(array(
			'post_type'         => $postTypesForQuery,
			'post_status'       => array('publish'),
			'posts_per_page'    => '-1',
			'tax_query'         => $taxonomies
		));

		$sourcePlacesIds = [];
		foreach ($sourceEntries->posts as $sourceEntry) {
			$sourcePlaces = carbon_get_post_meta($sourceEntry->ID, 'associated_places');
			foreach ($sourcePlaces as $sourcePlace) {
				$sourcePlacesIds[] = $sourcePlace['id'];
			}
		};

		$pointsList = [];
		foreach ($pointsListRaw->posts as $pointRow) {
			if (isset($sourcePlacesIds) && ! in_array($pointRow->ID, array_unique($sourcePlacesIds))) {
				continue;
			}
			$placeLocation = carbon_get_post_meta( $pointRow->ID, 'crb_place_location' );
			$pointsList[] = array(
				'id' => $pointRow->ID,
				'title' => $pointRow->post_title,
				'geometry' => array('coordinates' => [$placeLocation['lng'], $placeLocation['lat']])
			);
		}

		return new WP_REST_Response(
			array(
				'type' => 'FeatureCollection',
				'features' => $pointsList,
			),
		);
	}

	public static function rest_api(): void
	{
		register_rest_route( 'mapping-tool/v1', 'getPoints', array(
			'methods' => 'GET',
			'callback' => [__CLASS__, 'get_points'],
		) );

		register_rest_route( 'mapping-tool/v1', 'getEntries', array(
			'methods' => 'GET',
			'callback' => [__CLASS__, 'get_entries'],
		) );
	}
	public static function init(): void
	{
		add_filter( 'rest_api_init', [__CLASS__, 'rest_api']);
	}
}