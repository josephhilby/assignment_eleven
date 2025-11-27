1. Run MongoDB on your local machine.
  - docker run -d -p 27017:27017 mongo
2. Start App and set up tracing
  - node --require tracing.js index.js
3. Hit the API
  - curl http://localhost:3000/todos