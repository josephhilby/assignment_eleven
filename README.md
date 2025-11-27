1. Run MongoDB on your local machine.
  docker run -d -p 27017:27017 mongo

2. Start App and set up tracing
  node --require ./tracing.js index.js

3. Hit the API
  curl http://localhost:3000/todos

4. Start Jagger
  docker run -d --name jaeger \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 5778:5778 \
  -p 9411:9411 \
  jaegertracing/jaeger:2.5.0

5. Check Jaegger UI at http://localhost:16686