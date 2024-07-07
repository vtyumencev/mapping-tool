<?php

namespace Cge\MappingTool\Classes;

use WP_Error;
use WP_Query;
use WP_REST_Request;
use WP_REST_Response;

class RestAPI
{
	public static function get_post(WP_REST_Request $request)
	{
		$postId = $request->get_param('post_id');

		$post = get_post($postId);

		$post->thumbnail_url = get_the_post_thumbnail_url($post);

		$post->content = get_the_content(null, false, $post);

		$post->post_type_name = get_post_type_object($post->post_type)->labels->singular_name;
		$post->post_type_accent_color = get_post_type_object($post->post_type)->accent_color;

		$taxonomies = [];

		foreach (get_post_taxonomies($post) as $taxonomy) {
			$taxonomies[] = [
				'taxonomy' => get_taxonomy($taxonomy),
				'values' => get_the_terms( $post->ID, $taxonomy ),
			];
		}

		$placesList = [];
		$postPlaces = carbon_get_post_meta($post->ID, 'associated_places');
		foreach ($postPlaces as $postPlace) {
			$place = get_post($postPlace['id']);
			$placeLocation = carbon_get_post_meta($postPlace['id'], 'crb_place_location');
			$placesList[] = array(
				'properties' => [
					'id' => $place->ID,
					'title' => $place->post_title,
				],
				'geometry' => array('coordinates' => [$placeLocation['lng'], $placeLocation['lat']])
			);
		}

		$places = array(
			'type' => 'FeatureCollection',
			'features' => $placesList,
		);

		return new WP_REST_Response(
			array(
				'post' => $post,
				'taxonomies' => $taxonomies,
				'places' => $places,
			),
		);
	}
	public static function get_entries(WP_REST_Request $request)
	{
		$postTypes = carbon_get_theme_option( 'mapping-tool-post-types' );

		$postTypesForQuery = array();

		$taxonomies = array();

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
		} else {
			foreach ($postTypes as $postType) {
				$postTypesForQuery[] = 'mapping-tool_' . $postType['slug'];
			}
		}

		$place = null;
		$metaQueries = [];
		if ($request->get_param('place_id')) {
			$metaQueries[] = [
				'crb_map' => array(
					'key' => 'associated_places',
					'carbon_field_property' => 'id',
					'compare' => '=',
					'value' => $request->get_param('place_id'),
				)
			];

			$place = get_post($request->get_param('place_id'));
		}

		$sourceEntries = new WP_Query(array(
			'post_type'         => $postTypesForQuery,
			'post_status'       => array('publish'),
			'posts_per_page'    => '-1',
			'tax_query'         => $taxonomies,
			'meta_query'        => $metaQueries,
		));

		$entries = [];

		foreach ($sourceEntries->posts as $sourceEntry) {
			$entries[] = array(
				'id' => $sourceEntry->ID,
				'post_title' => $sourceEntry->post_title,
				'post_type_name' => get_post_type_object($sourceEntry->post_type)->labels->singular_name,
				'post_type_accent_color' => get_post_type_object($sourceEntry->post_type)->accent_color
			);
		}

		return new WP_REST_Response(
			array(
				'entries' => $entries,
				'place' => $place,
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

			$postTypesForQuery[] = 'mapping-tool_' . $sourcePostType['slug'];
		} else {
			foreach ($postTypes as $postType) {
				$postTypesForQuery[] = 'mapping-tool_' . $postType['slug'];
			}
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
				'properties' => [
					'id' => $pointRow->ID,
					'title' => $pointRow->post_title,
				],
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

		register_rest_route( 'mapping-tool/v1', 'getPost', array(
			'methods' => 'GET',
			'callback' => [__CLASS__, 'get_post'],
		) );
	}
	public static function init(): void
	{
		add_filter( 'rest_api_init', [__CLASS__, 'rest_api']);
	}
}