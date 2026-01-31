import { useLocation } from "react-router"
import { translations } from "../types/language";

export default function ReadyToMoveOther() {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const lang = params.get("lang") || "en";

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="max-w-3xl mt-30 mx-auto p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">{t.welcome}</h1>
      <p>{t.description}</p>
    </div>
  );
}