import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Render() {
  const [developers, setDevelopers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filterSelect, setFilterSelect] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json');
        console.log(response.data);
      setDevelopers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterDevelopers = (searchInput, filterSelect, developers) => {
  const searchInputLowerCase = searchInput.toLowerCase();
  const filterSelectLowerCase = filterSelect.toLowerCase();

  const filteredDevelopers = developers.filter(developer => {
    const nameLowerCase = developer.name.toLowerCase();
    const designationLowerCase = developer.designation.toLowerCase();

    const nameMatch = nameLowerCase.includes(searchInputLowerCase);
    const designationMatch = filterSelectLowerCase === '' || designationLowerCase === filterSelectLowerCase;

    return nameMatch && designationMatch;
  });

  return filteredDevelopers;
};


  const renderedDevelopers = filterDevelopers().map(developer => (
    <div key={developer.id} className="developer">
      <h2>{developer.name}</h2>
      <p>Designation: {developer.designation}</p>
      <p>Skills: {developer.skills.join(', ')}</p>
    </div>
  ));

  return (
    <div>
      <h1>Developers Information</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
      />
      <select
        value={filterSelect}
        onChange={e => setFilterSelect(e.target.value)}
      >
        <option value="">All Designations/Skills</option>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="manager">Manager</option>
      </select>
      <div id="developersContainer">{renderedDevelopers}</div>
    </div>
  );
}

export default Render;
