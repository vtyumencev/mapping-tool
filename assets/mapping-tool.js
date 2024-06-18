const mappingTool = () => ({
    sheetMaster: null,
    sheetEntriesList: null,
    sheetsContainerEl: null,
    sheets: [],
    init() {
        this.sheetsContainerEl = this.$el.querySelector('.map-sidebar-sheets');
        // TO MAKE THE MAP APPEAR YOU MUST
        // ADD YOUR ACCESS TOKEN FROM
        // https://account.mapbox.com
        mapboxgl.accessToken = mappingToolObject.accessToken;
        const map = new mapboxgl.Map({
            container: this.$el.querySelector('#mapping-tool-map'), // container ID
            style: 'mapbox://styles/mapbox/dark-v10', // style URL
            center: [10, 50], // starting position [lng, lat]
            zoom: 3.6, // starting zoom
        });
        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style

            map.addSource('points', {
                type: 'geojson',
                data: '/wp-json/mapping-tool/v1/getPoints',
                cluster: true,
                clusterMaxZoom: 14, // Max zoom to cluster points on
                clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
            });

            map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'points',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#51bbd6',
                        2,
                        '#f1f075',
                        4,
                        '#f28cb1'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,
                        100,
                        30,
                        750,
                        40
                    ]
                }
            });

            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'points',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': ['get', 'point_count_abbreviated'],
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });

            map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'points',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });

            map.on('click', 'clusters', (e) => {
                const features = map.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                });
                const clusterId = features[0].properties.cluster_id;
                map.getSource('points').getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                        if (err) return;

                        map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    }
                );
            });

            map.on('mouseenter', 'clusters', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'clusters', () => {
                map.getCanvas().style.cursor = '';
            });
        });
    },

    openMaster() {
        this.sheetMaster.show();
    },

    updateSheets() {
        if (this.getVisibleSheets().length > 0) {
            this.sheetsContainerEl.classList.add('has-sheets');
        } else {
            this.sheetsContainerEl.classList.remove('has-sheets');
        }
    },

    getVisibleSheets() {
        return this.sheets.filter((sheet) => sheet.visible === true);
    },

    changeFilters() {
        console.log(1)
    }
});

const mappingToolSheet = (showOnInit = false) => ({
    visible: false,
    reduced: false,
    init() {
        this.sheets.push(this);
        this.updateSheets();

        if (showOnInit) {
            this.show();
        }
    },

    show() {
        this.$el.classList.add('map-sidebar-sheet--visible');
        void this.$el.offsetWidth;
        this.$el.classList.add('map-sidebar-sheet--shown');
        this.visible = true;
    }
});

document.addEventListener('alpine:init', () => {
    Alpine.data('mappingTool', mappingTool);
    Alpine.data('mappingToolSheet', mappingToolSheet);
});


