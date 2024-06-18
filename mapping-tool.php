<?php
/**
 * Plugin Name: Mapping Tool
 * Plugin URI:  http://cge-erfurt.org
 * Version:     1.0.0
 * Author:      Slava
 * Author URI:  http://cge-erfurt.org
 * Text Domain: cge-mapping-tool
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'MAPPING_TOOL_PATH', plugin_dir_url( __FILE__ ) );

use Cge\MappingTool\Classes\App;

require 'vendor/autoload.php';

App::init();