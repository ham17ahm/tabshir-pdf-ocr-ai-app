import Link from "next/link";
import { departments } from "@/app/config/departments";

export default function LandingPage() {
  const getColorClasses = (color) => {
    const colors = {
      blue: "border-blue-500 group-hover:text-blue-600",
      emerald: "border-emerald-500 group-hover:text-emerald-600",
      purple: "border-purple-500 group-hover:text-purple-600",
      orange: "border-orange-500 group-hover:text-orange-600",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Correspondence Assistance System
          </h1>
          <p className="text-xl text-gray-600">
            Select your department to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {departments.map((dept) => (
            <Link
              key={dept.href}
              href={dept.href}
              className={`block p-8 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative group border-t-4 ${getColorClasses(
                dept.color
              )}`}
            >
              <div className="text-5xl mb-4">{dept.icon}</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {dept.name}
              </h2>
              <p className="text-gray-600">{dept.description}</p>
              <div
                className={`absolute bottom-6 right-6 text-2xl text-gray-400 group-hover:translate-x-1 transition-all ${
                  getColorClasses(dept.color).split(" ")[1]
                }`}
              >
                →
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="py-6 text-center text-gray-600">
        <p>© 2025 Correspondence Assistance System. All rights reserved.</p>
      </footer>
    </div>
  );
}
