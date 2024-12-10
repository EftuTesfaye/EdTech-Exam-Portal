import React, { useState } from "react";

interface SelectedCountry {
  name: string;
  flag: string;
}

const DataHubApp = () => {
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry | null>(null);

  const countries: SelectedCountry[] = [
    { name: "Algeria", flag: "https://www.countryflags.io/dz/flat/64.png" },
    { name: "Angola", flag: "https://www.countryflags.io/ao/flat/64.png" },
    { name: "Benin", flag: "https://www.countryflags.io/bj/flat/64.png" },
    { name: "Botswana", flag: "https://www.countryflags.io/bw/flat/64.png" },
    {
      name: "Burkina Faso",
      flag: "https://www.countryflags.io/bf/flat/64.png",
    },
    { name: "Burundi", flag: "https://www.countryflags.io/bi/flat/64.png" },
    { name: "Cameroon", flag: "https://www.countryflags.io/cm/flat/64.png" },
    { name: "Cape Verde", flag: "https://www.countryflags.io/cv/flat/64.png" },
    {
      name: "Central African Republic",
      flag: "https://www.countryflags.io/cf/flat/64.png",
    },
    { name: "Chad", flag: "https://www.countryflags.io/td/flat/64.png" },
    { name: "Comoros", flag: "https://www.countryflags.io/km/flat/64.png" },
    { name: "Congo", flag: "https://www.countryflags.io/cg/flat/64.png" },
    {
      name: "Democratic Republic of the Congo",
      flag: "https://www.countryflags.io/cd/flat/64.png",
    },
    { name: "Djibouti", flag: "https://www.countryflags.io/dj/flat/64.png" },
    { name: "Egypt", flag: "https://www.countryflags.io/eg/flat/64.png" },
    {
      name: "Equatorial Guinea",
      flag: "https://www.countryflags.io/gq/flat/64.png",
    },
    { name: "Eritrea", flag: "https://www.countryflags.io/er/flat/64.png" },
    { name: "Eswatini", flag: "https://www.countryflags.io/sz/flat/64.png" },
    { name: "Ethiopia", flag: "https://www.countryflags.io/et/flat/64.png" },
    { name: "Gabon", flag: "https://www.countryflags.io/ga/flat/64.png" },
    { name: "Gambia", flag: "https://www.countryflags.io/gm/flat/64.png" },
    { name: "Ghana", flag: "https://www.countryflags.io/gh/flat/64.png" },
    { name: "Guinea", flag: "https://www.countryflags.io/gn/flat/64.png" },
    {
      name: "Guinea-Bissau",
      flag: "https://www.countryflags.io/gw/flat/64.png",
    },
    { name: "Ivory Coast", flag: "https://www.countryflags.io/ci/flat/64.png" },
    { name: "Kenya", flag: "https://www.countryflags.io/ke/flat/64.png" },
    { name: "Lesotho", flag: "https://www.countryflags.io/ls/flat/64.png" },
    { name: "Liberia", flag: "https://www.countryflags.io/lr/flat/64.png" },
    { name: "Libya", flag: "https://www.countryflags.io/ly/flat/64.png" },
    { name: "Madagascar", flag: "https://www.countryflags.io/mg/flat/64.png" },
    { name: "Malawi", flag: "https://www.countryflags.io/mw/flat/64.png" },
    { name: "Mali", flag: "https://www.countryflags.io/ml/flat/64.png" },
    { name: "Mauritania", flag: "https://www.countryflags.io/mr/flat/64.png" },
    { name: "Mauritius", flag: "https://www.countryflags.io/mu/flat/64.png" },
    { name: "Morocco", flag: "https://www.countryflags.io/ma/flat/64.png" },
    { name: "Mozambique", flag: "https://www.countryflags.io/mz/flat/64.png" },
    { name: "Namibia", flag: "https://www.countryflags.io/na/flat/64.png" },
    { name: "Niger", flag: "https://www.countryflags.io/ne/flat/64.png" },
    { name: "Nigeria", flag: "https://www.countryflags.io/ng/flat/64.png" },
    { name: "Rwanda", flag: "https://www.countryflags.io/rw/flat/64.png" },
    {
      name: "Sao Tome and Principe",
      flag: "https://www.countryflags.io/st/flat/64.png",
    },
    { name: "Senegal", flag: "https://www.countryflags.io/sn/flat/64.png" },
    { name: "Seychelles", flag: "https://www.countryflags.io/sc/flat/64.png" },
    {
      name: "Sierra Leone",
      flag: "https://www.countryflags.io/sl/flat/64.png",
    },
    { name: "Somalia", flag: "https://www.countryflags.io/so/flat/64.png" },
    {
      name: "South Africa",
      flag: "https://www.countryflags.io/za/flat/64.png",
    },
    { name: "South Sudan", flag: "https://www.countryflags.io/ss/flat/64.png" },
    { name: "Sudan", flag: "https://www.countryflags.io/sd/flat/64.png" },
    { name: "Tanzania", flag: "https://www.countryflags.io/tz/flat/64.png" },
    { name: "Togo", flag: "https://www.countryflags.io/tg/flat/64.png" },
    { name: "Tunisia", flag: "https://www.countryflags.io/tn/flat/64.png" },
    { name: "Uganda", flag: "https://www.countryflags.io/ug/flat/64.png" },
    { name: "Zambia", flag: "https://www.countryflags.io/zm/flat/64.png" },
    { name: "Zimbabwe", flag: "https://www.countryflags.io/zw/flat/64.png" },
  ];

  const handleChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = countries.find((c) => c.flag === e.target.value);
    setSelectedCountry(selected || null);
  };

  const handleGoClick = () => {
    if (selectedCountry?.name === "Ethiopia") {
      window.location.href = "/admin-dashboard";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-teal-700 mb-4">
          Welcome to Data Hub Africa
        </h1>
        <p className="text-gray-700">
          Explore our data resources to gain insights and drive innovation in
          the Data Revolution.
        </p>
      </header>

      <div className="mt-10">
        <label htmlFor="country" className="block text-lg font-semibold text-gray-800 mb-2">
          Select a Data Country
        </label>
        <select
          id="country"
          value={selectedCountry?.flag || ""}
          onChange={handleChangeCountry}
          className="block w-64 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">Select a Data Country</option>
          {countries.map((country) => (
            <option key={country.flag} value={country.flag}>
              {country.name}
            </option>
          ))}
        </select>

        {selectedCountry && (
          <div className="mt-4">
            <button
              id="go-btn"
              onClick={handleGoClick}
              className="px-6 py-2 bg-teal-600 text-white rounded shadow hover:bg-teal-700"
            >
              Go
            </button>
          </div>
        )}
      </div>

      {selectedCountry && selectedCountry.name !== "Ethiopia" && (
        <div className="mt-6 text-gray-600">
          <p>
            We are currently working on adding data for{" "}
            <span className="font-semibold">{selectedCountry.name}</span>.
            Please check back later!
          </p>
        </div>
      )}

      <footer className="mt-auto w-full bg-teal-700 text-white text-center py-6">
        <p className="text-sm mt-2">
          Explore our data resources to gain insights and drive innovation in
          the Data Revolution.
        </p>
      </footer>
    </div>
  );
};

export default DataHubApp;
