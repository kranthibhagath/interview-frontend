const sampleData = {
    "id": 1,
    "name": "Example Item",
    "description": "This is a sample JSON object",
    "isActive": true,
    "price": 19.99,
    "tags": ["sample", "example", "json"],
    "metadata": {
        "created": "2023-07-15T10:30:00Z",
        "lastModified": "2023-07-16T08:15:00Z",
        "version": 1.0
    },
    "notes": null
}

// To convert to JSON string
const jsonString = JSON.stringify(sampleData, null, 2);
console.log(jsonString);

// To parse JSON string back to object
const parsedData = JSON.parse(jsonString);