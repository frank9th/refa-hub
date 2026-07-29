# Runsheet Cue Schema (runsheet.schema.json)

This schema defines the structure of a cue in the live run sheet.

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string", "description": "Unique identifier for the cue. REQUIRED." },
    "eventId": { "type": "string", "description": "ID of the event this cue belongs to. REQUIRED." },
    "time": { "type": "string", "description": "Time the cue executes (e.g. '16:00'). REQUIRED." },
    "duration": { "type": "string", "description": "Duration (e.g. '10m'). REQUIRED." },
    "item": { "type": "string", "description": "Action item name. REQUIRED." },
    "personnel": { "type": "string", "description": "Assigned personnel (e.g. 'MC', 'Tech'). REQUIRED." },
    "audio": { "type": "string", "description": "Audio cue detail. OPTIONAL." },
    "visual": { "type": "string", "description": "Visual cue detail. OPTIONAL." },
    "status": { "type": "string", "enum": ["pending", "active", "done"], "description": "Execution status. REQUIRED." },
    "timestamp": { "type": "number", "description": "Creation timestamp. REQUIRED." }
  }
}
```
