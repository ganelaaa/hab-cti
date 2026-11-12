import { getDataRequirementsFields } from "@/lib/cms";
import DataRequirementsClient from "./DataRequirementsClient";

export default async function DataRequirements() {
  const cms = await getDataRequirementsFields();
  return <DataRequirementsClient cms={cms} />;
}
