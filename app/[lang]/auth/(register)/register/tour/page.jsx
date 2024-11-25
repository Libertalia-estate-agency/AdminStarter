import Card from "@/components/ui/card-snippet";


import ClickableStep from "./clickable-step";

import {
  clickableStep,
} from "./source";


const StepsPage = () => {
  return (
    <div className="space-y-5">
      
      <Card title="Clickable Steps" code={clickableStep}>
      

        <div className="max-w-xl">
          <ClickableStep />
        </div>
      </Card>
    
    </div>
  );
};

export default StepsPage;
