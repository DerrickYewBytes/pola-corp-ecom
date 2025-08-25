# Docker Deployment Guide

This guide explains how to deploy the Pola Corp e-commerce application using Docker.

## 🐳 Prerequisites

- **Docker** (v20.10 or higher)
- **Docker Compose** (v2.0 or higher)
- **Git** (to clone the repository)

## 📦 Quick Start

### Production Deployment

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd pola-corp
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api

### Development Deployment

1. **Start development services:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api

## 🏗️ Architecture

The Docker setup includes two main services (using Supabase for database):

### 1. Supabase Database (External)
- **Provider**: Supabase (PostgreSQL)
- **Connection**: External database connection
- **Features**: 
  - Managed PostgreSQL database
  - Automatic backups
  - Real-time subscriptions
  - Built-in authentication

### 2. Backend API (NestJS)
- **Port**: 3001
- **Environment**: Production or Development
- **Features**: 
  - Hot reloading in development
  - Production build optimization
  - Supabase database connection
  - Session management

### 3. Frontend Application (Nuxt 3)
- **Port**: 3000
- **Environment**: Production or Development
- **Features**:
  - Hot reloading in development
  - Static file serving in production
  - API integration with backend

## 🔧 Configuration

### Environment Variables

#### Backend Environment Variables
```env
NODE_ENV=production
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/pola_corp
PORT=3001
FRONTEND_URL=http://localhost:3000
```

#### Frontend Environment Variables
```env
NUXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### Database Configuration
- **Provider**: Supabase
- **Connection**: External PostgreSQL database
- **Configuration**: Set via `DATABASE_URL` environment variable
- **Format**: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

## 🚀 Deployment Commands

### Production Commands

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v

# Restart a specific service
docker-compose restart backend

# Update and rebuild
docker-compose pull
docker-compose up -d --build
```

### Development Commands

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop development environment
docker-compose -f docker-compose.dev.yml down

# Rebuild development containers
docker-compose -f docker-compose.dev.yml up -d --build
```

## 📊 Monitoring

### View Service Status
```bash
# Production
docker-compose ps

# Development
docker-compose -f docker-compose.dev.yml ps
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Development logs
docker-compose -f docker-compose.dev.yml logs -f
```

### Health Checks
```bash
# Check backend health
curl http://localhost:3001/health

# Check frontend
curl http://localhost:3000

# Check database connection
docker-compose exec postgres pg_isready -U postgres
```

## 🔒 Security Considerations

### Production Security
1. **Change default passwords** in production
2. **Use environment-specific secrets**
3. **Enable SSL/TLS** for external access
4. **Configure firewall rules**
5. **Regular security updates**

### Environment Variables for Production
Create a `.env` file for production:
```env
# Supabase Database
DATABASE_URL=postgresql://postgres:[YOUR-SUPABASE-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# Backend
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-domain.com

# Frontend
NUXT_PUBLIC_API_BASE_URL=https://your-domain.com/api
```

**To get your Supabase connection string:**
1. Go to your Supabase project dashboard
2. Navigate to Settings > Database
3. Copy the connection string
4. Replace `[YOUR-PASSWORD]` with your database password

## 🗄️ Data Management

### Database Backups
Since you're using Supabase, database backups are handled automatically by Supabase:

```bash
# Supabase handles automatic backups
# You can also create manual backups through the Supabase dashboard
# Go to Settings > Database > Backups
```

### Supabase Management
```bash
# Access Supabase CLI (if installed)
supabase status

# View database logs through Supabase dashboard
# Go to Settings > Database > Logs
```

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to server
        run: |
          ssh user@server "cd /path/to/app && git pull && docker-compose up -d --build"
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
lsof -i :3000
lsof -i :3001
lsof -i :5432

# Kill the process or change ports in docker-compose.yml
```

#### 2. Database Connection Issues
```bash
# Check Supabase connection
curl -X GET "https://[YOUR-PROJECT-REF].supabase.co/rest/v1/" \
  -H "apikey: [YOUR-ANON-KEY]"

# Test database connection through Supabase dashboard
# Go to Settings > Database > Connection string

# Check backend logs for database connection errors
docker-compose logs backend
```

#### 3. Build Failures
```bash
# Clean build cache
docker-compose build --no-cache

# Remove all containers and images
docker-compose down --rmi all --volumes --remove-orphans
```

#### 4. Memory Issues
```bash
# Check container resource usage
docker stats

# Increase memory limits in docker-compose.yml
```

### Performance Optimization

#### 1. Multi-stage Builds
Consider using multi-stage builds for smaller production images.

#### 2. Resource Limits
Add resource limits to prevent containers from consuming too much memory:
```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
```

#### 3. Caching
Use Docker layer caching for faster builds:
```bash
# Build with cache
docker-compose build --parallel
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [NestJS Docker Guide](https://docs.nestjs.com/deployment)
- [Nuxt 3 Deployment](https://nuxt.com/docs/getting-started/deployment)

## 🤝 Support

For Docker-related issues:
1. Check the troubleshooting section above
2. Review Docker and service logs
3. Ensure all prerequisites are met
4. Contact the development team
