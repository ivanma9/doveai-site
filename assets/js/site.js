(function () {
  var GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

  function initGtag(id) {
    if (!id || id === "G-XXXXXXXXXX") {
      return null;
    }

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }

    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", id);

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(script);

    return gtag;
  }

  var gtag = initGtag(GA_MEASUREMENT_ID);

  function track(eventName, params) {
    if (!gtag) {
      return;
    }
    gtag("event", eventName, params || {});
  }

  document.addEventListener("click", function (event) {
    var target = event.target.closest("[data-track]");
    if (!target) {
      return;
    }

    track(target.getAttribute("data-track"), {
      label: target.getAttribute("data-track-label") || target.textContent.trim(),
      page_path: window.location.pathname
    });
  });

  document.querySelectorAll("form[data-track-form]").forEach(function (form) {
    form.addEventListener("submit", function () {
      track("form_submit", {
        form_name: form.getAttribute("data-track-form"),
        page_path: window.location.pathname
      });
    });
  });
})();
