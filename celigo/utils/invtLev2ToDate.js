//Function created by Chat GPT to convert a 6-digit number into a date format
/**
 * Celigo-safe conversion:
 * INVT-like code -> MM-DD-YYYY
 * Assumes format: YMMDDxxxx... where Y is year offset from 2020.
 * Example: 50603032 -> 06-03-2025
 */
function invtLev2ToMMDDYYYY(value) {
  const s = (value === null || typeof value === "undefined") ? "" : String(value).trim();

  if (s.length < 5) return ""; // or throw / return null if you prefer

  const yearOffset = parseInt(s.charAt(0), 10);
  const mm = parseInt(s.substring(1, 3), 10);
  const dd = parseInt(s.substring(3, 5), 10);

  if (Number.isNaN(yearOffset) || Number.isNaN(mm) || Number.isNaN(dd)) return "";

  const yyyy = 2020 + yearOffset;

  const MM = String(mm).padStart(2, "0");
  const DD = String(dd).padStart(2, "0");

  return `${MM}-${DD}-${yyyy}`;
}

// Example:
// invtLev2ToMMDDYYYY(50603032) -> "06-03-2025"

