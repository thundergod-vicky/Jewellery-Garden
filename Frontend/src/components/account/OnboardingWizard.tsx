"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import {
  User,
  Phone,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Gem,
  Crown,
  ShieldCheck,
  Check,
  Navigation,
  Loader2,
  MapPin,
  Building,
  Home,
  Compass,
} from "lucide-react";
import toast from "react-hot-toast";

interface OnboardingWizardProps {
  onComplete?: () => void;
}

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const { user, profile, updateUserProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Step 1: Personal Info
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  // Step 2: Preferences
  const [metals, setMetals] = useState<string[]>(["22KT Gold"]);
  const [styles, setStyles] = useState<string[]>(["Traditional Bengali"]);

  // Step 3: Complete Delivery Address Fields
  const [pincode, setPincode] = useState("713216");
  const [building, setBuilding] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("Durgapur");
  const [state, setState] = useState("West Bengal");
  const [detectingLocation, setDetectingLocation] = useState(false);

  useEffect(() => {
    if (!user) return;
    const onboardedKey = `jg-onboarded-${user.uid}`;
    const alreadyOnboarded = typeof window !== "undefined" ? localStorage.getItem(onboardedKey) : null;

    if (!alreadyOnboarded) {
      setIsOpen(true);
      setUsername(user.displayName || profile?.username || user.email.split("@")[0]);
      setPhone(profile?.phone || "");
    }
  }, [user, profile]);

  if (!isOpen || !user) return null;

  const toggleMetal = (metal: string) => {
    setMetals((prev) =>
      prev.includes(metal) ? prev.filter((m) => m !== metal) : [...prev, metal]
    );
  };

  const toggleStyle = (style: string) => {
    setStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const displayParts = (data.display_name || "")
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean);

            const detectedCity =
              addr.city || addr.town || addr.municipality || addr.district || addr.state_district || displayParts[1] || "Durgapur";
            const detectedPostcode =
              addr.postcode || (data.display_name?.match(/\b\d{6}\b/) || [])[0] || "713200";
            const detectedState = addr.state || "West Bengal";

            // Extract Area / Street / Locality
            const streetParts = [
              addr.road,
              addr.pedestrian,
              addr.suburb,
              addr.neighbourhood,
              addr.residential,
              displayParts[0],
            ].filter(Boolean);
            const detectedRoad =
              Array.from(new Set(streetParts)).slice(0, 2).join(", ") || `${detectedCity} Central Area`;

            // Extract Building / House / Premise
            const detectedBuilding =
              addr.building ||
              (addr.house_number ? `Flat/House ${addr.house_number}` : "") ||
              (addr.residential ? `${addr.residential} Block` : "") ||
              `${detectedCity} Main Sector`;

            // Extract Landmark
            const detectedLandmark =
              addr.amenity ||
              addr.landmark ||
              addr.commercial ||
              (addr.suburb ? `Near ${addr.suburb}` : `Near ${detectedCity} Center`);

            setCity(detectedCity);
            setPincode(detectedPostcode);
            setState(detectedState);
            setStreet(detectedRoad);
            setBuilding(detectedBuilding);
            setLandmark(detectedLandmark);

            toast.success(
              `All 6 Address Fields Auto-Filled: ${detectedCity}, ${detectedState} (${detectedPostcode}) 📍`
            );
          } else {
            toast.error("Could not fetch location details. Please enter manually.");
          }
        } catch (err) {
          toast.error("Error fetching location. Using default values.");
        } finally {
          setDetectingLocation(false);
        }
      },
      (err) => {
        setDetectingLocation(false);
        toast.error("GPS access denied or unavailable. Please fill in your address details manually.");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleFinish = async () => {
    try {
      const addressObj = {
        country: "India",
        fullName: username || user.displayName || "Customer",
        mobile: phone || "",
        pincode: pincode || "713200",
        flat: building || `${city} Main Sector`,
        area: street || `${city} Central Area`,
        landmark: landmark || `Near ${city} Center`,
        city: city || "Durgapur",
        state: state || "West Bengal",
        isDefault: true,
        addressType: "House",
      };

      const fullAddressJSON = JSON.stringify(addressObj);

      await updateUserProfile({
        username,
        phone,
        addresses: [fullAddressJSON],
      });

      if (typeof window !== "undefined") {
        localStorage.setItem(`jg-onboarded-${user.uid}`, "true");
      }

      setIsOpen(false);
      toast.success("Welcome to Jewellery Garden VIP Circle! Setup complete! ✨", {
        duration: 5000,
      });

      if (onComplete) onComplete();
    } catch (e) {
      setIsOpen(false);
    }
  };

  const handleSkip = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`jg-onboarded-${user.uid}`, "true");
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans overflow-y-auto">
      {/* Split Screen Container */}
      <div className="bg-white rounded-3xl w-full max-w-[960px] min-h-[580px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-[#E8E3DA] relative my-auto">
        
        {/* LEFT PANEL: Rich Luxury Burgundy Branding */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#5A0A0E] via-[#A0161C] to-[#3B0507] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Geometric Background Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Top Brand Tag */}
          <div className="relative z-10 space-y-1">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-300 drop-shadow-sm" />
              <span className="font-serif text-sm tracking-[0.25em] uppercase font-bold bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-100 bg-clip-text text-transparent drop-shadow-sm">
                JEWELLERY GARDEN
              </span>
            </div>
            <span className="text-[9px] text-red-200/90 tracking-[0.3em] uppercase block font-mono font-semibold">
              ESTD 1973 • BENGALI HERITAGE
            </span>
          </div>

          {/* Center Showcase Content */}
          <div className="relative z-10 my-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 shadow-inner">
              <Gem className="w-7 h-7 drop-shadow-sm" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-snug text-white">
              Crafting <span className="italic font-light bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-100 bg-clip-text text-transparent">Timeless</span> Bengali <span className="font-bold underline decoration-amber-400/50 underline-offset-4">Elegance</span>
            </h2>

            <p className="text-xs text-red-100/90 leading-relaxed max-w-[280px] font-normal tracking-wide">
              {step === 1 && "Confirm your profile details to unlock personal concierge support & order tracking."}
              {step === 2 && "Personalize your catalog to discover 22KT gold sitahars, bangles & 925 silver."}
              {step === 3 && "Auto-fetch accurate address & delivery coordinates via browser GPS."}
            </p>

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-yellow-300/10 border border-amber-300/40 text-amber-200 text-[10px] font-bold tracking-wider px-3.5 py-1.5 rounded-full shadow-xs uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>100% BIS 916 Hallmarked Gold</span>
            </div>
          </div>

          {/* Bottom Step Dots Indicator */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/15">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s === step ? "w-8 bg-gradient-to-r from-amber-300 to-yellow-200 shadow-xs" : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-amber-200 font-mono tracking-widest font-bold uppercase">Step {step} of 3</span>
          </div>
        </div>

        {/* RIGHT PANEL: Interactive Wizard Form */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white text-left relative overflow-y-auto max-h-[85vh]">
          
          {/* Top Control Bar */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold tracking-[0.3em] text-red-950/40 uppercase font-mono border-b border-[#C8232A]/20 pb-0.5">
              ONBOARDING WIZARD
            </span>
            <button
              onClick={handleSkip}
              className="text-xs text-gray-400 hover:text-[#C8232A] font-semibold tracking-wider transition-colors cursor-pointer"
            >
              Skip for now
            </button>
          </div>

          {/* STEP 1: Personal Profile */}
          {step === 1 && (
            <div className="space-y-6 my-auto">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A] tracking-wide">
                  Welcome! <span className="italic font-serif font-normal text-[#C8232A]">Set Up Your Profile</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1 font-normal tracking-wide">Please confirm your display name and contact phone number.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-800 uppercase tracking-[0.2em] font-mono block">Your Full Name</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. Souvik Basu"
                      className="w-full pl-10 pr-4 py-3 border border-[#E8E3DA] rounded-xl text-xs font-semibold text-[#1A1A1A] focus:border-[#C8232A] focus:ring-1 focus:ring-[#C8232A] focus:outline-none transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-800 uppercase tracking-[0.2em] font-mono block">Mobile Number</label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98000 XXXXX"
                      className="w-full pl-10 pr-4 py-3 border border-[#E8E3DA] rounded-xl text-xs font-semibold text-[#1A1A1A] focus:border-[#C8232A] focus:ring-1 focus:ring-[#C8232A] focus:outline-none transition-all shadow-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Preferences */}
          {step === 2 && (
            <div className="space-y-6 my-auto">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A] tracking-wide">
                  Select <span className="italic font-serif font-normal text-[#C8232A]">Your Preferences</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1 font-normal tracking-wide">Choose the jewellery categories and styles you love most.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-800 uppercase tracking-[0.2em] font-mono block mb-2">Preferred Metals</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {["22KT Gold", "925 Sterling Silver", "Diamond Solitaires", "24KT Pure Gold"].map((metal) => {
                      const isSelected = metals.includes(metal);
                      return (
                        <button
                          key={metal}
                          type="button"
                          onClick={() => toggleMetal(metal)}
                          className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "bg-red-50 text-[#C8232A] border-[#C8232A] shadow-xs font-bold"
                              : "bg-[#FAF8F5] text-gray-700 border-[#E8E3DA] hover:border-gray-400"
                          }`}
                        >
                          <span>{metal}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#C8232A]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-800 uppercase tracking-[0.2em] font-mono block mb-2">Collection Style</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {["Bridal Heavy", "Everyday Minimalist", "Traditional Bengali", "Royal Heritage"].map((style) => {
                      const isSelected = styles.includes(style);
                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() => toggleStyle(style)}
                          className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "bg-red-50 text-[#C8232A] border-[#C8232A] shadow-xs font-bold"
                              : "bg-[#FAF8F5] text-gray-700 border-[#E8E3DA] hover:border-gray-400"
                          }`}
                        >
                          <span>{style}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#C8232A]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Complete Location Details & Auto GPS Fetcher */}
          {step === 3 && (
            <div className="space-y-4 my-auto">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A1A1A] tracking-wide">
                    Delivery <span className="italic font-serif font-normal text-[#C8232A]">Address</span>
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5 font-normal tracking-wide">
                    Detect automatically via GPS or enter your shipping details.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDetectGPS}
                  disabled={detectingLocation}
                  className="py-2.5 px-3.5 bg-gradient-to-r from-red-50 to-amber-50 border border-red-200 hover:border-[#C8232A] rounded-xl flex items-center gap-2 text-xs font-bold text-[#C8232A] transition-all cursor-pointer shadow-xs shrink-0"
                >
                  {detectingLocation ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C8232A]" />
                      <span>Detecting...</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="w-3.5 h-3.5 text-[#C8232A]" />
                      <span>Auto-Detect GPS</span>
                    </>
                  )}
                </button>
              </div>

              {/* Form Grid with All Location Fields */}
              <div className="space-y-3 pt-1">
                
                {/* Pincode & Town/City Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-800 uppercase tracking-[0.15em] font-mono block">Pincode</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="6 digits PIN code"
                      className="w-full px-3 py-2 border border-[#E8E3DA] rounded-xl text-xs font-semibold text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none shadow-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-800 uppercase tracking-[0.15em] font-mono block">Town/City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City/Town"
                      className="w-full px-3 py-2 border border-[#E8E3DA] rounded-xl text-xs font-semibold text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none shadow-xs"
                    />
                  </div>
                </div>

                {/* Flat, House No, Building */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-800 uppercase tracking-[0.15em] font-mono block">Flat, House no., Building, Apartment</label>
                  <input
                    type="text"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    placeholder="e.g. Flat 4B, Emerald Residency"
                    className="w-full px-3 py-2 border border-[#E8E3DA] rounded-xl text-xs font-semibold text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none shadow-xs"
                  />
                </div>

                {/* Area, Street, Sector */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-800 uppercase tracking-[0.15em] font-mono block">Area, Street, Sector, Locality</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Street Address, Locality, Area"
                    className="w-full px-3 py-2 border border-[#E8E3DA] rounded-xl text-xs font-semibold text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none shadow-xs"
                  />
                </div>

                {/* Landmark & State Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-800 uppercase tracking-[0.15em] font-mono block">Landmark</label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near Apollo Hospital"
                      className="w-full px-3 py-2 border border-[#E8E3DA] rounded-xl text-xs font-semibold text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none shadow-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-800 uppercase tracking-[0.15em] font-mono block">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. West Bengal"
                      className="w-full px-3 py-2 border border-[#E8E3DA] rounded-xl text-xs font-semibold text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none shadow-xs"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Bottom Action Footer Buttons */}
          <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between mt-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="px-5 py-2.5 border border-[#E8E3DA] text-gray-700 text-xs font-bold tracking-wider rounded-xl hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer transition-all uppercase"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="px-7 py-3 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-bold tracking-[0.15em] rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all uppercase ml-auto"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-7 py-3 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-bold tracking-[0.15em] rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all uppercase ml-auto"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Setup</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
