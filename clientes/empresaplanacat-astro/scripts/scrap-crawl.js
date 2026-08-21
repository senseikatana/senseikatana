const url = 'https://api.firecrawl.dev/v2/scrape';
const options = {
  method: 'POST',
  headers: {
    Authorization: 'Bearer fc-fe96df25355642caab29203c087afaef',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "url": "https://empresaplana.cat/",
    "onlyMainContent": true,
    "maxAge": 172800000,
    "parsers": [
        "pdf"
    ],
    "formats": [
        "summary",
        {
            "type": "json",
            "schema": {
                "type": "object",
                "required": [],
                "properties": {
                    "company_name": {
                        "type": "string"
                      },
                    "company_description": {
                        "type": "string"
                    }
                }
            }
        },
        "branding",
        "screenshot",
        "html",
        "images"
    ]
})
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}