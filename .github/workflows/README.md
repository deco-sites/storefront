# CI - Build and Push to ECR

## Overview

The `build-and-push-image.yaml` workflow builds the storefront Docker image and pushes it to Amazon ECR when changes are merged to the `main` branch via PR.

## When the build runs

- **Push to `main`** on relevant files:
  - `Dockerfile`
  - Application code: `actions/`, `apps/`, `components/`, `loaders/`, `routes/`, `sections/`, `sdk/`, `static/`
  - Config: `main.ts`, `dev.ts`, `deno.json`, `fresh.config.ts`, etc.
- **Manual**: via `workflow_dispatch` in the GitHub Actions tab

## Required configuration

### 1. Variables (Settings > Secrets and variables > Actions > Variables)

| Variable | Description | Example |
|----------|-------------|---------|
| `AWS_ACCOUNT_ID` | AWS account ID for ECR | `123456789012` |
| `AWS_REGION` | ECR region | `sa-east-1` |
| — | ECR repository name is taken from `DECO_SITE_NAME` in the Dockerfile (no need to set) | — |

### 2. AWS authentication

**Option A - OIDC (recommended):**

1. Configure OIDC in AWS per [GitHub docs](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
2. Create an IAM role with ECR permissions (`ecr:GetAuthorizationToken`) and push policy
3. Add secret `ECR_ACCESS_ROLE_ARN` = `arn:aws:iam::ACCOUNT_ID:role/ROLE_NAME`

**Option B - Access Keys:**

1. Create an IAM user with ECR access policy
2. In **Settings > Secrets and variables > Actions > Secrets**, add:
   - `ECR_CI_AWS_ACCESS_KEY_ID`
   - `ECR_CI_AWS_SECRET_ACCESS_KEY`
3. The workflow uses Access Keys by default; for OIDC, comment out the Access Keys step and uncomment the OIDC step

### 3. ECR repository

The repository name is taken from `DECO_SITE_NAME` in the Dockerfile. The pipeline checks if the repo exists and **creates it automatically on first run** if not. No need to create it manually.

The IAM role/user must have: `ecr:CreateRepository`, `ecr:DescribeRepositories`, `ecr:SetRepositoryPolicy`, and standard push permissions (`ecr:GetAuthorizationToken`, `ecr:BatchCheckLayerAvailability`, `ecr:PutImage`, etc.).

### 4. Cross-account policy (optional, no account IDs in repo)

To allow **cross-account pull** (and write/Lambda per your policy) **without putting account IDs in the public repo**, use a variable:

1. In **Settings > Secrets and variables > Actions > Variables**, create the variable **`ECR_REPOSITORY_POLICY_JSON`**.
2. Paste as value the full ECR repository policy JSON (including ARNs with account IDs and, if used, the `LambdaECRImageCrossAccountRetrievalPolicy` condition).

The workflow applies this policy **only on the first run**, when the ECR repository is created. On subsequent runs the step is skipped. If the variable is not set, the step is skipped and no custom policy is applied.

## Resulting image

- **Multi-arch**: linux/amd64 and linux/arm64 (manifest list created by buildx)
- **Semantic tag**: `{registry}/storefront:1.0.0` (patch auto-incremented per release: 1.0.0 → 1.0.1 → 1.0.2)
- **Latest tag**: `{registry}/storefront:latest`
- **Build arg** `GIT_REVISION`: full commit SHA (for traceability)

## GitHub Release

On each successful build, a release is created in the repo with:
- Tag in the form `v1.0.0`
- Auto-generated release notes
- Reference to the Docker image published to ECR

The next version number is derived from the latest existing tag (patch increment).

## Monorepo

If the storefront lives in a monorepo (subdirectory), move the workflow to `.github/workflows/` at the repo root and adjust `paths` and Docker `context`/`file` to include the `storefront/` prefix.
