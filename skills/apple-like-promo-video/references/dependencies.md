# Dependency setup

## Verify first

1. Locate and read the official Remotion skill entrypoint, commonly named
   `remotion-best-practices`. An official plugin exposing that entrypoint counts;
   its installation path and tool names may differ between agents.
2. Inspect the target project's package manifest, lockfile, scripts, and installed
   packages. Verify Node.js, the package manager, Remotion, and its render runtime
   through the official setup guidance. Existing project versions take precedence
   over an unrequested upgrade.
3. Record each dependency as present, installed and verified, or blocked. A skill
   name in a directory listing alone does not verify its referenced files work.

## Install what is missing

The official skills are maintained at
[remotion-dev/skills](https://github.com/remotion-dev/skills).
The documented installer is:

```sh
npx skills add remotion-dev/skills
```

Select the active agent and appropriate project or personal scope. Include the
entrypoint and its referenced resources; verify they resolve after installation.
If the installer changes, use the current
[official installation instructions](https://www.remotion.dev/docs/ai/skills).

For a new Remotion project, follow the installed official creation skill in a
dedicated video directory. For an existing project, restore or add only the
needed packages using its package manager. Keep related Remotion packages on
compatible versions as directed by the official guidance.

Honor existing authorization for installation. If permissions or networking block
setup, explain the concrete blocker and request only the action needed to resolve
it. Do not treat this skill as a substitute for either mandatory dependency.

## Portable execution

Use the current agent's available filesystem, terminal, browser, and media tools;
the workflow does not depend on a named MCP server, paid provider, or global path.
Choose resource-generation methods from actual available capabilities. If none
can produce the needed material, help prepare a generation brief and resume when
the asset is available rather than promise an unavailable capability.

Claude Code and Codex consume the same skill content. Their discovery and approval
mechanisms differ. Cowork requires a separate installation and runtime test;
shared file format alone is not an end-to-end compatibility result.
