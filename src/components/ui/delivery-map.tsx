"use client"

import { useEffect, useState, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Store, Truck } from "lucide-react";
import LatLng from "@/types/lat-lng";
import { useFormContext, Controller } from "react-hook-form";

const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
};

const center: LatLng = {
    lat: 40.4093,
    lng: 49.8671,
};

function MapPicker({ onLocationSelect }: { onLocationSelect: (loc: LatLng) => void }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    });

    const [selected, setSelected] = useState<LatLng | null>(null);

    const handleClick = useCallback((e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return;

        const location = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        };

        setSelected(location);
        onLocationSelect(location);
    }, [onLocationSelect]);

    if (!isLoaded) return <p>Loading...</p>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onClick={handleClick}
        >
            {selected && <Marker position={selected} />}
        </GoogleMap>
    );
}

function StaticMap() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    });

    const location: LatLng = {
        lat: 40.41587926480181,
        lng: 49.853258505008064,
    };

    if (!isLoaded) return <p>Loading...</p>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={12}
        >
            <Marker position={location} />
        </GoogleMap>
    );
}

interface DeliveryMapProps {
    deliveryPrice: number;
}

export function DeliveryMap({ deliveryPrice }: DeliveryMapProps) {
    const { setValue, watch, control } = useFormContext();

    const selectedValue = watch("deliveryType") || "store";

    useEffect(() => {
        if (selectedValue === "store") {
            setValue("location", null);
        }
    }, [selectedValue, setValue]);

    return (
        <div className="w-full h-[270px] bg-white rounded-[30px] overflow-hidden flex flex-col justify-start items-center pl-[22px] pr-[22px] pt-[15px] pb-[15px] gap-[17px] shadow-[0_0_20px_0_#0000001A]">
            <div className="w-full h-[20px] text-black font-[600] text-[20px]">
                Доставка
            </div>
            <div className="w-[100%] flex-1 flex justify-center items-center pl-[7px] pr-[7px]">
                {selectedValue === "delivery" ? (
                    <Controller
                        name="location"
                        control={control}
                        render={({ field }) => <MapPicker onLocationSelect={field.onChange} />}
                    />
                ) : (
                    <StaticMap />
                )}
            </div>
            <div className="w-full flex justify-between items-center pl-[7px] pr-[7px]">
                <div className="flex flex-row justify-start">
                    {selectedValue === "delivery" ? (
                        <Truck className="w-[20px] h-[20px] mr-[10px]" />
                    ) : (
                        <Store className="w-[20px] h-[20px] mr-[10px]" />
                    )}

                    <Controller
                        name="deliveryType"
                        control={control}
                        defaultValue="store"
                        render={({ field }) => (
                            <select {...field}>
                                <option value="store">Самовывоз</option>
                                <option value="delivery">Доставка курьером</option>
                            </select>
                        )}
                    />
                </div>
                <div className="font-[600] text-[15px] text-center">
                    {selectedValue === "delivery"
                        ? `${deliveryPrice} AZN`
                        : "Ödəniş tələb olunmur"}
                </div>
            </div>
        </div>
    );
}