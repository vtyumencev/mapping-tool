<?php

namespace Cge\MappingTool\Classes;

class IncludeTemplate
{
	const TEMPLATE_NAME = 'mapping-tool-template';
	public static function theme_path(): string
	{
		return dirname( __FILE__ ) . '/../templates/map-template.php';
	}
	public static function include_template($template)
	{
		if (get_page_template_slug() === self::TEMPLATE_NAME) {
			$template = self::theme_path();
		}

		return $template;
	}

	public static function register_template($templates)
	{
		$templates[self::TEMPLATE_NAME] = 'Map Template';

		return $templates;
	}

	public static function init(): void
	{
		add_filter( 'template_include', [__CLASS__, 'include_template'], 99);
		add_filter( 'theme_page_templates', [ __CLASS__, 'register_template' ]);
	}
}