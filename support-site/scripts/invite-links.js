(function () {
  const ROOM_CODE_PATTERN = /^[A-Z0-9]{4,5}$/;

  function normalizeRoomCode(code) {
    return String(code || "").trim().toUpperCase();
  }

  function validateInviteParams(params) {
    const code = normalizeRoomCode(params.get("code"));
    const hasToken = params.has("token");
    const token = hasToken ? params.get("token") : "";

    return {
      code,
      hasToken,
      token,
      isValid: ROOM_CODE_PATTERN.test(code)
    };
  }

  function appendInviteParams(searchParams, invite) {
    searchParams.set("code", invite.code);

    if (invite.hasToken) {
      searchParams.set("token", invite.token || "");
    }

    return searchParams;
  }

  function buildCustomSchemeUrl(invite) {
    const params = appendInviteParams(new URLSearchParams(), invite);
    return `soyou://join?${params.toString()}`;
  }

  function buildHttpsInviteUrl(invite, origin) {
    const baseOrigin = origin || window.location.origin;
    return new URL(buildHttpsInvitePath(invite), baseOrigin).toString();
  }

  function buildHttpsInvitePath(invite) {
    const params = appendInviteParams(new URLSearchParams(), invite);
    return `/join?${params.toString()}`;
  }

  function buildAndroidIntentUrl(invite, fallbackUrl) {
    const params = appendInviteParams(new URLSearchParams(), invite);
    const fallback = encodeURIComponent(fallbackUrl || buildHttpsInviteUrl(invite));
    return `intent://join?${params.toString()}#Intent;scheme=soyou;package=com.kalee.soyou;S.browser_fallback_url=${fallback};end`;
  }

  window.SOYouInviteLinks = {
    buildAndroidIntentUrl,
    buildCustomSchemeUrl,
    buildHttpsInvitePath,
    buildHttpsInviteUrl,
    normalizeRoomCode,
    validateInviteParams
  };
})();
