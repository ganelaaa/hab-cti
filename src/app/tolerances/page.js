import { getTolerancesFields } from "../../lib/cms";
import TolerancesClient from "./TolerancesClient";

export default async function TolerancesPage() {
  const cms = await getTolerancesFields();
  return <TolerancesClient cms={cms} />;
}
