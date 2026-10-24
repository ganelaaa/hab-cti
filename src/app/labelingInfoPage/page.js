import { getLabelingFields } from "../../lib/cms";
import LabelingClient from "./LabelingClient";

export default async function LabelingPage() {
  const cms = await getLabelingFields();
  return <LabelingClient cms={cms} />;
}
