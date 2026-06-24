import { handleImpressumView } from "../server/api/impressumViewHandler.mjs";

export default async function handler(request, response) {
  await handleImpressumView(request, response);
}
