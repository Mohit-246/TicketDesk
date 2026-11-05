export const FIELDS = [
  "title",
  "description",
  "category",
  "priority",
  "progress",
  "status",
];

// Only allow known ticket fields into the database.
export function pick(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {};
  }

  return Object.fromEntries(
    FIELDS.filter((key) => Object.hasOwn(body, key)).map((key) => [
      key,
      body[key],
    ])
  );
}
