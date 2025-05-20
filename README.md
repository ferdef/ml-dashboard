# ML Dashboard

[![Node.js CI](https://github.com/ferdef/ml-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/ferdef/ml-dashboard/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A comprehensive monitoring dashboard for Machine Learning models, built with TypeScript, Node.js, Express, and React.

## Project Overview

ML Dashboard is a web application designed to help data scientists and ML engineers monitor, visualize, and manage the performance of machine learning models in production. The project focuses on providing real-time metrics, execution tracking, and performance visualization for ML models in the dental industry.

## Key Features

- **ML Model Registry**: Track and manage different ML models with versioning
- **Execution Monitoring**: Log and monitor model runs with detailed metadata
- **Performance Metrics**: Collect and visualize key performance indicators
- **Real-time Dashboards**: Interactive visualizations of model performance
- **API-First Design**: RESTful API for integration with existing ML pipelines

## Technology Stack

### Backend
- **TypeScript**: Type-safe JavaScript development
- **Node.js**: JavaScript runtime environment
- **Express**: Web application framework
- **Jest**: Testing framework

### Frontend (Planned)
- **React**: UI library
- **TypeScript**: For type safety
- **Recharts**: Data visualization library

### Infrastructure (Planned)
- **AWS**: Cloud provider for deployment
- **Kubernetes**: Container orchestration
- **Terraform**: Infrastructure as code

## Project Structure

```
ml-dashboard/
├── backend/
│   ├── src/
│   │   ├── models/         # TypeScript interfaces and data models
│   │   ├── controllers/    # API controllers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── app.ts          # Entry point
│   ├── data/               # JSON storage (development only)
│   ├── __fixtures__/       # Test fixtures
│   ├── tsconfig.json       # TypeScript configuration
│   └── package.json        # Dependencies
└── frontend/               # React frontend (coming soon)
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/ml-dashboard.git
cd ml-dashboard
```

2. Install backend dependencies
```bash
cd backend
yarn install
```

3. Start the development server
```bash
yarn dev
```

The server will start on http://localhost:3000.

## API Documentation

### Models API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/models` | GET | Get all models |
| `/api/models/:id` | GET | Get a specific model |
| `/api/models` | POST | Create a new model |
| `/api/models/:id` | PUT | Update a model |
| `/api/models/:id` | DELETE | Delete a model |

### Runs API (Coming Soon)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/runs` | GET | Get all runs |
| `/api/runs/:id` | GET | Get a specific run |
| `/api/runs` | POST | Create a new run |
| `/api/runs/:id` | PUT | Update a run |
| `/api/runs/:id` | DELETE | Delete a run |

### Metrics API (Coming Soon)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/metrics` | GET | Get all metrics |
| `/api/metrics/:id` | GET | Get a specific metric |
| `/api/metrics` | POST | Create a new metric |
| `/api/metrics/:id` | PUT | Update a metric |
| `/api/metrics/:id` | DELETE | Delete a metric |

## Running Tests

```bash
cd backend
yarn test
```

## Development Roadmap

### Phase 1: Backend Foundation (Current)
- ✅ Basic project setup
- ✅ Model registry API
- 🔄 Runs and metrics APIs
- 🔄 Unit and integration tests

### Phase 2: Frontend and AWS Integration (Upcoming)
- React dashboard with TypeScript
- User authentication
- AWS S3/DynamoDB storage

### Phase 3: ML Features and Visualization (Planned)
- ML library integration
- Advanced metrics visualization
- Real-time monitoring

### Phase 4: Kubernetes and Scalability (Planned)
- Containerization with Docker
- Kubernetes deployment
- Infrastructure as code with Terraform

### Phase 5: Optimization and Enterprise Features (Future)
- Performance optimizations
- Advanced monitoring and alerting
- User roles and permissions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project is part of a 5-month technical learning plan covering TypeScript, Node.js, AWS, and Kubernetes
- Inspired by MLflow and other open-source ML tracking tools
