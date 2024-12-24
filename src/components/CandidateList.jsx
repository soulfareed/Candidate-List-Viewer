import React, { useEffect, useState } from "react";
import axios from "axios";

const Candidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  //Api is taking from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/candidates").then((response) => {
      setCandidates(response.data);
    });
  }, []);

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(search.toLowerCase()) ||
      candidate.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      )
  );

  const sortedCandidates = filteredCandidates.sort((a, b) =>
    sortAsc
      ? a.yearsOfExperience - b.yearsOfExperience
      : b.yearsOfExperience - a.yearsOfExperience
  );

  return (
    <div>
      <h1>Candidate List Viewer</h1>
      <input
        style={{ margin: 10 }}
        type="text"
        placeholder="Search by name or skills"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setSortAsc(!sortAsc)}>
        Sort by Experience ({sortAsc ? "Asc" : "Desc"})
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
            <th>Years of Experience</th>
          </tr>
        </thead>
        <tbody>
          {sortedCandidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.skills.join(", ")}</td>
              <td>{candidate.yearsOfExperience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Candidate;
