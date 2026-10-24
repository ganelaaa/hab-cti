import { getConventionalFields } from "../../lib/cms";
import ConventionalClient from "./ConventionalClient";

export default async function ConventionalPesticidePage() {
  const cms = await getConventionalFields();

  return <ConventionalClient cms={cms} />;
}
