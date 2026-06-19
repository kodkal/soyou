# SO You! Support Site

This is a static support page for the App Store Connect Support URL field.

## Local preview

From the repository root:

```sh
python3 -m http.server 4173 --directory support-site
```

Then open:

```text
http://127.0.0.1:4173
```

Test the invite page locally:

```text
http://127.0.0.1:4173/join?code=TEST1&token=abc
```

Test the iOS custom scheme on a device or simulator with SO You installed:

```text
soyou://join?code=TEST1&token=abc
```

## Deploy on Render

1. Push this repository to GitHub.
2. In Render, create a new Blueprint from the repository.
3. Render will read `render.yaml` and create the static site.
4. Use the generated `https://soyou-support.onrender.com` URL in App Store Connect.

Before submitting to Apple, confirm the support email in `index.html` is the email you want players to use.

## Invite links

Production invite links use this format:

```text
https://soyou-support.onrender.com/join?code=ROOMCODE&token=INVITETOKEN
```

`code` is required and must be a 4 or 5 character uppercase room code. `token` is optional, and the invite page preserves it when opening the app.

The invite page builds app links with:

```text
soyou://join?code=TEST1&token=abc
```

Desktop browsers stay on the invite page and show manual join/install options. iOS and Android browsers attempt to open the app, then keep the user on the invite page if the app does not open after about 1.5 seconds.

## Universal Links and Android App Links

Placeholder association files are included at:

```text
/.well-known/apple-app-site-association
/.well-known/assetlinks.json
```

For Apple Universal Links, replace `TEAM_ID_PLACEHOLDER` in `support-site/.well-known/apple-app-site-association` with the Apple Developer Team ID for the app ID `com.Kalee.SOYou`. The file intentionally has no `.json` extension and Render is configured to serve it as `application/json`. After deployment and Apple app entitlement setup, test:

```text
https://soyou-support.onrender.com/join?code=TEST1&token=abc
```

For Android App Links, replace the package name and SHA-256 certificate fingerprint in `support-site/.well-known/assetlinks.json` once the Android app is ready. The current placeholders are `com.kalee.soyou` and `SHA256_CERT_FINGERPRINT_PLACEHOLDER`.

Exact values still needed:

- Apple Developer Team ID to replace `TEAM_ID_PLACEHOLDER`.
- Final Android package name, if it is not `com.kalee.soyou`.
- Android SHA-256 signing certificate fingerprint.
- Final iOS and Android install or testing URLs to replace the temporary store/testing links on the invite page.
