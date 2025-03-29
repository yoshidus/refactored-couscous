import './App.css';
import { useState } from 'react';
import Papa from 'papaparse';

function App() {
  const [question_1_response, setQuestion1Response] = useState('');
  const [question_2_response, setQuestion2Response] = useState([]);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

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
            record['Support Region']?.includes(question_1_response) ||
            record['Support Region']?.includes('No Limit')
          ) && question_2_response.some((aidType) => record['Aid Type']?.includes(aidType));
        });

        setResults(filteredResults);
        setShowResults(true);
      },
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Webform</h1>
        <form onSubmit={handleSubmit}>
          {/* Question 1 */}
          <div style={{
            border: '2px solid cyan',
            borderRadius: '10px',
            backgroundColor: 'white',
            color: 'black',
            padding: '10px',
            marginBottom: '10px'
          }}>
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
          <div style={{
            border: '2px solid cyan',
            borderRadius: '10px',
            backgroundColor: 'white',
            color: 'black',
            padding: '10px',
            marginBottom: '10px'
          }}>
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
        {showResults && (
          <div style={{
            border: '2px solid cyan',
            borderRadius: '10px',
            backgroundColor: 'white',
            color: 'black',
            padding: '10px',
            marginTop: '20px',
            textAlign: 'left'
          }}>
            <h2>Results:</h2>
            {results.map((result, index) => (
              <div key={index} style={{ marginBottom: '20px', whiteSpace: 'pre-wrap' }}>
                <h3>{result['Name']}</h3>
                <h4>{result['For the Tenant']}</h4>
                <button
                  onClick={() => alert(result['Description'])}
                  style={{
                    backgroundColor: 'cyan',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    color: 'black'
                  }}
                >
                  More Info
                </button>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;