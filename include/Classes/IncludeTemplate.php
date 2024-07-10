<?php

namespace Cge\MappingTool\Classes;

class IncludeTemplate
{
	const MAP_TEMPLATE_NAME = 'mapping-tool-map-template';
	const TIMELINE_TEMPLATE_NAME = 'mapping-tool-timeline-template';
	public static function map_theme_path(): string
	{
		return dirname( __FILE__ ) . '/../templates/map-template.php';
	}
	public static function timeline_theme_path(): string
	{
		return dirname( __FILE__ ) . '/../templates/timeline-template.php';
	}
	public static function include_template($template)
	{
		if (get_page_template_slug() === self::MAP_TEMPLATE_NAME) {
			$template = self::map_theme_path();
		}

		if (get_page_template_slug() === self::TIMELINE_TEMPLATE_NAME) {
			$template = self::timeline_theme_path();
		}

		return $template;
	}

	public static function register_template($templates)
	{
		$templates[self::MAP_TEMPLATE_NAME] = 'Map Template';
		$templates[self::TIMELINE_TEMPLATE_NAME] = 'Timeline Template';

		return $templates;
	}

	public static function init(): void
	{
		add_filter( 'template_include', [__CLASS__, 'include_template'], 99);
		add_filter( 'theme_page_templates', [ __CLASS__, 'register_template' ]);
	}
}