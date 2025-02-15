export const corsOptions = {
  origin: true, // Allow all origins for now
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false, // Change this to false for now
  preflightContinue: false,
  optionsSuccessStatus: 204
};
