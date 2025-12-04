
function SearchBar({ city, onCityChange, onSearch, onUseLocation, disabled,
    suggestions, showSuggestions, onSelectSuggestion }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") onSearch();
    }

    return (
        <div className="search-bar" style={{position: "relative"}}>
            <input
                type = "text"
                placeholder = "Search city..."
                value = {city}
                onChange = {(e) => onCityChange(e.target.value)}
                onKeyDown = {handleKeyDown}
                disabled = {disabled}
                autoComplete="off"
            />
            <button onClick = {onSearch} disabled = {disabled}>Search</button>
            <button
                type = "button"
                onClick = {onUseLocation}
                disabled = {disabled}
                title="Live Location"
                aria-label="Use live location"
            >
                <i className = "fas fa-location-crosshairs"></i>
            </button>
            {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions">
                    {suggestions.map((s, idx) => (
                        <div
                            key={idx}
                            className="suggestion-item"
                            onClick={() => {
                                const locationString = `${s.name}${s.state ? ", " + s.state : ""}, ${s.country}`;
                                onSelectSuggestion(locationString);
                            }}
                        >
                            {s.name}
                            {s.state ? `, ${s.state}` : ""}, {s.country}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default SearchBar