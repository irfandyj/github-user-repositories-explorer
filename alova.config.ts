export default {
  generator: [
    {
      // GitHub REST API OpenAPI v3 spec (kept up-to-date by GitHub)
      input: 'https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.json',

      // Where to put the generated request functions/types
      output: 'src/api/github',

      // OpenAPI/Swagger document
      platform: 'swagger',

      // Default media types
      responseMediaType: 'application/json',
      bodyMediaType: 'application/json',

      // Let the generator infer version/type from the spec
      version: 'auto',
      type: 'auto',
    }
  ],

  // Optional: auto-regenerate when spec changes (if your tooling supports it)
  autoUpdate: true
}