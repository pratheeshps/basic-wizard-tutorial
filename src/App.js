import React, { Children, useContext, useEffect, useState } from "react";
import "./styles.css";

const WizardContext = React.createContext();
const useWizardContext = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error(
      "The compound component cannot be rendered outside parent component"
    );
  }
  return context;
};

const Page1 = () => <h2>Page 1 </h2>;
const Page2 = () => <h2>Page 2 </h2>;
const Page3 = () => <h2>Page 3 </h2>;

const ButtonPrev = ({ children, as: Comp = "button", ...props }) => {
  const { activePageIndex, goToPrev } = useWizardContext(WizardContext);

  return (
    <Comp disabled={activePageIndex <= 0} onClick={goToPrev} {...props}>
      {children}
    </Comp>
  );
};

const ButtonNext = ({ children, as: Comp = "button", ...props }) => {
  const { activePageIndex, goToNext, steps } = useWizardContext(WizardContext);

  return (
    <Comp
      {...props}
      disabled={activePageIndex === steps - 1}
      onClick={goToNext}
    >
      {children}
    </Comp>
  );
};

function Pages({ children }) {
  const { activePageIndex, setSteps } = useWizardContext(WizardContext);
  const pages = Children.toArray(children);
  const steps = Children.count(children);
  useEffect(() => {
    console.log(steps);
    setSteps(steps);
  }, [steps, setSteps]);
  const currentPage = pages[activePageIndex];
  return <div className="wizard-content">{currentPage}</div>;
}

function Wizard({ children }) {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [steps, setSteps] = useState(0);

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
    steps,
    setSteps
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
    <>
      <Wizard>
        <Wizard.Pages>
          <Page1 />
          <Page2 />
          <Page3 />
        </Wizard.Pages>
        <div className="wizard-actions">
          <Wizard.ButtonPrev type="button" className="wizard__buttons-left">
            Previous
          </Wizard.ButtonPrev>
          <Wizard.ButtonNext type="button" className="wizard__buttons-left">
            Next
          </Wizard.ButtonNext>
        </div>
      </Wizard>
    </>
  );
}
