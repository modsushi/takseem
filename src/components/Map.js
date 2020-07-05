import React, { Component } from 'react';
import 'leaflet';
import * as topojson from "topojson-client";
import { MapComponent } from 'react-leaflet';
const L = window['L'];
const MAP_POSITION = [31.5204, 74.3587];
const MAP_CONTAINER = 'mapid';
const MAP_ZOOM = 7;
var map = null, OUTER_POLY = null, innerWidth = null, innerHeight = null;
export default class PakistanMap extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setupMask();
        map = L.map(MAP_CONTAINER)
            .setView(MAP_POSITION, MAP_ZOOM);
        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?key=13fb915c-dedd-4b57-8d2f-5fc9f25f802c', {
            maxZoom: 18,
            minZoom: 0,
            attribution: 'hello',
            crossOrigin: true
        }).addTo(map);
        this.addControlPlaceholders();
        map.zoomControl.setPosition('verticalcenterleft');
        // Load Country Polygon
        fetch('pak_districts.json')
            .then( (response) => {
                return response.json();
            })
            .then( (data) => {
                const geodata = topojson.feature(data, data.objects.PAK_adm3);
                console.log(geodata)
                OUTER_POLY = L.geoJSON(geodata.features)
                // OUTER_POLY.setStyle({fillColor: '#000'});
                map.fitBounds(OUTER_POLY.getBounds());
                // this.createCountryBoundary(data);
            });
        fetch('pak_simple.json')
            .then( (response) => {
                return response.json();
            })
            .then( (data) => {
                this.createCountryBoundary(data);
            });
        
    }

    addControlPlaceholders() {
        var corners = map._controlCorners,
            l = 'leaflet-',
            container = map._controlContainer;
    
        function createCorner(vSide, hSide) {
            var className = l + vSide + ' ' + l + hSide;
            corners[vSide + hSide] = L.DomUtil.create('div', className, container);
        }
    
        createCorner('verticalcenter', 'left');
        createCorner('verticalcenter', 'right');
    }

    setupMask() {
        // credits: https://github.com/turban/Leaflet.Mask
        L.Mask = L.Polygon.extend({
            options: {
                stroke: false,
                color: '#333',
                fillOpacity: 0.5,
                clickable: true,

                outerBounds: new L.LatLngBounds([-90, -360], [90, 360])
            },

            initialize: function (latLngs, options) {
                
                var outerBoundsLatLngs = [
                    this.options.outerBounds.getSouthWest(),
                    this.options.outerBounds.getNorthWest(),
                    this.options.outerBounds.getNorthEast(),
                    this.options.outerBounds.getSouthEast()
                ];
                L.Polygon.prototype.initialize.call(this, [outerBoundsLatLngs, latLngs], options);	
            },

        });
        L.mask = function (latLngs, options) {
            return new L.Mask(latLngs, options);
        };
    }

    createCountryBoundary(data) {
        const coords = data.geometry.coordinates[0];
        const latlngs = coords.map( (c) => {;
            return new L.LatLng(c[1], c[0]);
        });
        L.mask(latlngs).addTo(map);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <div id='mapid' style={{width:window.innerWidth+'px', height:(window.innerHeight-1)+'px'}}/>
    }

}
