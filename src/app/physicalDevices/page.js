import { getPhysicalDevicesFields } from "../../lib/cms";
import PhysicalDevicesClient from "./PhysicalDevicesClient";

export default async function PhysicalDevicesPage() {
  const cms = await getPhysicalDevicesFields();
  return <PhysicalDevicesClient cms={cms} />;
}