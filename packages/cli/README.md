# @manovaspace/cli

CLI orchestrator and developer onboarding wizard for the Manova workspace.

## Installation & Zero-Install Usage

### NPX (No Installation Required)

```bash
# Onboard a new developer using an invite token:
npx @manovaspace/cli onboard --token <manova-inv-...>

# Run workspace diagnostics:
npx @manovaspace/cli doctor

# View workspace status:
npx @manovaspace/cli status
```

### Global Installation

```bash
npm install -g @manovaspace/cli
# or
bun add -g @manovaspace/cli

# Now 'manova' command is available globally:
manova onboard --token <manova-inv-...>
```

## Features

- **Automated Onboarding:** Zero-to-productive onboarding with pre-flight checks, SSH key generation, and WireGuard VPN profile setup.
- **Session Checkpointing & Resume:** Recover and continue interrupted sessions seamlessly with `--resume`.
- **Workspace Orchestration:** Multi-repo cloning, synchronization, and schema-driven environment validation.
- **Dev Stack Integration:** Spin up local Docker services with `manova dev up`.

## License

MIT © [Manova Space](https://manova.space)
