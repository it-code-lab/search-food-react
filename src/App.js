import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [criteria, setCriteria] = useState('');
  const [criteriaValue, setCriteriaValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(criteria, criteriaValue);
  };

  return (
    <form onSubmit={handleSearch}>
      <div>
        <label>Search By:</label>
        <select
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
        >
          <option value="">Select Criteria</option>
          <option value="restaurantname">Restaurant</option>
          <option value="menuitem">Menu Item</option>
        </select>
      </div>
      <div>
        <label>Search Value:</label>
        <input
          type="text"
          value={criteriaValue}
          onChange={(e) => setCriteriaValue(e.target.value)}
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

const SearchResult = ({ results }) => {
  //console.log(results);
  
  if (results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div>
      <h2>Search Results:</h2>
      <ul>
        {results.map((result) => (
          <li key={result.restaurantName + result.itemName }>
            <strong>Restaurant:</strong> {result.restaurantName}
            <br />
            <strong>Item Name:</strong> {result.itemName}
            <br />
            <strong>Price:</strong> {result.price}
            <br />
            <strong>Rating:</strong> {result.Ratings}
            <br />
            <strong>Address:</strong> {result.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (criteria, criteriaValue) => {
    if (criteria && criteriaValue) {
      fetch(`http://localhost:9004/food/api/v1/user/${criteria}/${criteriaValue}`)
        .then((response) =>  response.json())
        .then((data) => setSearchResults(data))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <h1>Food Search</h1>
      <SearchForm onSearch={handleSearch} />
      <SearchResult results={searchResults} />
    </div>
  );
};

export default App;
