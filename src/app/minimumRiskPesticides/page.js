import { getMinimumRiskFields } from "../../lib/cms";
import MinimumRiskClient from "./MinimumRiskClient";

export default async function MinimumRiskPesticidesPage() {
  const cms = await getMinimumRiskFields();
  return <MinimumRiskClient cms={cms} />;
}
