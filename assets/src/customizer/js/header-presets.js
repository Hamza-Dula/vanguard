let api = wp.customize,
  sectionConstructor = api.sectionConstructor,
  outerSection = sectionConstructor["colibri_floating_section"],
  headers = colibri_Customizer_Data.headers || {},
  $ = jQuery;

function setHeader(header) {
  let headerData = headers[header]["data"];

  for (let setting_id in headerData) {
    if (!headerData.hasOwnProperty(setting_id)) {
      continue;
    }

    let setting = wp.customize(setting_id);

    if (setting) {
      let initialTransport = setting.transport;
      setting.transport = "refresh";

      let settingValue = headerData[setting_id];
      if (_.isObject(settingValue) || _.isArray(settingValue)) {
        settingValue = encodeURIComponent(JSON.stringify(settingValue));
      }

      updateMediaControl(setting_id, settingValue);

      setting.set(settingValue);
      setting.transport = initialTransport;
    }
  }

  setTimeout(() => {
    top.wp.customize.requestChangesetUpdate({}, { autosave: true }).done(() => {
      api.previewer.refresh();
    });
  }, 100);
}

function updateMediaControl(settingId, settingValue) {
  let control = wp.customize(settingId)?.findControls()?.[0];
  let mediaTypes = ["image", "video"];
  let controlType = _.get(control || {}, ["params", "mime_type"]);
  if (!control || !mediaTypes.includes(controlType)) {
    return;
  }
  let newAttachment = {
    id: -1,
    url: settingValue,
    type: controlType,
    icon: _.get(control, ["params", "attachment", "icon"]),
    title: settingValue,
  };

  if (controlType === "image") {
    let newSizes = {
      full: {
        url: settingValue,
      },
    };
    newAttachment.sizes = newSizes;
  }

  control.params.attachment = newAttachment;
}

api.bind("ready", function() {
  let section = api.section.add(
    new outerSection("colibri_publish_settings", {
      ready: function() {
        let $ul = $('<ul class="colibri-presets-holder"></ul>');

        $ul.on("click", ".colibri-preset", (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.setHeader($(event.target).attr("data-name"));
        });

        this.container.append($ul);

        for (let key in headers) {
          if (!headers.hasOwnProperty(key)) {
            continue;
          }

          let img_url = headers[key].image;

          let li =
            "" +
            `<li class="colibri-preset" data-name="${key}">` +
            `  <img src='${img_url}'/>` +
            `</li>`;

          if (headers[key].is_reset) {
            $ul.prepend(li);
          } else {
            $ul.append(li);
          }
        }

        this.setHeader = setHeader.bind(this);
      },
    })
  );

  api.bind("colibri_panel_button_clicked", function(name) {
    if (name === "colibriwp_headers_panel") {
      section.toggle();
    } else {
      section.hide();
    }
  });
});








