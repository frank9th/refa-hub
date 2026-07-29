# Finance Transaction Schema (finance.schema.json)

This schema defines the structure of a transaction in the finance ledger.

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string", "description": "Unique identifier for the transaction. REQUIRED." },
    "eventId": { "type": "string", "description": "ID of the event this transaction belongs to. REQUIRED." },
    "date": { "type": "string", "description": "Date string (e.g., 'Jul 15'). REQUIRED." },
    "desc": { "type": "string", "description": "Description of the transaction. REQUIRED." },
    "category": { "type": "string", "description": "Category (e.g., 'Sponsorship', 'Registration', 'Logistics'). REQUIRED." },
    "amount": { "type": "number", "description": "Transaction amount in local currency. REQUIRED." },
    "type": { "type": "string", "enum": ["income", "expense"], "description": "Whether it is income or expense. REQUIRED." },
    "status": { "type": "string", "enum": ["Completed", "Pending"], "description": "Transaction status. REQUIRED." },
    "timestamp": { "type": "number", "description": "Unix timestamp of creation. REQUIRED." }
  }
}
```
