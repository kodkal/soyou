(function () {
  const links = window.SOYouInviteLinks;
  const params = new URLSearchParams(window.location.search);
  const invite = links.validateInviteParams(params);

  const roomCode = document.getElementById("room-code");
  const copyButton = document.getElementById("copy-code");
  const openButton = document.getElementById("open-app");
  const status = document.getElementById("invite-status");
  const copy = document.getElementById("invite-copy");
  const installOptions = document.getElementById("install-options");

  const userAgent = navigator.userAgent || "";
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(userAgent);
  const isDesktop = !isIOS && !isAndroid;
  let fallbackTimer = null;

  function showInstallOptions(message) {
    status.textContent = message;
    installOptions.classList.add("is-visible");
  }

  function setDisabledInvite() {
    roomCode.textContent = "Invalid";
    copy.textContent = "This invite link is missing a valid 4 or 5 character room code.";
    openButton.setAttribute("aria-disabled", "true");
    openButton.removeAttribute("href");
    copyButton.disabled = true;
    status.textContent = "Ask the host to send a fresh SO You! invite link.";
    installOptions.classList.add("is-visible");
  }

  function openApp() {
    if (!invite.isValid) {
      return;
    }

    const fallbackUrl = links.buildHttpsInviteUrl(invite);
    const targetUrl = isAndroid
      ? links.buildAndroidIntentUrl(invite, fallbackUrl)
      : links.buildCustomSchemeUrl(invite);

    status.textContent = "Opening SO You!...";
    window.location.href = targetUrl;

    window.clearTimeout(fallbackTimer);
    fallbackTimer = window.setTimeout(function () {
      showInstallOptions("Still here? Open the app again or use one of the store links below.");
    }, 1500);
  }

  async function copyRoomCode() {
    try {
      await navigator.clipboard.writeText(invite.code);
      status.textContent = "Room code copied.";
    } catch (error) {
      status.textContent = `Room code: ${invite.code}`;
    }
  }

  function init() {
    if (!invite.isValid) {
      setDisabledInvite();
      return;
    }

    const customSchemeUrl = links.buildCustomSchemeUrl(invite);
    const androidIntentUrl = links.buildAndroidIntentUrl(invite, links.buildHttpsInviteUrl(invite));

    roomCode.textContent = invite.code;
    openButton.href = isAndroid ? androidIntentUrl : customSchemeUrl;

    if (isDesktop) {
      status.textContent = "Open SO You on your phone, or copy the room code to join manually.";
      installOptions.classList.add("is-visible");
    } else {
      window.setTimeout(openApp, 350);
    }
  }

  openButton.addEventListener("click", function (event) {
    if (!invite.isValid) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    openApp();
  });

  copyButton.addEventListener("click", copyRoomCode);

  window.addEventListener("pagehide", function () {
    window.clearTimeout(fallbackTimer);
  });

  init();
})();
