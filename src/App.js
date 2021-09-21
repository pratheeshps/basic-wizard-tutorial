import React, { Children, useContext, useState } from "react";
import "./styles.css";

const WizardContext = React.createContext();

const Page1 = () => <h2>Page 1 </h2>;
const Page2 = () => <h2>Page 2 </h2>;
const Page3 = () => <h2>Page 3 </h2>;

const ButtonPrev = () => {
  const { activePageIndex, goToPrev } = useContext(WizardContext);

  return (
    <button
      type="button"
      className="wizard__buttons-left"
      disabled={activePageIndex <= 0}
      onClick={goToPrev}
    >
      Previous
    </button>
  );
};

const ButtonNext = () => {
  const { activePageIndex, goToNext, steps } = useContext(WizardContext);

  return (
    <button
      type="button"
      className="wizard__buttons-right"
      disabled={activePageIndex === steps - 1}
      onClick={goToNext}
    >
      Next
    </button>
  );
};

function Pages({ children }) {
  const { activePageIndex } = useContext(WizardContext);
  const pages = Children.toArray(children);
  const currentPage = pages[activePageIndex];
  return <div className="wizard-content">{currentPage}</div>;
}

function Wizard({ children, steps }) {
  const [activePageIndex, setActivePageIndex] = useState(0);

  const goToPrev = () => {
    setActivePageIndex((index) => index - 1);
  };

  const goToNext = () => {
    setActivePageIndex((index) => index + 1);
  };

  const context = {
    activePageIndex,
    goToNext,
    goToPrev,
    steps
  };

  return (
    <WizardContext.Provider value={context}>
      <div className="wizard-container">{children}</div>
    </WizardContext.Provider>
  );
}

Wizard.Pages = Pages;
Wizard.ButtonNext = ButtonNext;
Wizard.ButtonPrev = ButtonPrev;

export default function App() {
  return (
    <Wizard steps={3}>
      <Wizard.Pages>
        <Page1 />
        <Page2 />
        <Page3 />
      </Wizard.Pages>
      <div className="wizard-actions">
        <Wizard.ButtonPrev />
        <Wizard.ButtonNext />
      </div>
    </Wizard>
  );
}
