import { getDictionary } from "@/app/dictionaries";
import PropertyStatistics from "./page-view";

const StatisticsPage = async ({ params: { lang } }) => {
  const trans = await getDictionary(lang);
  return <PropertyStatistics trans={trans} />;
};

export default StatisticsPage;