class MappingTool {
    sidebarSheets = [];
    constructor(mappingToolEl) {

        // const retrieveProjectsByPlace = (placeID) => {
        //     const elContent = document.querySelector('.map-point-overview__body')
        //     jQuery(document).ready( function($) {
        //         $.ajax({
        //             url: pm_object.ajax_url,
        //             type: 'get',
        //             data: {
        //                 action: 'projects_by_place',
        //                 place_id: placeID
        //             },
        //             success: function( response ) {
        //                 elContent.innerHTML = ``
        //                 const posts = JSON.parse(response)
        //                 posts.forEach(project => {
        //                     const ELEMENT = document.createElement('div')
        //                     let arraySectors = [];
        //                     if (project.sector) {
        //                         project.sector.forEach(sector => {
        //                             arraySectors.push(sector.name)
        //                         })
        //                     }
        //                     let webSiteEl = ``
        //                     if (project.web_site) {
        //                         webSiteEl = `
        //                             <a href="${project.web_site}" target="_blank">
        //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
        //                                     <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
        //                                     <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
        //                                 </svg>
        //                             </a>`
        //                     }
        //                     ELEMENT.innerHTML = `
        //                             <div class="projects-preview__content">
        //                                 <div class="projects-preview__desc">
        //                                     <div class="projects-preview__pre-title">${project.post_type == 'projects' ? '<span class="text-accent-red">Good Practice</span>' : '<span class="text-accent-blue">Stakeholder</span>'}</div>
        //                                     <div class="projects-preview__title">${project.post_title}</div>
        //                                     <div class="projects-preview__sectors">${arraySectors.length > 0 ? `Sectors: ${arraySectors.join(', ')}` : ''}</div>
        //                                 </div>
        //                                 <div class="projects-preview__links">${webSiteEl}</div>
        //                             </div>
        //                             `
        //                     elContent.appendChild(ELEMENT)
        //                 })
        //             }
        //         })
        //     })
        // }
        //
        // const overviewPoint = (pointProperties) => {
        //     //retrieveProjectsByPlace(point)
        //     document.querySelector('.map-point-overview').classList.add('map-point-overview--shown')
        //     if (pointProperties.cover) {
        //         document.querySelector('.map-point-overview__cover').classList.remove('map-point-overview__cover--hidden')
        //         document.querySelector('.map-point-overview__cover').style.backgroundImage = 'url(' + pointProperties.cover + ')'
        //     } else {
        //         document.querySelector('.map-point-overview__cover').classList.add('map-point-overview__cover--hidden')
        //     }
        //     document.querySelector('.map-point-overview__title').innerHTML = pointProperties.title
        //     document.querySelector('.map-point-overview__body').innerHTML = `<div class="map-point-overview__loading">Loading...</div>`
        //     retrieveProjectsByPlace(pointProperties.id)
        // }

        // markers.forEach(marker => {
        //
        //     const elMarker = document.createElement('div');
        //     elMarker.classList.add('marker');
        //     elMarker.classList.add('marker--red');
        //     elMarker.style.setProperty('--marker-size', (marker.properties.count < 6 ? marker.properties.count : 6) * 4 + 'px');
        //
        //     // const popup = new mapboxgl.Popup({ offset: 25 }) // add popups
        //     //     .setHTML(
        //     //         (marker.properties.cover ? `<div class="mapboxgl-popup__cover"><img src="${marker.properties.cover}" alt=""></div>` : ``) +
        //     //         `<h5>${marker.properties.title}</h5><div id="marker-popup-${marker.properties.id}" class="projects-preview"></div>`
        //     //     ).on('open', () => overviewPoint(marker.properties.id))
        //
        //     elMarker.addEventListener('click', e => {
        //         if (document.querySelector('.marker--active')) {
        //             document.querySelector('.marker--active').classList.remove('marker--active')
        //         }
        //         e.target.classList.add('marker--active')
        //         overviewPoint(marker.properties)
        //     })
        //
        //     new mapboxgl.Marker(elMarker)
        //         .setLngLat(marker.geometry.coordinates)
        //         .addTo(map);
        // });

        new MappingToolFilter(mappingToolEl, mappingToolEl.querySelector('.mapping-tool-filter'), map);
        new MappingToolSheets(mappingToolEl, this.sidebarSheets, map);
    }
}

class MappingToolSheets {
    constructor(mappingToolEl, sidebarSheets, map) {
        this.map = map;
        this.sidebarSheets = sidebarSheets;
        this.mappingToolEl = mappingToolEl;
        this.sheetsContainerEl = mappingToolEl.querySelector('.map-sidebar-sheets');

        // Adding the master sheet into the array of sheets

        const masterSheet = new MappingToolSheet(this.mappingToolEl.querySelector('.map-sidebar-sheet-master'));
        this.sidebarSheets.push(masterSheet);
        this.showSheet(masterSheet);

        const entriesListSheet = new MappingToolSheet(this.mappingToolEl.querySelector('.map-sidebar-sheet-entries-list'));
        this.sidebarSheets.push(entriesListSheet);

        const openListButtonsEls = this.mappingToolEl.querySelectorAll('.map-open-list');
        const openMasterEls = this.mappingToolEl.querySelectorAll('.js-open-master');
        const closeButtonEl = this.mappingToolEl.querySelector('.map-sidebar-sheets__close');

        openListButtonsEls.forEach((el) => {
            el.addEventListener('click', async () => {

                this.showSheet(entriesListSheet);

                const listEl = this.mappingToolEl.querySelector('.map-sidebar-sheet-entries-list');

                await this.loadEntriesList(listEl);

            });
        });

        openMasterEls.forEach((el) => {
            el.addEventListener('click', () => {
                this.showSheet(masterSheet);
            });
        });

        closeButtonEl?.addEventListener('click', () => {
            this.closeCurrentSheet();
        });


        this.map.on('click', 'unclustered-point', (e) => {
            this.closeSheet(entriesListSheet);
        });
    }

