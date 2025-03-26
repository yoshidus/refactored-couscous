import './App.css';
import { useState } from 'react';

function App() {
  const [question_1_response, setQuestion1Response] = useState('');
  const [question_2_response, setQuestion2Response] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setQuestion2Response((prev) =>
      checked ? [...prev, value] : prev.filter((answer) => answer !== value)
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Webform</h1>
        <form>
          {/* Question 1 */}
          <div>
            <p>Question 1</p>
            <label>
              <input
                type="radio"
                name="question_1"
                value="Answer 1-1"
                checked={question_1_response === 'Answer 1-1'}
                onChange={(e) => setQuestion1Response(e.target.value)}
              />
              Answer 1-1
            </label>
            <label>
              <input
                type="radio"
                name="question_1"
                value="Answer 1-2"
                checked={question_1_response === 'Answer 1-2'}
                onChange={(e) => setQuestion1Response(e.target.value)}
              />
              Answer 1-2
            </label>
          </div>

          {/* Question 2 */}
          <div>
            <p>Question 2</p>
            <label>
              <input
                type="checkbox"
                name="question_2"
                value="Answer 2-1"
                checked={question_2_response.includes('Answer 2-1')}
                onChange={handleCheckboxChange}
              />
              Answer 2-1
            </label>
            <label>
              <input
                type="checkbox"
                name="question_2"
                value="Answer 2-2"
                checked={question_2_response.includes('Answer 2-2')}
                onChange={handleCheckboxChange}
              />
              Answer 2-2
            </label>
            <label>
              <input
                type="checkbox"
                name="question_2"
                value="Answer 2-3"
                checked={question_2_response.includes('Answer 2-3')}
                onChange={handleCheckboxChange}
              />
              Answer 2-3
            </label>
            <label>
              <input
                type="checkbox"
                name="question_2"
                value="Answer 2-4"
                checked={question_2_response.includes('Answer 2-4')}
                onChange={handleCheckboxChange}
              />
              Answer 2-4
            </label>
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
