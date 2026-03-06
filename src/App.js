import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch all countries on mount
  useEffect(() => {
    fetch("https://location-selector.labs.crio.do/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error fetching countries: ", err));
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (!selectedCountry) return;
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);
    fetch(`https://location-selector.labs.crio.do/country=${selectedCountry}/states`)
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch((err) => console.error("Error fetching states: ", err));
  }, [selectedCountry]);

  // Fetch cities when state changes
  useEffect(() => {
    if (!selectedCountry || !selectedState) return;
    setSelectedCity("");
    setCities([]);
    fetch(`https://location-selector.labs.crio.do/country=${selectedCountry}/state=${selectedState}/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("Error fetching cities: ", err));
  }, [selectedState]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f0f4f8",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', sans-serif",
      padding: "24px",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "40px 48px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        minWidth: "340px",
        width: "100%",
        maxWidth: "480px",
      }}>
        <h2 style={{ marginBottom: "28px", fontWeight: 700, fontSize: "1.4rem", color: "#1a202c", textAlign: "center" }}>
          Location Selector
        </h2>

        {/* Country Dropdown */}
        <div style={{ marginBottom: "18px" }}>
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            style={selectStyle}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* State Dropdown */}
        <div style={{ marginBottom: "18px" }}>
          <select
            value={selectedState}
            onChange={handleStateChange}
            disabled={!selectedCountry}
            style={{ ...selectStyle, opacity: !selectedCountry ? 0.5 : 1, cursor: !selectedCountry ? "not-allowed" : "pointer" }}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* City Dropdown */}
        <div style={{ marginBottom: "24px" }}>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState}
            style={{ ...selectStyle, opacity: !selectedState ? 0.5 : 1, cursor: !selectedState ? "not-allowed" : "pointer" }}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Result */}
        {selectedCity && selectedState && selectedCountry && (
          <div style={{
            marginTop: "8px",
            padding: "16px",
            background: "#ebf8ff",
            borderRadius: "10px",
            textAlign: "center",
            color: "#2b6cb0",
            fontWeight: 600,
            fontSize: "1rem",
          }}>
            You selected {selectedCity}, {selectedState}, {selectedCountry}
          </div>
        )}
      </div>
    </div>
  );
}

const selectStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid #cbd5e0",
  fontSize: "0.95rem",
  background: "#fff",
  color: "#2d3748",
  outline: "none",
  appearance: "auto",
  fontFamily: "inherit",
};

export default App;