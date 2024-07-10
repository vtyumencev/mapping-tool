<?php

namespace Cge\MappingTool\Classes;

class App
{
	public static function crb_load(): void
	{
		\Carbon_Fields\Carbon_Fields::boot();
	}

	public static function init(): void
	{
		add_action( 'after_setup_theme', [__CLASS__, 'crb_load'] );
		Carbon::init();
		PostTypeLocation::init();
		IncludeTemplate::init();
		RestAPI::init();
	}
}