    async loadEntriesList(listEl) {
        listEl.innerHTML = '';

        const response = await fetch(
            '/wp-json/mapping-tool/v1/getEntries'
        ).then(r => r.json());


        response.entries.forEach((entry) => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('map-list-item');

            itemEl.innerHTML = `
                        <div class="map-list-item__type">${entry.post_type_name}</div>
                        <div class="map-list-item__title">${entry.post_title}</div>
                    `;

            listEl.appendChild(itemEl);
        });
    }

    closeCurrentSheet() {
        const visibleSheets = this.getVisibleSheets();
        visibleSheets[visibleSheets.length - 1]?.close();
        visibleSheets[visibleSheets.length - 2]?.increase();
        this.updateState();
    }

    closeSheet(selectedSheet) {
        const visibleSheets = this.getVisibleSheets();
        visibleSheets.forEach((sheet) => {
            if (sheet === selectedSheet) {
                sheet.close();
                this.updateState();
                const newVisibleSheets = this.getVisibleSheets();
                newVisibleSheets[newVisibleSheets.length - 1]?.increase();
            }
        })
    }

    showSheet(selectedSheet) {
        this.sidebarSheets.forEach((sheet) => {
            if (sheet !== selectedSheet && sheet.visible === true) {
                sheet.reduce();
            }
        });
        selectedSheet.show();
        this.updateState();
    }

    updateState() {
        if (this.getVisibleSheets().length > 0) {
            this.sheetsContainerEl.classList.add('has-sheets');
        } else {
            this.sheetsContainerEl.classList.remove('has-sheets');
        }
    }

    getVisibleSheets() {
        return this.sidebarSheets.filter((sheet) => sheet.visible === true);
    }

}

class MappingToolSheet {
    visible = false;
    reduced = false;
    constructor(sheetEl) {
        this.sheetEl = sheetEl;
    }

    close() {
        this.visible = false;
        this.sheetEl.classList.remove('map-sidebar-sheet--shown');
        setTimeout(() => {
            this.sheetEl.classList.remove('map-sidebar-sheet--visible');
        }, 300);
    }

    show() {
        this.sheetEl.classList.add('map-sidebar-sheet--visible');
        setTimeout(() => {
            this.sheetEl.classList.add('map-sidebar-sheet--shown');
        }, 20);
        this.visible = true;
    }

    reduce() {
        this.sheetEl.classList.add('map-sidebar-sheet--reduced');
        this.reduced = true;
    }

    increase() {
        this.sheetEl.classList.remove('map-sidebar-sheet--reduced');
        this.reduced = false;
    }
}

class MappingToolFilter {
    constructor(mappingToolEl, filterEl, map) {

        filterEl.addEventListener('change', async (e) => {

            const formData = new FormData(filterEl);

            this.filterData = {};

            if (formData.get('source')) {
                const fitTermSelectors = filterEl.querySelectorAll(`.mapping-tool-filter-term[data-source="${formData.get('source')}"]`);
                this.filterData['source'] = formData.get('source');
                fitTermSelectors.forEach((el) => {
                    el.classList.add('visible');

                    const input = el.querySelector('input');

                    //console.log(el.getAttribute('name'))
                    this.filterData[input.getAttribute('name')] = formData.getAll(input.getAttribute('name'));

                });

            }

            const notFitTermSelectors = filterEl.querySelectorAll(`.mapping-tool-filter-term:not([data-source="${formData.get('source')}"])`);

            notFitTermSelectors.forEach((el) => {
                el.classList.remove('visible');
            });

            mappingToolEl.classList.add('progress');

            const response = await fetch(
                '/wp-json/mapping-tool/v1/getPoints?' + new URLSearchParams(this.filterData)
            );

            const data = await response.json();

            map.getSource('points').setData(data);

            mappingToolEl.classList.remove('progress');
        });
    }
}