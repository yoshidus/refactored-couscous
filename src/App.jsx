import './App.css';
import { useState } from 'react';
import Papa from 'papaparse';

function App() {
  const [question_1_response, setQuestion1Response] = useState('');
  const [question_2_response, setQuestion2Response] = useState([]);
  const [results, setResults] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setQuestion2Response((prev) =>
      checked ? [...prev, value] : prev.filter((answer) => answer !== value)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Load and parse the CSV file
    const response = await fetch('/resource_list.csv');
    const csvText = await response.text();

    Papa.parse(csvText, {
      header: true,
      complete: (result) => {
        const filteredResults = result.data.filter((record) => {
          return (
            record['Support Region']?.includes(question_1_response) &&
            question_2_response.some((aidType) => record['Aid Type']?.includes(aidType))
          );
        });

        setResults(filteredResults.map((record) => record['For the Tenant']));
      },
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Webform</h1>
        <form onSubmit={handleSubmit}>
          {/* Question 1 */}
          <div style={{ color:'black', backgroundColor:'#f0fffe', padding: '10px', marginBottom: '10px' }}>
            <p>Where do you live?</p>
            <div>
              <label>
                <input
                  type="radio"
                  name="question_1"
                  value="KCMO"
                  checked={question_1_response === 'KCMO'}
                  onChange={(e) => setQuestion1Response(e.target.value)}
                />
                Missouri
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="question_1"
                  value="Kansas"
                  checked={question_1_response === 'Kansas'}
                  onChange={(e) => setQuestion1Response(e.target.value)}
                />
                Kansas
              </label>
            </div>
          </div>

          {/* Question 2 */}
          <div style={{ color:'black', backgroundColor: '#f0fffe', padding: '10px', marginBottom: '10px' }}>
            <p>What do you need?</p>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="question_2"
                  value="Seeking Housing"
                  checked={question_2_response.includes('Seeking Housing')}
                  onChange={handleCheckboxChange}
                />
                Seeking Housing
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="question_2"
                  value="Eviction"
                  checked={question_2_response.includes('Eviction')}
                  onChange={handleCheckboxChange}
                />
                Eviction Defense
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="question_2"
                  value="Rent"
                  checked={question_2_response.includes('Rent')}
                  onChange={handleCheckboxChange}
                />
                Rental Assistance
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="question_2"
                  value="Food"
                  checked={question_2_response.includes('Food')}
                  onChange={handleCheckboxChange}
                />
                Food and Clothing
              </label>
            </div>
          </div>

          <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
        </form>

        {/* Results Section */}
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <h2>Results:</h2>
          {results.map((result, index) => (
            <div key={index} style={{ marginBottom: '20px', whiteSpace: 'pre-wrap' }}>
              {result}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;