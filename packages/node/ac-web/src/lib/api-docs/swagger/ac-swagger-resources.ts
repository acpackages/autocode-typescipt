export class AcSwaggerResources {
  static files: Record<string, string> = {
    '/index.html': `<!-- HTML for static distribution bundle build -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Swagger UI</title>
    <link rel="stylesheet" type="text/css" href="./swagger-ui.css" />
    <link rel="stylesheet" type="text/css" href="index.css" />
    <link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="./favicon-16x16.png" sizes="16x16" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="./swagger-ui-bundle.js" charset="UTF-8"> </script>
    <script src="./swagger-ui-standalone-preset.js" charset="UTF-8"> </script>
    <script src="./swagger-initializer.js" charset="UTF-8"> </script>
  </body>
</html>`,
    '/swagger-initializer.js': `window.onload = function() {
  window.ui = SwaggerUIBundle({
    url: "swagger.json",
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  });
};`,
    '/index.css': `html { box-sizing: border-box; overflow-y: scroll; } *, *:before, *:after { box-sizing: inherit; } body { margin: 0; background: #fafafa; }`,
    // Note: Massive JS bundles (swagger-ui-bundle.js, etc.) are omitted for brevity in this port.
    // In a real production environment, these should be served as static files or included as assets.
    '/swagger-ui-bundle.js': '/* Omitted */',
    '/swagger-ui-standalone-preset.js': '/* Omitted */',
    '/swagger-ui.css': '/* Omitted */',
    '/favicon-32x32.png': '',
    '/favicon-16x16.png': '',
  };
}
