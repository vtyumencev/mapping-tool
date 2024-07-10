import './sass/mapping-tool.scss';

import Alpine from 'alpinejs';
import d3KitTimeline from 'd3kit-timeline'

const mappingTool = () => ({
    sheetMaster: null,
    sheetPlace: null,
    sheetEntriesList: null,
    sheetOverview: null,
    sheetsContainerEl: null,
    map: null,
    sheets: [],
    loading: false,
    init() {
        this.sheetsContainerEl = this.$el.querySelector('.map-sidebar-sheets');
        // TO MAKE THE MAP APPEAR YOU MUST
        // ADD YOUR ACCESS TOKEN FROM
        // https://account.mapbox.com
        mapboxgl.accessToken = mappingToolObject.accessToken;
        this.map = new mapboxgl.Map({
            container: this.$el.querySelector('#mapping-tool-map'), // container ID
            style: 'mapbox://styles/mapbox/dark-v10', // style URL
            center: [10, 50], // starting position [lng, lat]
            zoom: 3.6, // starting zoom
            //fitBoundsOptions: { padding: this.calcMapBoundsPadding() }
        });

        this.map.jumpTo({
            padding: this.calcMapBoundsPadding()
        });

        this.map.on('load', async () => {
            this.map.setFog({}); // Set the default atmosphere style

            const points = await fetch('/wp-json/mapping-tool/v1/getPoints').then(r => r.json());

            this.map.addSource('points', {
                type: 'geojson',
                data: points,
                cluster: true,
                clusterMaxZoom: 14, // Max zoom to cluster points on
                clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
            });

            this.map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'points',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#0FADEA',
                        2,
                        '#0FADEA',
                        4,
                        '#0FADEA'
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

            this.map.addLayer({
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

            this.map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'points',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#0FADEA',
                    'circle-radius': 7,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });

            this.map.on('click', 'clusters', (e) => {
                const features = this.map.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                });
                const clusterId = features[0].properties.cluster_id;
                this.map.getSource('points').getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                        if (err) return;

                        this.map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom,
                            padding: this.calcMapBoundsPadding()
                        });
                    }
                );
            });

            this.map.on('mouseenter', 'clusters', () => {
                this.map.getCanvas().style.cursor = 'pointer';
            });
            this.map.on('mouseleave', 'clusters', () => {
                this.map.getCanvas().style.cursor = '';
            });

            this.map.on('mouseenter', 'unclustered-point', () => {
                this.map.getCanvas().style.cursor = 'pointer';
            });
            this.map.on('mouseleave', 'unclustered-point', () => {
                this.map.getCanvas().style.cursor = '';
            });

            this.map.on('click', 'unclustered-point', (e) => {
                this.openPlace(e.features[0].properties.id)
            });

            this.fitBounds(points);
        });
    },

    openMaster() {
        this.sheetMaster.show();
    },

    async openList() {
        await this.loadEntriesList();
        const visibleSheets = this.getPrimaryVisibleSheets();
        this.sheetEntriesList.$el.style.minHeight = visibleSheets[visibleSheets.length - 1]?.$el.clientHeight + 'px';
        this.sheetEntriesList.show();
    },

    async openOverview(id) {
        await loadPreview(id, this);
        const visibleSheets = this.getPrimaryVisibleSheets();
        this.sheetOverview.$el.style.minHeight = visibleSheets[visibleSheets.length - 1]?.$el.clientHeight + 'px';
        this.sheetOverview.show(async () => {
            await this.updatePoints();
        });
    },

    async openPlace(id) {
        this.sheetOverview.close();
        if (this.sheetPlace.visible) {
            this.sheetPlace.close();
            await new Promise((resolve) => {
                setTimeout(async () => {
                    resolve();
                }, 300);
            })
        }
        await this.loadPlace(id);

        const visibleSheets = this.getPrimaryVisibleSheets();
        this.sheetPlace.$el.style.minHeight = visibleSheets[visibleSheets.length - 1]?.$el.clientHeight + 'px';
        this.sheetPlace.show();
    },

    closeCurrent() {
        const visibleSheets = this.getPrimaryVisibleSheets();
        visibleSheets[visibleSheets.length - 1]?.close();
        visibleSheets[visibleSheets.length - 2]?.increase();
    },

    updateSheets(sheet = null, isClosingAction = false) {
        const visibleSheets = this.getPrimaryVisibleSheets();

        if (visibleSheets.length > 0) {
            this.sheetsContainerEl.classList.add('has-sheets');
        } else {
            this.sheetsContainerEl.classList.remove('has-sheets');
        }

        this.sheets.forEach((sheet) => {
            if (visibleSheets.length > 1 && sheet !== this.sheets[this.sheets.length - 1] && sheet.visible === true) {
                sheet.reduce();
            }
        });

        visibleSheets[visibleSheets.length - 1]?.increase();
    },

    getPrimaryVisibleSheets() {
        return this.sheets.filter((sheet) => sheet.visible === true && sheet.position === 1);
    },

    async changeFilters(e) {
        changeFilters(e, this);
        await this.updatePoints();
    },

    async updatePoints() {
        this.loading = true;

        const response = await fetch(
            '/wp-json/mapping-tool/v1/getPoints?' + new URLSearchParams(this.filterData)
        );

        const data = await response.json();

        this.map.getSource('points').setData(data);

        this.loading = false;

        this.fitBounds(data);

        //this.map.removeLayer('points-labels');
    },

    async loadEntriesList() {
        this.sheetEntriesList.$refs.entriesList.innerHTML = '';

        const paramsObject = Alpine.raw(this.filterData) ?? {};

        const params = new URLSearchParams(paramsObject);

        this.loading = true;

        const response = await fetch(
            '/wp-json/mapping-tool/v1/getEntries?' + params
        ).then(r => r.json());

        this.loading = false;

        response.entries.forEach((entry) => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('map-list-item');
            itemEl.setAttribute('x-on:click', `openOverview(${entry.id})`);

            if (entry.post_type_accent_color) {
                itemEl.style.setProperty('--color-accent', entry.post_type_accent_color);
            }

            itemEl.innerHTML = `
                <div class="map-list-item__type" style="">${entry.post_type_name}</div>
                <div class="map-list-item__title">${entry.post_title}</div>
            `;

            this.sheetEntriesList.$refs.entriesList.appendChild(itemEl);
        });
    },

    async loadPlace(placeId) {
        this.sheetPlace.$refs.entriesList.innerHTML = '';

        const paramsObject = Alpine.raw(this.filterData) ?? {};

        const params = new URLSearchParams(Object.assign(paramsObject, {place_id: placeId}));

        this.loading = true;

        const response = await fetch(
            '/wp-json/mapping-tool/v1/getEntries?' + params
        ).then(r => r.json());

        this.loading = false;

        //this.sheetPlace.$refs.overviewSubHeadline.innerHTML = '';
        this.sheetPlace.$refs.overviewHeadline.innerHTML = response.place.post_title;

        response.entries.forEach((entry) => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('map-list-item');
            itemEl.setAttribute('x-on:click', `openOverview(${entry.id})`);


            if (entry.post_type_accent_color) {
                itemEl.style.setProperty('--color-accent', entry.post_type_accent_color);
            }

            itemEl.innerHTML = `
                <div class="map-list-item__type">${entry.post_type_name}</div>
                <div class="map-list-item__title">${entry.post_title}</div>
            `;

            this.sheetPlace.$refs.entriesList.appendChild(itemEl);
        });
    },

    fitBounds(data) {
        const bounds = new mapboxgl.LngLatBounds();

        data.features.forEach(function (feature) {
            bounds.extend(feature.geometry.coordinates);
        });

        this.map.fitBounds(bounds, {
            maxZoom: 7
        });
    },

    calcMapBoundsPadding() {

        const generalPadding = 40;

        return {
            top: generalPadding, bottom: generalPadding, left: 450 + generalPadding * 2, right: generalPadding
        };

    }
});

