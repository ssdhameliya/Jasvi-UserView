# Jasvi Industries - UserView Web Application & Dynamic 3D Showcase

[![Deploy UserView Showcase](https://github.com/ssdhameliya/DSE-UserView/actions/workflows/deploy-userview.yml/badge.svg)](https://github.com/ssdhameliya/DSE-UserView/actions/workflows/deploy-userview.yml)

The **Jasvi Industries UserView Web Application** is the public-facing customer portal and interactive 3D digital engineering showcase for Jasvi Industries.

## Features
- **Interactive 3D Particle Constellation Canvas:** Real-time canvas physics with mouse interaction.
- **Swiper 11 3D Coverflow Carousel:** Multi-axis machinery workstation showcase with interactive spec tables.
- **Dark Industrial Claymorphism & 3D Tilt Physics:** Tactile depth, card tilt, and smooth glass surfaces.
- **100% Dynamic Content Hydration:** Loads real-time data from `/api/public/showcase` with automatic fallback to `data/showcase.json`.
- **Instant RFQ Studio:** Digital Request-for-Quote engineering pipeline directly connected to Jasvi ERP.
- **Direct Link to Centralized Web ERP:** Seamless gateway to `https://erp.jasviindustries.in/`.

## Environments & Live URLs
| Environment | Domain URL | OCI Server | Web Root | Caddy SSL |
| :--- | :--- | :--- | :--- | :--- |
| **UAT (Staging)** | [https://web-uat.jasviindustries.in](https://web-uat.jasviindustries.in) | `144.24.109.1` | `/srv/dse-erp/web/public` | Auto TLS (HTTP/3) |
| **PROD (Production)** | [https://jasviindustries.in](https://jasviindustries.in) | `130.210.35.1` | `/srv/dse-erp/web/public` | Auto TLS (HTTP/3) |
| **PROD (WWW)** | [https://www.jasviindustries.in](https://www.jasviindustries.in) | `130.210.35.1` | `/srv/dse-erp/web/public` | Auto TLS (HTTP/3) |

## Automated CI/CD Deployment Flow
Every push to `main` or release tag triggers GitHub Actions:
1. **UAT Deployment (Stage 1):** Packages and transfers assets to the UAT cloud server, synchronizes permissions, and performs health verification against `https://web-uat.jasviindustries.in`.
2. **Production Deployment (Stage 2):** Runs automatically upon successful UAT verification, deploying to the production server and verifying live endpoints.

Governed strictly under `dse-erp-master-protocol.md`.
