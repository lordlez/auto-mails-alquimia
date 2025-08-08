import fs from "fs/promises";

const leadsFile = "leads.json";

export async function saveLead(lead) {
  try {
    let leads = [];
    try {
      const data = await fs.readFile(leadsFile, "utf8");
      leads = JSON.parse(data);
    } catch {
      leads = [];
    }

    leads.push(lead);
    await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2), "utf8");
  } catch (error) {
    console.error("Error guardando lead:", error.message);
  }
}
