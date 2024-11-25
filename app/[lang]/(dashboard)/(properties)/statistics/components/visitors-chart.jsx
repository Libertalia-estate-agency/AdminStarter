import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LineChartWithDataLabels from "./line-with-datalabels";


const VisitorsReportChart = () => {
  return (
    <div className="grid xl:grid-cols-2  grid-cols-1 gap-6 ">
      <Card>
        <CardHeader>
          <CardTitle>Market Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChartWithDataLabels />
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorsReportChart;
