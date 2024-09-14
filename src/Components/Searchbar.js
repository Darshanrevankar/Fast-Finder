import React, { useState } from 'react';
import { Countries } from './Countries.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Searchbar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setQuery(value);

        if (value === '') {
            setFilteredCountries([]);
        } else {
            console.log('Search Query:', value);
            const filtered = Countries.filter(countrys => {
                const country = countrys.country ? countrys.country.toLowerCase() : '';
                const capital = countrys.capital ? countrys.capital.toLowerCase() : '';
                return country.includes(value) || capital.includes(value);
            });
            setFilteredCountries(filtered);
        }
    };


    const handleSuggestionClick = (countrys) => {
        setQuery(countrys.country);
        setFilteredCountries([]);
    };

    return (
        <div className="search-container">
            <div className="heading_card">
                <h1>Search the Globe with Ease</h1>

            </div>
            <div className="container-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleSearch}
                    className="search-input"
                />
                <FontAwesomeIcon className='icon-1' icon={faSearch} />
            </div>


            {filteredCountries.length > 0 && (
                <ul className="autocomplete-list">
                    {filteredCountries.map((countrys, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(countrys)}
                            className="autocomplete-item"
                        >
                            <FontAwesomeIcon className='icon' icon={faSearch} />
                            {countrys.country} - {countrys.capital}
                        </li>
                    ))}
                </ul>
            )}

            {query && filteredCountries.length === 0 && (
                <p className="no-results">No results found</p>
            )}
        </div>
    );
};

export default SearchBar;
