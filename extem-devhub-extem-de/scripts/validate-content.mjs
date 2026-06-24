import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const dataFiles = {
  projects: path.join(root, "src", "data", "projects.json"),
  updates: path.join(root, "src", "data", "updates.json"),
  socials: path.join(root, "src", "data", "socials.json"),
};

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`${path.relative(root, filePath)} ist kein gueltiges JSON: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertString(value, fieldName) {
  assert(typeof value === "string" && value.trim().length > 0, `${fieldName} fehlt.`);
}

function assertIsoDate(value, fieldName) {
  assertString(value, fieldName);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(value), `${fieldName} muss YYYY-MM-DD nutzen.`);
}

function validateProjects(projects) {
  assert(Array.isArray(projects), "projects.json muss ein Array sein.");
  const ids = new Set();

  for (const project of projects) {
    assertString(project.id, "project.id");
    assert(!ids.has(project.id), `Doppelte project.id: ${project.id}`);
    ids.add(project.id);
    assertString(project.name, `project.name (${project.id})`);
    assertString(project.status, `project.status (${project.id})`);
    assertString(project.category, `project.category (${project.id})`);
    assertString(project.description, `project.description (${project.id})`);
    assert(Array.isArray(project.stack), `project.stack muss ein Array sein (${project.id}).`);
    project.stack.forEach((item) => assertString(item, `project.stack item (${project.id})`));
    assertIsoDate(project.lastUpdate, `project.lastUpdate (${project.id})`);
    assert(Array.isArray(project.links), `project.links muss ein Array sein (${project.id}).`);
  }
}

function validateUpdates(updates) {
  assert(Array.isArray(updates), "updates.json muss ein Array sein.");

  for (const update of updates) {
    assertIsoDate(update.date, "update.date");
    assertString(update.title, "update.title");
    assertString(update.category, "update.category");
    assertString(update.description, "update.description");
  }
}

function validateSocials(socials) {
  assert(Array.isArray(socials), "socials.json muss ein Array sein.");
  const ids = new Set();

  for (const social of socials) {
    assertString(social.id, "social.id");
    assert(!ids.has(social.id), `Doppelte social.id: ${social.id}`);
    ids.add(social.id);
    assertString(social.label, `social.label (${social.id})`);
    assertString(social.description, `social.description (${social.id})`);
    assertString(social.href, `social.href (${social.id})`);
    assertString(social.type, `social.type (${social.id})`);
    assert(
      typeof social.placeholder === "boolean",
      `social.placeholder muss boolean sein (${social.id}).`,
    );
    assert(
      /^(https:\/\/|mailto:)/.test(social.href),
      `social.href muss https:// oder mailto: nutzen (${social.id}).`,
    );
  }
}

try {
  validateProjects(readJson(dataFiles.projects));
  validateUpdates(readJson(dataFiles.updates));
  validateSocials(readJson(dataFiles.socials));
  console.log("Content validation passed.");
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
