import { getBiopesticideFields } from "../../lib/cms";
import BiopesticideClient from "./BiopesticideClient";

export default async function BiopesticideRegistrationPage() {
  const cms = await getBiopesticideFields();
  return <BiopesticideClient cms={cms} />;
}
