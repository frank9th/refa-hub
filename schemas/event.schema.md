# Event Configuration Schema (event.schema.json)

This schema defines the structure of an Event Configuration object used in the multi-event architecture.

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string", "description": "Unique identifier for the event (e.g., 'refa-season2'). REQUIRED." },
    "name": { "type": "string", "description": "Display name of the event. REQUIRED." },
    "tagline": { "type": "string", "description": "Tagline or short description. OPTIONAL." },
    "orgName": { "type": "string", "description": "Name of the organizing body. OPTIONAL." },
    "season": { "type": "string", "description": "Season number or identifier. OPTIONAL." },
    "theme": { "type": "string", "description": "Theme ID to apply custom styling. OPTIONAL." },
    
    "dates": {
      "type": "object",
      "description": "Key milestone dates used for dynamic timeline countdowns. Keys can be arbitrary (e.g. 'audition', 'final', 'registrationOpen'). Values must be 'YYYY-MM-DD'. OPTIONAL.",
      "additionalProperties": { "type": "string", "format": "date" }
    },
    
    "details": {
      "type": "object",
      "description": "General quantitative details. OPTIONAL.",
      "properties": {
        "targetContestants": { "type": "number", "description": "OPTIONAL." },
        "votePrice": { "type": "number", "description": "Cost per vote. OPTIONAL." },
        "venue": { "type": "string", "description": "Main venue string. OPTIONAL." }
      }
    },
    
    "prizes": {
      "type": "object",
      "description": "Prize amounts. Keys can be 'first', 'second', 'third'. OPTIONAL.",
      "additionalProperties": { "type": "string" }
    },
    
    "teamsInfo": {
      "type": "object",
      "description": "Information regarding how teams are structured. OPTIONAL.",
      "properties": {
        "title": { "type": "string" },
        "description": { "type": "string" }
      }
    },
    
    "phases": {
      "type": "array",
      "description": "Array of timeline phases. REQUIRED for timeline and task tracking.",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string", "description": "Unique phase ID. REQUIRED." },
          "title": { "type": "string", "description": "Display name for the phase. REQUIRED." },
          "date": { "type": "string", "description": "Date or date range string (e.g., 'August 1 - 7'). REQUIRED." },
          "desc": { "type": "string", "description": "Detailed description of what happens in this phase. OPTIONAL." },
          "tasks": {
            "type": "array",
            "description": "Array of static tasks belonging to this phase. REQUIRED.",
            "items": {
              "type": "object",
              "properties": {
                "id": { "type": "string" },
                "text": { "type": "string" },
                "detail": { "type": "string" },
                "tag": { "type": "string" }
              }
            }
          }
        }
      }
    },
    
    "defaultTeams": {
      "type": "array",
      "description": "Array of team definitions to seed. OPTIONAL.",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "color": { "type": "string" },
          "mentor": { "type": "string" },
          "contestants": { "type": "number" }
        }
      }
    },

    "productionKits": {
      "type": "object",
      "description": "Dictionary of Production Kits specific to the event. Keys are kit IDs (e.g., 'sponsorship'). OPTIONAL.",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "title": { "type": "string", "description": "Title in modal. REQUIRED." },
          "subtitle": { "type": "string", "description": "Subtitle in modal. REQUIRED." },
          "html": { "type": "string", "description": "Raw HTML template to render in the modal. REQUIRED." },
          "cardHtml": { "type": "string", "description": "Raw HTML for the Dashboard card representation. REQUIRED." }
        }
      }
    },

    "letterTemplates": {
      "type": "object",
      "description": "Dictionary of Letter Generator templates specific to the event. Keys are template IDs (e.g., 'sponsorship_schools'). OPTIONAL.",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "salutation": { "type": "string", "description": "Default salutation. REQUIRED." },
          "subject": { "type": "string", "description": "Default subject. REQUIRED." },
          "body": { "type": "string", "description": "Raw HTML body for WYSIWYG editor. REQUIRED." }
        }
      }
    }
  }
}
```
