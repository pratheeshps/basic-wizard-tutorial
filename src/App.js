import React, { Children, useState } from "react";
import "./styles.css";

function Wizard({ children }) {
  const [activePage, setActivePage] = useState(0);
  const pages = Children.toArray(children);
  const currentPage = pages[activePage];

  const handlePrevAction = () => {
    setActivePage((index) => index - 1);
  };

  const handleNextAction = () => {
    setActivePage((index) => index + 1);
  };

  return (
    <div className="wizard-container">
      <div className="wizard-content">{currentPage}</div>
      <div className="wizard-actions">
        <button
          type="button"
          className="wizard__buttons-left"
          disabled={activePage <= 0}
          onClick={handlePrevAction}
        >
          Previous
        </button>
        <button
          type="button"
          className="wizard__buttons-right"
          disabled={activePage === pages.length - 1}
          onClick={handleNextAction}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const Page1 = () => <h2>Page 1 </h2>;
const Page2 = () => <h2>Page 2 </h2>;
const Page3 = () => <h2>Page 3 </h2>;

export default function App() {
  return (
    <Wizard>
      <Page1 />
      <Page2 />
      <Page3 />
    </Wizard>
  );
}
