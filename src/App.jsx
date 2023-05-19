import React, { useState, useEffect } from 'react';
import axios from 'axios';
import data from './data.json';
import './App.css';

const App = () => {
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filterSelect, setFilterSelect] = useState('');

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json')
      .then(response => {
        const { data } = response;
        setDevelopers(data); // Update this line
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  const handleSearch = e => {
    const searchValue = e.target.value.toLowerCase();
    setSearchInput(searchValue);
    filterDevelopers(searchValue, filterSelect);
  };

  const handleFilter = e => {
    const filterValue = e.target.value.toLowerCase();
    setFilterSelect(filterValue);
    filterDevelopers(searchInput, filterValue);
  };

  const filterDevelopers = (searchValue, filterValue) => {
    const filteredDevelopers = developers.filter(developer => {
      const nameMatch = developer.name.toLowerCase().includes(searchValue);
      const designationMatch = filterValue === '' || developer.designation.toLowerCase() === filterValue;
      return nameMatch && designationMatch;
    });
    setFilteredDevelopers(filteredDevelopers);
  };

  return (
    <div className="app">
      <h1>Developer Directory</h1>

      <div className="search">
        <input type="text" value={searchInput} onChange={handleSearch} placeholder="Search by name" />
        <select value={filterSelect} onChange={handleFilter}>
          <option value="">All Designations</option>
          <option value="Frontend Developer">Frontend Developer</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevelopers && filteredDevelopers.map(developer => (
            <tr key={developer.id}>
              <td>{developer.name}</td>
              <td>{developer.designation}</td>
              <td>{developer.skills.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Projects</h2>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Team Size</th>
            <th>Completed Tasks</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevelopers.reduce((projects, developer) => {
            const developerProjects = developer.projects.map(project => ({
              id: project.id,
              name: project.name,
              teamSize: project.teamSize,
              completedTasks: project.completedTasks,
            }));
            return projects.concat(developerProjects);
          }, []).map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.teamSize}</td>
              <td>{project.completedTasks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
