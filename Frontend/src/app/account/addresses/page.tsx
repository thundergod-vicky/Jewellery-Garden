"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import MainHeader from "@/components/header/MainHeader";
import TopBar from "@/components/header/TopBar";
import MainFooter from "@/components/footer/MainFooter";
import {
  Loader2,
  ArrowLeft,
  Plus,
  Trash2,
  Home,
  MapPin,
  Edit,
  ChevronDown,
  ChevronUp,
  Compass,
} from "lucide-react";
import toast from "react-hot-toast";

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Singapore",
  "United Arab Emirates",
];

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const initialFormState = {
  country: "India",
  fullName: "",
  mobile: "",
  pincode: "",
  flat: "",
  area: "",
  landmark: "",
  city: "",
  state: "",
  isDefault: false,
  addressType: "House",
  saturdays: "Yes",
  sundays: "Yes",
  openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  deliveryInstructions: "",
  additionalInstructions: "",
};

export default function AddressesSettings() {
  const router = useRouter();
  const { user, profile, loading, updateUserProfile } = useAuth();

  const [addresses, setAddresses] = useState<string[]>([]);
  const [adding, setAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const [showInstructions, setShowInstructions] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (profile) {
      setAddresses(profile.addresses || []);

      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (params.get("add") === "true") {
          setAdding(true);
        }
      }
    }
  }, [user, profile, loading, router]);

  const parseAddress = (addrString: string) => {
    try {
      const parsed = JSON.parse(addrString);
      if (parsed && typeof parsed === "object" && (parsed.fullName || parsed.flat)) {
        return parsed;
      }
    } catch (e) {}

    return {
      country: "India",
      fullName: profile?.username || "Saved Customer",
      mobile: profile?.phone || "",
      pincode: "",
      flat: addrString,
      area: "",
      landmark: "",
      city: "",
      state: "",
      isDefault: false,
      addressType: "House",
      saturdays: "Yes",
      sundays: "Yes",
      openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      deliveryInstructions: "",
      isLegacy: true,
    };
  };

  const handleAutofill = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    const toastId = toast.loading("Detecting your location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                "Accept-Language": "en",
              },
            }
          );
          if (!res.ok) throw new Error("Reverse geocoding request failed");

          const json = await res.json();
          const addr = json.address || {};
          const displayParts = (json.display_name || "")
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean);

          const detectedCity =
            addr.city || addr.town || addr.municipality || addr.district || addr.state_district || displayParts[1] || "Durgapur";
          const detectedPostcode =
            addr.postcode || (json.display_name?.match(/\b\d{6}\b/) || [])[0] || "713200";
          const detectedState = addr.state || "West Bengal";

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

          const detectedBuilding =
            addr.building ||
            (addr.house_number ? `Flat/House ${addr.house_number}` : "") ||
            (addr.residential ? `${addr.residential} Block` : "") ||
            `${detectedCity} Main Sector`;

          const detectedLandmark =
            addr.amenity ||
            addr.landmark ||
            addr.commercial ||
            (addr.suburb ? `Near ${addr.suburb}` : `Near ${detectedCity} Center`);

          setFormData((prev) => ({
            ...prev,
            pincode: detectedPostcode,
            city: detectedCity,
            state: detectedState,
            country: addr.country || "India",
            flat: detectedBuilding,
            area: detectedRoad,
            landmark: detectedLandmark,
          }));

          toast.success("All 6 address fields autofilled!", { id: toastId });
        } catch (err) {
          console.error("Failed to reverse geocode coordinates:", err);
          toast.error("Failed to resolve address details. Please enter manually.", { id: toastId });
        }
      },
      (error) => {
        console.error("User denied location access.", error);
        toast.error("Location access denied. Please enter manually.", { id: toastId });
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.flat.trim() || !formData.city.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSaving(true);

    let lat = null;
    let lon = null;
    try {
      const query = `${formData.city || ""}, ${formData.pincode || ""}, ${formData.state || ""}, ${formData.country || "India"}`;
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          lat = parseFloat(data[0].lat);
          lon = parseFloat(data[0].lon);
        }
      }
    } catch (err) {
      console.warn("Geocoding failed during save:", err);
    }

    const addressObj = {
      ...formData,
      lat,
      lon,
      isDefault: addresses.length === 0 ? true : formData.isDefault,
    };

    let updatedList = [...addresses];
    const addressStr = JSON.stringify(addressObj);

    if (editingIndex !== null) {
      updatedList[editingIndex] = addressStr;
    } else {
      updatedList.push(addressStr);
    }

    if (addressObj.isDefault) {
      updatedList = updatedList.map((addr, idx) => {
        if (editingIndex !== null && idx === editingIndex) return addr;
        if (editingIndex === null && idx === updatedList.length - 1) return addr;

        try {
          const parsed = JSON.parse(addr);
          parsed.isDefault = false;
          return JSON.stringify(parsed);
        } catch (e) {
          return addr;
        }
      });

      const targetIdx = editingIndex !== null ? editingIndex : updatedList.length - 1;
      const [defaultAddr] = updatedList.splice(targetIdx, 1);
      updatedList.unshift(defaultAddr);
    }

    try {
      await updateUserProfile({ addresses: updatedList });
      toast.success(editingIndex !== null ? "Address updated!" : "Address added successfully!");
      setAdding(false);
      setEditingIndex(null);
      setFormData(initialFormState);
      setShowInstructions(false);
      setShowAdditional(false);
    } catch (err) {
      toast.error("Failed to update profile addresses.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditAddress = (idx: number) => {
    const parsed = parseAddress(addresses[idx]);
    setFormData({
      country: parsed.country || "India",
      fullName: parsed.fullName || "",
      mobile: parsed.mobile || "",
      pincode: parsed.pincode || "",
      flat: parsed.flat || "",
      area: parsed.area || "",
      landmark: parsed.landmark || "",
      city: parsed.city || "",
      state: parsed.state || "",
      isDefault: parsed.isDefault || false,
      addressType: parsed.addressType || "House",
      saturdays: parsed.saturdays || "Yes",
      sundays: parsed.sundays || "Yes",
      openDays: parsed.openDays || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      deliveryInstructions: parsed.deliveryInstructions || "",
      additionalInstructions: parsed.additionalInstructions || "",
    });
    setEditingIndex(idx);
    setAdding(true);

    if (parsed.deliveryInstructions || parsed.addressType !== "House" || parsed.saturdays !== "Yes" || parsed.sundays !== "Yes") {
      setShowInstructions(true);
    }
    if (parsed.additionalInstructions) {
      setShowAdditional(true);
    }
  };

  const handleDeleteAddress = async (indexToDelete: number) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    setSaving(true);

    let updated = addresses.filter((_, idx) => idx !== indexToDelete);

    if (updated.length > 0) {
      try {
        const parsed = JSON.parse(updated[0]);
        parsed.isDefault = true;
        updated[0] = JSON.stringify(parsed);
      } catch (e) {}
    }

    try {
      await updateUserProfile({ addresses: updated });
      toast.success("Address deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete address.");
    } finally {
      setSaving(false);
    }
  };

  const toggleDay = (day: string) => {
    setFormData((prev) => {
      const currentDays = [...prev.openDays];
      if (currentDays.includes(day)) {
        return { ...prev, openDays: currentDays.filter((d) => d !== day) };
      } else {
        return { ...prev, openDays: [...currentDays, day] };
      }
    });
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col font-sans">
      <TopBar />
      <MainHeader />

      <section className="py-10 px-4 flex-1">
        <div className="max-w-[680px] mx-auto">
          <div className="mb-6">
            <Link
              href="/account"
              className="text-xs font-semibold text-[#C8232A] hover:underline inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO ACCOUNT
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif text-2xl font-medium tracking-widest text-[#1A1A1A] mb-1">
                YOUR ADDRESSES
              </h1>
              <p className="text-xs text-gray-500">
                Add or manage delivery addresses for your Jewellery Garden orders.
              </p>
            </div>
            {!adding && (
              <button
                onClick={() => {
                  setFormData(initialFormState);
                  setEditingIndex(null);
                  setAdding(true);
                }}
                className="px-4 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold tracking-wider rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                ADD NEW ADDRESS
              </button>
            )}
          </div>

          {/* Form Card (Adding/Editing) */}
          {adding && (
            <div className="bg-white border border-[#E8E3DA] rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
              <h2 className="text-base font-semibold tracking-wider text-[#1A1A1A] uppercase mb-4 pb-3 border-b border-[#E8E3DA]">
                {editingIndex !== null ? "EDIT ADDRESS" : "ADD A NEW ADDRESS"}
              </h2>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 mb-6 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-800">
                  <Compass className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Save time. Autofill your current location.</span>
                </div>
                <button
                  type="button"
                  onClick={handleAutofill}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition-all shadow-xs"
                >
                  Autofill
                </button>
              </div>

              <form onSubmit={handleSaveAddress} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[11px] font-semibold text-gray-700">Country/Region</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-[#E8E3DA] rounded-lg bg-white text-sm text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none"
                  >
                    {COUNTRIES.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[11px] font-semibold text-gray-700">Full name (First and Last name)</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 border border-[#E8E3DA] rounded-lg bg-white text-sm text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[11px] font-semibold text-gray-700">Mobile number</label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 border border-[#E8E3DA] rounded-lg bg-white text-sm text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none"
                    required
                  />
                  <span className="text-[10px] text-gray-400">May be used to assist delivery</span>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[11px] font-semibold text-gray-700">Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="6 digits PIN code"
                    maxLength={6}
                    className="w-full px-3.5 py-2.5 border border-[#E8E3DA] rounded-lg bg-white text-sm text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[11px] font-semibold text-gray-700">
                    Flat, House no., Building, Apartment
                  </label>
                  <input
                    type="text"
                    value={formData.flat}
                    onChange={(e) => setFormData({ ...formData, flat: e.target.value })}
                    placeholder="Flat/House No, Floor, Building Name"
                    className="w-full px-3.5 py-2.5 border border-[#E8E3DA] rounded-lg bg-white text-sm text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[11px] font-semibold text-gray-700">Area, Street, Sector</label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="Street Address, Locality, Area"
                    className="w-full px-3.5 py-2.5 border border-[#E8E3DA] rounded-lg bg-white text-sm text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[11px] font-semibold text-gray-700">Landmark</label>
                  <input
                    type="text"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    placeholder="E.g. near apollo hospital"
                    className="w-full px-3.5 py-2.5 border border-[#E8E3DA] rounded-lg bg-white text-sm text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[11px] font-semibold text-gray-700">Town/City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City/Town"
                      className="w-full px-3.5 py-2.5 border border-[#E8E3DA] rounded-lg bg-white text-sm text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[11px] font-semibold text-gray-700">State</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-[#E8E3DA] rounded-lg bg-white text-sm text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none"
                      required
                    >
                      <option value="">Choose a state</option>
                      {INDIAN_STATES.map((s, i) => (
                        <option key={i} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 my-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    className="w-4 h-4 text-[#C8232A] rounded border-gray-300 focus:ring-[#C8232A]"
                  />
                  <label htmlFor="isDefault" className="text-xs text-gray-700 font-medium">
                    Make this my default address
                  </label>
                </div>

                {/* Delivery Instructions Accordion */}
                <div
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="cursor-pointer border-t border-[#E8E3DA] pt-4 mt-2 flex items-center justify-between text-left"
                >
                  <div>
                    <span className="text-xs font-semibold text-blue-600 block">
                      Delivery instructions (optional)
                    </span>
                    <span className="text-[11px] text-gray-500">
                      {showInstructions
                        ? "Hide preferences, notes, access codes"
                        : "Add preferences, notes, access codes and more"}
                    </span>
                  </div>
                  {showInstructions ? (
                    <ChevronUp className="w-4 h-4 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-blue-600" />
                  )}
                </div>

                {showInstructions && (
                  <div className="bg-[#FAF8F5] border border-[#E8E3DA] rounded-xl p-4 flex flex-col gap-4 mt-2">
                    <div className="flex flex-col gap-2 text-left">
                      <span className="text-xs font-semibold text-gray-800">Address Type</span>
                      <div className="flex flex-wrap gap-2">
                        {["House", "Apartment", "Business", "Other"].map((type, idx) => {
                          const isActive = formData.addressType === type;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setFormData({ ...formData, addressType: type })}
                              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                                isActive
                                  ? "bg-[#C8232A] text-white border-[#C8232A]"
                                  : "bg-white text-gray-700 border-[#E8E3DA] hover:border-gray-400"
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {(formData.addressType === "House" || formData.addressType === "Apartment") && (
                      <div className="bg-white border border-[#E8E3DA] rounded-lg p-3 text-left">
                        <span className="text-xs font-semibold text-gray-800 block mb-2">
                          Can you receive deliveries at this address on weekends?
                        </span>
                        <div className="flex flex-wrap gap-4 text-xs">
                          <div className="flex items-center gap-2">
                            <span>Saturdays:</span>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, saturdays: "Yes" })}
                              className={`px-2.5 py-1 rounded text-xs ${
                                formData.saturdays === "Yes" ? "bg-[#C8232A] text-white" : "bg-gray-100"
                              }`}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, saturdays: "No" })}
                              className={`px-2.5 py-1 rounded text-xs ${
                                formData.saturdays === "No" ? "bg-[#C8232A] text-white" : "bg-gray-100"
                              }`}
                            >
                              No
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>Sundays:</span>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, sundays: "Yes" })}
                              className={`px-2.5 py-1 rounded text-xs ${
                                formData.sundays === "Yes" ? "bg-[#C8232A] text-white" : "bg-gray-100"
                              }`}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, sundays: "No" })}
                              className={`px-2.5 py-1 rounded text-xs ${
                                formData.sundays === "No" ? "bg-[#C8232A] text-white" : "bg-gray-100"
                              }`}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {(formData.addressType === "Business" || formData.addressType === "Other") && (
                      <div className="bg-white border border-[#E8E3DA] rounded-lg p-3 text-left">
                        <span className="text-xs font-semibold text-gray-800 block mb-2">
                          When is this address open for deliveries?
                        </span>
                        <div className="flex flex-wrap gap-3">
                          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                            (day, i) => {
                              const isChecked = formData.openDays.includes(day);
                              return (
                                <label key={i} className="flex items-center gap-1.5 text-xs text-gray-700">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleDay(day)}
                                    className="w-3.5 h-3.5 text-[#C8232A] rounded border-gray-300"
                                  />
                                  <span>{day}</span>
                                </label>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}

                    <div className="text-left">
                      <label className="text-xs font-semibold text-gray-800 block mb-1">
                        Special Delivery Instructions
                      </label>
                      <textarea
                        value={formData.deliveryInstructions}
                        onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                        placeholder="Security gate details, landmark directions, drop-off spot..."
                        rows={2}
                        className="w-full px-3 py-2 border border-[#E8E3DA] rounded-lg bg-white text-xs text-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-[#E8E3DA]">
                  <button
                    type="button"
                    onClick={() => {
                      setAdding(false);
                      setEditingIndex(null);
                    }}
                    className="px-5 py-2.5 border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-all"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold tracking-wider rounded-lg transition-all flex items-center justify-center min-w-[120px]"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingIndex !== null ? "SAVE CHANGES" : "ADD ADDRESS"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List of Saved Addresses */}
          <div className="flex flex-col gap-4">
            {addresses.map((addr, idx) => {
              const parsed = parseAddress(addr);
              return (
                <div key={idx} className="bg-white border border-[#E8E3DA] rounded-xl p-5 shadow-sm text-left">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 text-[#C8232A] flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-[#1A1A1A]">{parsed.fullName}</span>
                          {parsed.isDefault && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                              DEFAULT
                            </span>
                          )}
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 uppercase">
                            {parsed.addressType}
                          </span>
                        </div>
                        {parsed.mobile && <span className="text-xs text-gray-500">Phone: {parsed.mobile}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditAddress(idx)}
                        disabled={saving}
                        className="p-2 text-gray-500 hover:text-[#C8232A] hover:bg-red-50 rounded-lg transition-all"
                        title="Edit Address"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(idx)}
                        disabled={saving}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 leading-relaxed pl-11">
                    {parsed.isLegacy ? (
                      <p>{parsed.flat}</p>
                    ) : (
                      <>
                        <p>
                          {parsed.flat}, {parsed.area}
                        </p>
                        {parsed.landmark && <p className="text-gray-400">Landmark: {parsed.landmark}</p>}
                        <p>
                          {parsed.city}, {parsed.state} - {parsed.pincode}
                        </p>
                        <p>{parsed.country}</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}

            {addresses.length === 0 && !adding && (
              <div className="py-14 px-8 bg-white border border-[#E8E3DA] rounded-2xl flex flex-col items-center justify-center text-center">
                <Home className="w-10 h-10 text-gray-300 mb-3" />
                <h4 className="text-base font-medium text-[#1A1A1A] mb-1.5">No Saved Addresses</h4>
                <p className="text-xs text-gray-500 mb-5">
                  You haven&apos;t added any shipping addresses yet.
                </p>
                <button
                  onClick={() => setAdding(true)}
                  className="px-6 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold tracking-widest rounded-lg transition-all"
                >
                  ADD YOUR FIRST ADDRESS
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
}
