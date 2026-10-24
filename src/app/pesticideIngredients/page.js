import { getPesticideIngredientsFields } from "../../lib/cms";
import PesticideIngredientsClient from "./PesticideIngredientsClient";

export default async function PesticideIngredientsPage() {
  const cms = await getPesticideIngredientsFields();
  return <PesticideIngredientsClient cms={cms} />;
}