const mappingToolSheet = (showOnInit = false, position = 1) => ({
    visible: false,
    reduced: false,
    position: position,
    rootEl: null,
    root: null,
    closeCallback: null,
    timeout: null,
    init() {
        this.root = this;
        this.rootEl = this.$el;
        this.sheets.push(this);
        this.$el.style.setProperty('--sheet-position', position)

        if (showOnInit) {
            this.show();
        }
    },

    close() {
        this.visible = false;
        this.rootEl.classList.remove('map-sidebar-sheet--shown');
        this.timeout = setTimeout(() => {
            this.rootEl.classList.remove('map-sidebar-sheet--visible');
        }, 300);
        this.updateSheets(this.root, true);
        this.closeCallback?.();
        this.closeCallback = null;
    },

    show(closeCallback) {
        clearTimeout(this.timeout);
        this.$el.classList.add('map-sidebar-sheet--visible');
        void this.$el.offsetWidth;
        this.$el.classList.add('map-sidebar-sheet--shown');
        this.visible = true;
        this.updateSheets();
        this.closeCallback = closeCallback;
    },

    reduce() {
        this.$el.classList.add('map-sidebar-sheet--reduced');
        this.reduced = true;
    },

    increase() {
        this.$el.classList.remove('map-sidebar-sheet--reduced');
        this.reduced = false;
    }
});

