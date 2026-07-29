# Task Tracker Schema (task.schema.json)

This schema defines the structure of a dynamic task used in the global task tracker and phase-specific tracking.

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string", "description": "Unique identifier for the task. REQUIRED." },
    "eventId": { "type": "string", "description": "ID of the event this task belongs to. REQUIRED." },
    "phaseId": { "type": "string", "description": "ID of the phase this task belongs to. REQUIRED." },
    "text": { "type": "string", "description": "Short title or text of the task. REQUIRED." },
    "detail": { "type": "string", "description": "Detailed description or instructions. OPTIONAL." },
    "tag": { "type": "string", "description": "Category tag (e.g. 'ops', 'media', 'finance'). REQUIRED." },
    "status": { 
      "type": "string", 
      "enum": ["pending", "in-progress", "done"], 
      "description": "Current status of the task. REQUIRED." 
    },
    "owner": { "type": "string", "description": "Name or ID of the assigned owner. OPTIONAL." },
    "updatedAt": { "type": "number", "description": "Timestamp of last update. REQUIRED." }
  }
}
```
