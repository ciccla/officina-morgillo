"use client";

export default function ManageCookiesButton() {
  const handleClick = () => {
    try {
      if (window.__om_reopenCookieBanner) {
        window.__om_reopenCookieBanner();
        return;
      }
      localStorage.removeItem("om_cookie_consent_v1");
      window.location.reload();
    } catch (e) {
      // fallback brutale
      window.location.href = "/cookie-policy";
    }
  };

  return (
    <button
      type="button"
      className="hover:text-blue-400 transition"
      onClick={handleClick}
    >
      Gestisci cookie
    </button>
  );
}