const mappingToolTimeline = () => ({
    sheetMaster: null,
    sheetOverview: null,
    sheetsContainerEl: null,
    map: null,
    sheets: [],
    loading: false,

    async init() {

        this.sheetsContainerEl = this.$el.querySelector('.map-sidebar-sheets');

        const data = await this.getData();

        const timelineHeight = Math.max(Math.min(this.$el.clientHeight, data.length * 44), 200);

        this.chart = new d3KitTimeline(this.$refs.timelineScale, {
            direction: 'right',
            initialHeight: timelineHeight,
            labella: {
                maxPos: timelineHeight - 40,
                algorithm: 'overlap'
            },
            labelBgColor: ({accent_color}) => accent_color,
            dotColor: ({accent_color}) => accent_color,
            linkColor: ({accent_color}) => accent_color,
            margin: {left: 70},
            textFn: function (d) {
                return d.name;
            }
        })
            .data(data)
            .visualize()
            .resizeToFit()
            .on('labelClick', (d, i) => {
                this.openOverview(d.data.id)
            });

        window.addEventListener('DOMContentLoaded', () => {
        });
    },


    updateSheets(sheet = null, isClosingAction = false) {
        const visibleSheets = this.getPrimaryVisibleSheets();

        if (visibleSheets.length > 0) {
            this.sheetsContainerEl.classList.add('has-sheets');
        } else {
            this.sheetsContainerEl.classList.remove('has-sheets');
        }

        this.sheets.forEach((sheet) => {
            if (visibleSheets.length > 1 && sheet !== this.sheets[this.sheets.length - 1] && sheet.visible === true) {
                sheet.reduce();
            }
        });

        visibleSheets[visibleSheets.length - 1]?.increase();
    },

    getPrimaryVisibleSheets() {
        return this.sheets.filter((sheet) => sheet.visible === true && sheet.position === 1);
    },

    async openOverview(id) {
        await loadPreview(id, this);
        const visibleSheets = this.getPrimaryVisibleSheets();
        this.sheetOverview.$el.style.minHeight = visibleSheets[visibleSheets.length - 1]?.$el.clientHeight + 'px';
        this.sheetOverview.show();
    },

    async changeFilters(e) {
        changeFilters(e, this);

        this.loading = true;

        this.chart.data(await this.getData());

        this.loading = false;
    },

    async getData() {
        const response = await fetch(
            '/wp-json/mapping-tool/v1/getEntries?' + new URLSearchParams(this.filterData)
        ).then(r => r.json());

        const data = [];

        for (const entry of response.entries) {
            if (entry.timeline_date) {
                data.push({
                    time: new Date(entry.timeline_date),
                    name: entry.post_title,
                    id: entry.id,
                    accent_color: entry.post_type_accent_color
                });
                data.push({
                    time: new Date(entry.timeline_date),
                    name: entry.post_title,
                    id: entry.id,
                    accent_color: entry.post_type_accent_color
                });
                data.push({
                    time: new Date(entry.timeline_date),
                    name: entry.post_title,
                    id: entry.id,
                    accent_color: entry.post_type_accent_color
                });
                data.push({
                    time: new Date(entry.timeline_date),
                    name: entry.post_title,
                    id: entry.id,
                    accent_color: entry.post_type_accent_color
                });
                data.push({
                    time: new Date(entry.timeline_date),
                    name: entry.post_title,
                    id: entry.id,
                    accent_color: entry.post_type_accent_color
                });
            }
        }

        return data;
    },
});

