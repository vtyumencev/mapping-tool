<?php /* Template Name: Timeline Template */

add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style( 'mapping-tool', MAPPING_TOOL_PATH . 'dist/style.css' );
	wp_enqueue_script( 'mapping-tool', MAPPING_TOOL_PATH . 'dist/mapping-tool.umd.cjs', [], false, ['in_footer' => true] );

	wp_localize_script( 'mapping-tool', 'mappingToolObject', array(

	));
});

$accentColor = carbon_get_theme_option('mapping-tool_accent-color') ?? '#FFFFFF';

$postTypes = carbon_get_theme_option( 'mapping-tool-post-types' );

get_header();

?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">
		<?php wp_head(); ?>
    </head>
    <body <?php echo body_class(); ?>>
        <div x-data="mappingToolTimeline" class="timeline" :class="{'progress': loading}" style="--color-accent: <?php echo $accentColor; ?>;">
            <div class="timeline__container">
                <div class="timeline__sidebar">
                    <div class="map-sidebar-sheets" tabindex="0">
                        <div x-data="mappingToolSheet(true)" x-init="sheetMaster = $data" class="map-sidebar-sheet map-sidebar-sheet-master">
                            <div class="map-sidebar-sheet-section">
                                <div class="map-sidebar-sheet-section__header">
                                    <div class="sidebar-sheet-section__headline">
						                <?php the_title(); ?>
                                    </div>
                                </div>
				                <?php the_content(); ?>
                            </div>
                            <div class="map-filters">
                                <form action="" class="mapping-tool-filter" @change="changeFilters">
                                    <div class="mapping-tool-filter__group map-sidebar-sheet-section">
                                        <div class="map-sidebar-sheet-section__header">
                                            <div class="mapping-tool-filter__group-name sidebar-sheet-section__headline">Data layer</div>
                                        </div>
                                        <div class="mapping-tool-filter__options mapping-tool-filter__options--radio">
                                            <label class="mapping-tool-filter-check">
                                                <input type="radio" name="source" value="" checked />
                                                <span class="mapping-tool-filter-check__box"></span>
                                                <span class="mapping-tool-filter-check__label">Display all layers</span>
                                            </label>
							                <?php foreach ($postTypes as $postType): ?>
                                                <label class="mapping-tool-filter-check">
                                                    <input type="radio" name="source" value="<?php echo $postType['slug']; ?>" />
                                                    <span class="mapping-tool-filter-check__box"></span>
                                                    <span class="mapping-tool-filter-check__label"><?php echo $postType['name']; ?></span>
                                                </label>
							                <?php endforeach; ?>
                                        </div>
                                    </div>
					                <?php foreach ($postTypes as $postType): ?>
						                <?php foreach ($postType['taxonomies'] as $taxonomy): ?>
							                <?php $terms = get_terms(array('taxonomy' => 'mapping-tool' . '_' . $postType['slug'] . '_' . $taxonomy['slug'])); ?>
							                <?php if (count($terms)): ?>
                                                <div class="mapping-tool-filter__group mapping-tool-filter-term map-sidebar-sheet-section" data-source="<?php echo $postType['slug']; ?>">
                                                    <div class="mapping-tool-filter__group-name sidebar-sheet-section__headline">
										                <?php echo $taxonomy['name']; ?>
                                                    </div>
                                                    <div class="mapping-tool-filter__options mapping-tool-filter__options--checkbox">
										                <?php foreach ($terms as $term): ?>
                                                            <label class="mapping-tool-filter-check">
                                                                <input type="checkbox" name="<?php echo $taxonomy['slug']; ?>" value="<?php echo $term->slug; ?>" />
                                                                <span class="mapping-tool-filter-check__box">
                                                                    <svg class="tick" viewBox="0 0 24 24"><path d="m19.85 7.25-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"></path></svg>
                                                                </span>
                                                                <span><?php echo $term->name; ?></span>
                                                            </label>
										                <?php endforeach; ?>
                                                    </div>
                                                </div>
							                <?php endif; ?>
						                <?php endforeach; ?>
					                <?php endforeach; ?>
                                </form>
                            </div>
                        </div>
                        <div x-data="mappingToolSheet(false)" x-init="sheetOverview = $data" class="map-sidebar-sheet map-sidebar-sheet-entries-list">
                            <div class="map-sidebar-sheet-header">
                                <div x-ref="overviewSubHeadline" class="map-sidebar-sheet-header__sub-headline map-sidebar-sheet-header__sub-headline--accent-color"></div>
                                <div x-ref="overviewHeadline" class="map-sidebar-sheet-header__headline"></div>
                            </div>
                            <div class="map-sidebar-sheet-body sheet-overview-body" x-ref="overviewBody"></div>
                            <button class="map-sidebar-sheet__close" @click="close">
                                <svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M3 21.32L21 3.32001" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 3.32001L21 21.32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="timeline__body" x-ref="timelineScale"></div>
                <div class="loading-overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_Wezc{transform-origin:center;animation:spinner_Oiah .75s step-end infinite}@keyframes spinner_Oiah{8.3%{transform:rotate(30deg)}16.6%{transform:rotate(60deg)}25%{transform:rotate(90deg)}33.3%{transform:rotate(120deg)}41.6%{transform:rotate(150deg)}50%{transform:rotate(180deg)}58.3%{transform:rotate(210deg)}66.6%{transform:rotate(240deg)}75%{transform:rotate(270deg)}83.3%{transform:rotate(300deg)}91.6%{transform:rotate(330deg)}100%{transform:rotate(360deg)}}</style><g fill="white" class="spinner_Wezc"><circle cx="12" cy="2.5" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/></g></svg>
                </div>
            </div>
        </div>
    </body>
</html>

<?php

get_footer();

?>