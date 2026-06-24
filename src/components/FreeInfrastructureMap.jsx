import React, { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Server } from "lucide-react";

const locations = [
    {
        name: "Kathmandu",
        type: "core",
        role: "Primary Hub",
        position: [27.7172, 85.3240],
        color: "#14477B" // Blue
    },
    {
        name: "Lalitpur",
        type: "core",
        role: "Banking DR",
        position: [27.6644, 85.3188],
        color: "#14477B"
    },
    {
        name: "Pokhara",
        type: "dr",
        role: "Disaster Recovery",
        position: [28.2096, 83.9856],
        color: "#34A853" // Green
    },
    {
        name: "Nepalgunj",
        type: "regional",
        role: "Regional Node",
        position: [28.0500, 81.6167],
        color: "#64748b" // Gray
    },
    {
        name: "Bhairahawa",
        type: "regional",
        role: "Logistics Hub",
        position: [27.5050, 83.4163],
        color: "#64748b"
    },
    {
        name: "Biratnagar",
        type: "regional",
        role: "Eastern Hub",
        position: [26.4525, 87.2718],
        color: "#64748b"
    },
];

const createCustomIcon = (color) => {
    return L.divIcon({
        className: "custom-div-icon",
        html: `
            <div class="relative flex items-center justify-center w-8 h-8">
                <div class="absolute w-full h-full rounded-full animate-ping opacity-60" style="background-color: ${color};"></div>
                <div class="relative w-4 h-4 rounded-full border-2 border-white shadow-lg" style="background-color: ${color};"></div>
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });
};

// Map Controller to animate panning
const MapController = ({ activeLocation }) => {
    const map = useMap();
    React.useEffect(() => {
        if (activeLocation) {
            map.flyTo(activeLocation.position, 7, {
                duration: 1.5,
                easeLinearity: 0.25
            });
        }
    }, [activeLocation, map]);
    return null;
};

const FreeInfrastructureMap = () => {
    const [active, setActive] = useState(locations[0]);

    return (
        <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-slate-50 group">
            
            {/* Minimal Legend */}
            <div className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur-md p-3 rounded-xl border border-gray-100 shadow-md flex flex-col gap-2 pointer-events-none">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#14477B] shadow-[0_0_8px_#14477B]"></div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Core</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#34A853] shadow-[0_0_8px_#34A853]"></div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">DR</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-500 shadow-[0_0_8px_#64748b]"></div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Regional</span>
                </div>
            </div>

            {/* Floating Location Selector */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[400] flex gap-2 overflow-x-auto max-w-[95%] p-2 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {locations.map((loc, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(loc)}
                        className={`whitespace-nowrap px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 backdrop-blur-md shadow-lg border flex items-center gap-2
                            ${active.name === loc.name 
                                ? 'bg-[#14477B]/95 text-white border-[#0B79BF] shadow-[0_10px_20px_rgba(11,121,191,0.2)] -translate-y-1' 
                                : 'bg-white/85 text-gray-600 border-white hover:bg-white hover:-translate-y-0.5'
                            }
                        `}
                    >
                        <Server className={`w-4 h-4 ${active.name === loc.name ? 'text-[#34A853]' : 'text-gray-400'}`} />
                        {loc.name}
                    </button>
                ))}
            </div>

            <MapContainer
                center={active.position}
                zoom={7}
                scrollWheelZoom={false}
                className="h-full w-full z-0"
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                />
                
                <MapController activeLocation={active} />

                {locations.map((loc, i) => (
                    <Marker
                        key={i}
                        position={loc.position}
                        icon={createCustomIcon(loc.color)}
                        eventHandlers={{
                            click: () => setActive(loc),
                        }}
                    >
                        <Popup className="custom-popup" closeButton={false}>
                            <div className="p-1 text-center min-w-[120px]">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{loc.role}</span>
                                <strong className="text-sm text-[#14477B]">{loc.name} Data Center</strong>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default FreeInfrastructureMap;