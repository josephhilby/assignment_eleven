const { resourceFromAttributes } = require('@opentelemetry/resources');
const { ATTR_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');

const { NodeSDK } = require('@opentelemetry/sdk-node');

// Instrumentations
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const { ExpressInstrumentation } =
  require("opentelemetry-instrumentation-express");
const { MongoDBInstrumentation } =
  require("@opentelemetry/instrumentation-mongodb");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");

// TRACE Exporter
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const otlpTraceExplorer = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
});

// METRIC Exporter (not used by Jagger but included for completeness)
//  must be aggregated in a reader before export
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const otlpMetricExporter = new OTLPMetricExporter({
  url: 'http://localhost:4318/v1/metrics',
});

const metricReader = new PeriodicExportingMetricReader({
  exporter: otlpMetricExporter,
  concurrencyLimit: 1,
});

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: "todo-service"
  }),
  traceExporter: otlpTraceExplorer,
  metricReader: metricReader,
  instrumentations: [
    getNodeAutoInstrumentations(),
    new ExpressInstrumentation(),
    new MongoDBInstrumentation(),
    new HttpInstrumentation()],
});

sdk.start();