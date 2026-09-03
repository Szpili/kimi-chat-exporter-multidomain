# Kimi Chat Exporter — multidomain fork

Firefox extension that exports [Kimi](https://kimi.com) conversations to Markdown and JSON.

> **This is a fork.** The original extension is **Kimi Chat Exporter** by **conreo**
> ([Firefox Add-ons listing](https://addons.mozilla.org/en-US/firefox/addon/kimi-chat-exporter/)),
> released under the MIT License. All credit for the original work goes to conreo.
> The upstream README is preserved as [`README.upstream.md`](README.upstream.md).

## Why this fork exists

The upstream extension is hardcoded to `https://www.kimi.com/*`. Kimi is also reachable
at **`kimi.ai`**, which serves the *same* backend — both hosts answer
`POST /apiv2/kimi.chat.v1.ChatService/ListChats` with `401` when unauthenticated,
confirming the API is identical. On `kimi.ai` the upstream extension never injects its
content script, so it cannot see the session at all.

## What this fork changes

| # | Change | Why |
|---|--------|-----|
| 1 | **Domain-agnostic API host** — resolved at runtime from the active tab (`new URL(tab.url).origin`) instead of a hardcoded constant | works on `kimi.com` *and* `kimi.ai` without further edits |
| 2 | `host_permissions`, `content_scripts.matches`, menu patterns and CSP `connect-src` cover `kimi.com`, `www.kimi.com`, `kimi.ai`, `www.kimi.ai` | upstream also required the `www.` prefix, so bare `kimi.com` failed too |
| 3 | **Token discovery scans `localStorage` *and* `sessionStorage`** by pattern (`access_token`, `auth*token`, `bearer*`…), unwrapping JSON-wrapped values | upstream read only the literal key `access_token` |
| 4 | **Distinct error messages** — "no token found locally" vs "server rejected the token (401/403)" | upstream collapsed both into `Not logged into Kimi`, which made diagnosis impossible |

Extension id changed to `kimi-export-multi@local` so it can be installed alongside the
upstream version without conflicting.

## Install

This fork is **unsigned**, so Firefox will only load it temporarily:

1. `about:debugging#/runtime/this-firefox`
2. **Load Temporary Add-on…**
3. Select `manifest.json` from this repository

Then open `kimi.com` or `kimi.ai`, **reload the page** (the content script only injects on
document load) and click the toolbar icon.

⚠️ Temporary add-ons are removed when Firefox restarts. If the upstream version is also
installed, both icons look identical — hover to check the name, or disable the other one.

## License

MIT — original work Copyright (c) 2026 conreo (see [`LICENSE`](LICENSE), unmodified).
Modifications listed above are released under the same MIT License.
