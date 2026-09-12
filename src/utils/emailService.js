// src/utils/emailService.js

export const sendEmail = async (formData) => {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // Read as text first to safely handle non-JSON responses
    const text = await response.text();

    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      console.error("Non-JSON response from /api/contact:", text);
      return {
        success: false,
        error: "Server error. Please try again later.",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to send message. Please try again.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
};