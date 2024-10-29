export default function parseJson(jsonString?: string | null) {
  try {
    return jsonString ? JSON.parse(jsonString) : null;
  } catch {
    return null;
  }
}
