import { getPesticideRegistrationFields } from "../../lib/cms";
import PesticideRegistrationClient from "./PesticideRegistrationClient";

export default async function PesticideRegistrationPage() {
  const cms = await getPesticideRegistrationFields();
  return <PesticideRegistrationClient cms={cms} />;
}
