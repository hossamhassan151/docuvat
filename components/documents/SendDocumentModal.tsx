"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

import AppModal from "@/components/system/AppModal";
import AppInput from "@/components/system/AppInput";
import PrimaryButton from "@/components/system/PrimaryButton";

interface SendDocumentModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  defaultEmail?: string;
  shareUrl?: string;
}

export default function SendDocumentModal({
  open,
  onClose,
  title,
  defaultEmail = "",
  shareUrl = "",
}: SendDocumentModalProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [message, setMessage] = useState(
    "Please review the shared document."
  );
  const [sending, setSending] = useState(false);

  async function handleSend() {
    try {
      setSending(true);

      const res = await fetch("/api/send-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          title,
          message,
          shareUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      alert("Email sent successfully.");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to send email.");
    } finally {
      setSending(false);
    }
  }

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title="Send document"
      description="Send this document to your client by email."
      icon={<Mail className="h-5 w-5 text-white" />}
    >
      <div className="space-y-5">
        <AppInput
          label="Client Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="client@email.com"
        />

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Message
          </label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <PrimaryButton
          type="button"
          onClick={handleSend}
          disabled={sending}
          className="w-full"
        >
          {sending ? "Sending..." : "Send Email"}
        </PrimaryButton>
      </div>
    </AppModal>
  );
}