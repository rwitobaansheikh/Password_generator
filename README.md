
# 🔐 RapidPassGen

<div align="center">

![Password Security](https://img.shields.io/badge/Security-SSL%2FTLS-green?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue?style=for-the-badge&logo=docker)
![AWS](https://img.shields.io/badge/AWS-Cloud%20Hosted-orange?style=for-the-badge&logo=amazon-aws)
![Nginx](https://img.shields.io/badge/Nginx-Reverse%20Proxy-brightgreen?style=for-the-badge&logo=nginx)

### 🚀 **A secure, high-speed password generator deployed with professional-grade cloud infrastructure**

[**🌐 Live Demo**](https://rapidpassgen.online) | [Report Bug](#) | [Request Feature](#)

</div>

---

## 📝 Project Overview

**RapidPassGen** is a lightweight, responsive web application built with HTML5, CSS3, and JavaScript. While the frontend is simple and functional, **the core achievement of this project lies in its DevOps pipeline**:

✅ **Containerization** for environment parity  
✅ **Cloud Hosting** on AWS infrastructure  
✅ **Security Engineering** with SSL/TLS termination via Nginx  
✅ **Production-ready** deployment workflow

This project demonstrates modern cloud deployment practices, infrastructure management, and security implementation—showcasing skills essential for full-stack and DevOps roles.

---

## 🛠 Tech Stack & Tools

| **Category**          | **Technology**                           |
|-----------------------|------------------------------------------|
| **Frontend**          | HTML5, CSS3, JavaScript                  |
| **Containerization**  | Docker                                   |
| **Cloud Provider**    | AWS (EC2, ECR)                          |
| **Web Server**        | Nginx (Reverse Proxy)                    |
| **DNS / Domain**      | IONOS                                    |
| **Security**          | Let's Encrypt (Certbot)                  |
| **OS / Environment**  | Ubuntu (WSL2), Amazon Linux 2023         |

---

## 🏗 Deployment Architecture

The application follows a **modern deployment pattern** to ensure security and scalability:
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTPS (443)
       ▼
┌─────────────────┐
│  IONOS DNS      │ ──► A-Record points to AWS Elastic IP
└─────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│      AWS EC2 Instance           │
│  ┌───────────────────────────┐  │
│  │   Nginx Reverse Proxy     │  │
│  │  • SSL/TLS Termination    │  │
│  │  • Port 80 → 443 Redirect │  │
│  └───────────┬───────────────┘  │
│              │                   │
│              ▼                   │
│  ┌───────────────────────────┐  │
│  │   Docker Container        │  │
│  │   (RapidPassGen App)      │  │
│  │   Port: 8080              │  │
│  └───────────────────────────┘  │
│              ▲                   │
└──────────────┼───────────────────┘
               │
        ┌──────┴──────┐
        │  AWS ECR    │
        │  (Registry) │
        └─────────────┘

### Traffic Flow:
1. **DNS Resolution**: IONOS resolves `rapidpassgen.online` to AWS Elastic IP
2. **SSL Handshake**: Nginx handles HTTPS encryption via Let's Encrypt certificate
3. **Reverse Proxy**: Nginx forwards traffic to Docker container on internal port
4. **Application**: Docker container serves the password generator

---

## 🚀 Key Implementation Details

### 🐳 Containerization

The app was containerized to ensure it runs identically on my local machine and the AWS cloud.
bash

Building the image
docker build -t rapidpassgen .

Running locally for testing
docker run -p 80:80 rapidpassgen

Tagging for AWS ECR
docker tag rapidpassgen:latest public.ecr.aws/your-registry/rapidpassgen:latest

Pushing to ECR
docker push public.ecr.aws/your-registry/rapidpassgen:latest

**Benefits:**
- ✅ Environment parity (dev = production)
- ✅ Easy rollback and versioning
- ✅ Portable across cloud providers

---

### 🔐 Security & SSL

Instead of serving the app over an insecure connection, I implemented **HTTPS**:

- ✅ Used **Certbot** to provision a **Let's Encrypt** certificate
- ✅ Configured **Nginx** to handle SSL termination and redirect all HTTP traffic to HTTPS
- ✅ Hardened the **AWS Security Group** to only allow traffic on essential ports (80, 443, 22)
nginx

Nginx SSL Configuration (snippet)
server {
    listen 443 ssl;
    server_name rapidpassgen.online;

ssl_certificate /etc/letsencrypt/live/rapidpassgen.online/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/rapidpassgen.online/privkey.pem;

location / {
    proxy_pass http://localhost:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
}

HTTP to HTTPS redirect
server {
    listen 80;
    server_name rapidpassgen.online;
    return 301 https://$server_name$request_uri;
}

---

### 🌐 Domain Management

Managed DNS settings within **IONOS**, pointing the domain to the AWS infrastructure:

- ✅ Configured **A-records** to point to AWS Elastic IP
- ✅ Verified domain ownership for SSL certificate issuance
- ✅ Ensured proper propagation and DNS resolution

---

## 🧠 Challenges Overcome

| **Challenge**                  | **Solution**                                                                 |
|--------------------------------|------------------------------------------------------------------------------|
| **Port Conflicts**             | Resolved issues where Nginx and Docker competed for Port 80 by implementing a **Reverse Proxy** pattern. |
| **AWS IAM Permissions**        | Configured granular IAM policies to allow the CLI to communicate securely with **ECR Public registries**. |
| **WSL2 to Cloud Workflow**     | Bridged the gap between local Windows/WSL development and remote Linux server management using Docker and SSH. |
| **SSL Certificate Renewal**    | Set up automated renewal with Certbot cron jobs to prevent certificate expiration. |

---

## 📂 Project Structure
rapidpassgen/
│
├── index.html          # Main application page
├── style.css           # Styling
├── script.js           # Password generation logic
├── Dockerfile          # Docker container configuration
├── nginx.conf          # Nginx reverse proxy config
└── README.md           # This file

---

## 🚦 Getting Started

### Prerequisites

- Docker installed
- AWS CLI configured (for ECR)
- Domain name (optional for local testing)

### Local Development
bash

Clone the repository
git clone https://github.com/yourusername/rapidpassgen.git
cd rapidpassgen

Build Docker image
docker build -t rapidpassgen .

Run locally
docker run -p 8080:80 rapidpassgen

Access at http://localhost:8080
### Deployment to AWS
bash

Authenticate with AWS ECR
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws

Tag and push image
docker tag rapidpassgen:latest public.ecr.aws/your-registry/rapidpassgen:latest
docker push public.ecr.aws/your-registry/rapidpassgen:latest

SSH into EC2 and pull the image
ssh -i your-key.pem ec2-user@your-ec2-ip
docker pull public.ecr.aws/your-registry/rapidpassgen:latest
docker run -d -p 8080:80 rapidpassgen:latest

---

## 🎯 Future Enhancements

- [ ] Add password strength meter
- [ ] Implement CI/CD pipeline with GitHub Actions
- [ ] Add database for password history (encrypted)
- [ ] Implement auto-scaling with AWS ECS/Fargate
- [ ] Add monitoring with CloudWatch or Prometheus
- [ ] Multi-language support

---

## 👨‍💻 Author

**Rwitobaan**  
*Full-Stack & Cloud Engineer*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://linkedin.com/in/rwitobaansheikh)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](https://github.com/rwitobaansheikh)
---


## 🙏 Acknowledgments

- **Let's Encrypt** for free SSL certificates
- **AWS** for reliable cloud infrastructure
- **Docker** for containerization technology
- **Nginx** for powerful reverse proxy capabilities
- **Scrimba** for teaching me how to develop a fully working application
---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star!**

Made with ❤️ and ☕ by Rwitobaan

</div>
