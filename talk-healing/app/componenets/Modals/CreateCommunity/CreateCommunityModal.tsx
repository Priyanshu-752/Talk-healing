import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useStores } from "@/models";

export default function CreateCommunityModal({ onClose, opened, onCommunityCreated }) {
  const { communityStore } = useStores();
  const [communityName, setCommunityName] = useState("");
  const [communityType, setCommunityType] = useState("");
  const [communityImg, setCommunityImg] = useState<File | null>(null); // ✅ image state
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState(null);

  const isSubmitDisabled = !communityName.trim() || !communityType || loading;

  // Reset fields
  const resetStatesModal = () => {
    setCommunityType("");
    setCommunityName("");
    setCommunityImg(null);
    setNotif(null);
  };

  const handleCreate = async () => {
    setLoading(true);
    setNotif(null);

    try {
      const formData = new FormData();
      formData.append("community_name", communityName.trim());
      formData.append("commmunity_type", communityType);
      console.log(formData);
      // ✅ Add uploaded image if provided
      if (communityImg) {
        formData.append("community_img", communityImg);
      } else {
        // fallback: default placeholder from public folder
        const responseImg = await fetch("/default-community.png");
        const blob = await responseImg.blob();
        formData.append("community_img", new File([blob], "default.png", { type: blob.type }));
      }

      console.log("Sending FormData:", {
        community_name: communityName.trim(),
        commmunity_type: communityType,
        community_img: communityImg?.name || "default-community.png",
      });

      const result = await communityStore.postCommunity(formData);

      console.log("API Result:", result);

      if (result.ok) {
        setNotif({ type: "success", text: "Community created successfully!" });
        if (onCommunityCreated) onCommunityCreated();
        onClose();
        resetStatesModal();
      } else {
        setNotif({ type: "error", text: "Failed to create community. Please try again." });
      }
    } catch (err) {
      console.error("Full error object:", err);

      let errorMsg = "Failed to create community. Please try again.";

      if (err?.response?.data) {
        if (typeof err.response.data === "object") {
          errorMsg += ` Details: ${JSON.stringify(err.response.data)}`;
        } else {
          errorMsg += ` Details: ${err.response.data}`;
        }
      } else if (err?.message) {
        errorMsg += ` Error: ${err.message}`;
      }

      setNotif({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={opened} onOpenChange={(val) => !val && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Community</DialogTitle>
          <DialogDescription>
            Fill in all fields below to create a new community.
          </DialogDescription>
        </DialogHeader>

        {notif && (
          <div
            className={`mb-2 p-2 rounded text-sm ${
              notif.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {notif.text}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {/* Community Type */}
          <div>
            <div className="mb-1 font-semibold">Community Type</div>
            <div className="flex gap-3">
              {["Public", "Private"].map((type) => (
                <label key={type} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="communityType"
                    value={type}
                    checked={communityType === type}
                    onChange={() => setCommunityType(type)}
                    disabled={loading}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Community Name */}
          <div>
            <label className="block mb-1 font-semibold">Community Name</label>
            <input
              className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Community name..."
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              required
              disabled={loading}
              maxLength={200}
            />
          </div>

          {/* Community Image Upload */}
          <div>
            <label className="block mb-1 font-semibold">Community Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCommunityImg(e.target.files?.[0] || null)}
              disabled={loading}
            />
            {communityImg && (
              <div className="mt-2 text-sm text-gray-600">
                Selected: {communityImg.name}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex justify-end">
          <Button
            className="px-5 py-2 rounded-full font-bold transition-colors duration-200 bg-gradient-to-r from-lime-400 to-teal-500 text-white"
            disabled={isSubmitDisabled}
            onClick={handleCreate}
          >
            {loading ? "Creating..." : "Create community"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
