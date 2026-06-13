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

## Deploy on Render

1. Push this repository to GitHub.
2. In Render, create a new Blueprint from the repository.
3. Render will read `render.yaml` and create the static site.
4. Use the generated `https://soyou-support.onrender.com` URL in App Store Connect.

Before submitting to Apple, confirm the support email in `index.html` is the email you want players to use.
