import { useNavigate } from "react-router";
import { languages } from "../types/language";
export default function ItemModal() {
  const navigate = useNavigate();

  const handleClick = (langCode: string) => {
    // Pass language code as query parameter
    navigate(`/others?lang=${langCode}`);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {languages.map(({ code, label }) => (
          <button
            key={code}
            className="
              h-32 rounded-xl shadow-md
              bg-gray-100
              flex items-center justify-center
              text-lg font-medium
              transition-all
              hover:bg-gray-200 hover:shadow-lg hover:-translate-y-1
              active:scale-95
              focus:outline-none focus:ring-2 focus:ring-gray-400
            "
            onClick={() => handleClick(code)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