const changeFilters = (e, context) => {
    const filterEl = e.currentTarget;

    const formData = new FormData(filterEl);

    context.filterData = {};

    if (formData.get('source')) {
        const fitTermSelectors = filterEl.querySelectorAll(`.mapping-tool-filter-term[data-source="${formData.get('source')}"]`);
        context.filterData['source'] = formData.get('source');
        fitTermSelectors.forEach((el) => {
            el.classList.add('visible');

            const input = el.querySelector('input');

            context.filterData[input.getAttribute('name')] = formData.getAll(input.getAttribute('name'));

        });
    }

    const notFitTermSelectors = filterEl.querySelectorAll(`.mapping-tool-filter-term:not([data-source="${formData.get('source')}"])`);

    notFitTermSelectors.forEach((el) => {
        el.classList.remove('visible');
    });
}

const loadPreview = async (id, context) => {
    context.sheetOverview.$refs.overviewBody.innerHTML = '';

    context.loading = true;

    const response = await fetch(
        '/wp-json/mapping-tool/v1/getPost?post_id=' + id
    ).then(r => r.json());

    context.loading = false;

    if (response.post.post_type_accent_color) {
        context.sheetOverview.$el.style.setProperty('--color-accent', response.post.post_type_accent_color);
    } else {
        context.sheetOverview.$el.style.removeProperty('--color-accent');
    }

    context.sheetOverview.$refs.overviewSubHeadline.innerHTML = response.post.post_type_name;
    context.sheetOverview.$refs.overviewHeadline.innerHTML = response.post.post_title;

    if (response.post.thumbnail_url) {
        context.sheetOverview.$refs.overviewBody.innerHTML += `
                <div class="map-sidebar-sheet-section sheet-overview-body__section">
                    <img class="sheet-overview-body__cover" src="${response.post.thumbnail_url}" />
                </div>
            `;
    }

    context.sheetOverview.$refs.overviewBody.innerHTML += `
            <div class="map-sidebar-sheet-section sheet-overview-body__section">
                ${response.post.content}
            </div>
        `;

    for (const taxonomy of response.taxonomies ?? []) {
        const values = [];

        if (taxonomy.values.length > 0) {
            for (const value of taxonomy.values ?? []) {
                values.push(value.name);
            }

            context.sheetOverview.$refs.overviewBody.innerHTML += `
                    <div class="map-sidebar-sheet-section">
                        <div class="map-sidebar-sheet-section__header">
                            <div class="sidebar-sheet-section__headline">
                                ${taxonomy.taxonomy.label}
                            </div>
                        </div>
                        <div>
                            ${values.join(', ')}
                        </div>
                    </div>
                `;
        }

        // this.map.addLayer({
        //     'id': 'points-labels',
        //     'type': 'symbol',
        //     'source': 'points',
        //     'layout': {
        //         // get the title name from the source's "title" property
        //         'text-field': ['get', 'title'],
        //         'text-font': [
        //             'Open Sans Semibold',
        //             'Arial Unicode MS Bold'
        //         ],
        //         'text-offset': [0, -1.5],
        //         'text-anchor': 'bottom'
        //     },
        //     paint: {
        //         "text-color": "#ffffff",
        //     },
        // });
    }

    if (context.map) {
        if (response.places) {

            const placesList = [];

            for (const {properties} of response.places.features) {
                placesList.push(properties.title);
            }

            context.sheetOverview.$refs.overviewBody.innerHTML += `
                <div class="map-sidebar-sheet-section">
                    <div class="map-sidebar-sheet-section__header">
                        <div class="sidebar-sheet-section__headline">
                            Places
                        </div>
                    </div>
                    <div>
                        ${placesList.join(', ')}
                    </div>
                </div>
            `;
        }

        context.map.getSource('points').setData(response.places);

        context.fitBounds(response.places);
    }
}


Alpine.data('mappingTool', mappingTool);
Alpine.data('mappingToolSheet', mappingToolSheet);
Alpine.data('mappingToolTimeline', mappingToolTimeline);

Alpine.start();