import { getGettingApprovalFields } from "../../lib/cms";
import GettingApprovalClient from "./GettingApprovalClient";

export default async function GettingApprovalPage() {
  const cms = await getGettingApprovalFields();
  return <GettingApprovalClient cms={cms} />;
}
