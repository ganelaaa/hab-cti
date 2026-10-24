import { getGlpFields } from "../../lib/cms";
import GoodLaboratoryPracticesClient from "./GoodLaboratoryPracticesClient";

export default async function GoodLaboratoryPracticesPage() {
  const cms = await getGlpFields();
  return <GoodLaboratoryPracticesClient cms={cms} />;
}
