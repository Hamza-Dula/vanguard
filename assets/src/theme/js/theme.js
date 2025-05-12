import { ColibriFrontend } from "@kubio/scripts/src/base";
import "@kubio/scripts/src/detect-element-resize";
import "@kubio/scripts/src/jquery-extensions";
import domReady from 'domready';
import "../../common/css-reload";
import CustomizableSlideshow from "./kube/slideshow/customizable-slideshow";
import CustomizableVideoBackground from "./kube/video-background/customizable-video-background";
import "@kubio/block-library/src/navigation/frontend/index.js";
import "@kubio/block-library/src/footer/frontend.js";
import "@kubio/block-library/src/hero/blocks/down-arrow/frontend.js";
import "./menu/index.js";
import "@kubio/scripts/src/masonry.js";
import "@kubio/scripts/src/kubio-smoothscroll.js";

ColibriFrontend.registerPlugin(CustomizableSlideshow);
ColibriFrontend.registerPlugin(CustomizableVideoBackground);

ColibriFrontend.getData = function(id) {
  if (window.kubioFrontendData && window.kubioFrontendData[id]) {
    return window.kubioFrontendData[id];
  }

  return {};
};

ColibriFrontend.domReady = domReady;

window.Colibri = ColibriFrontend;

// require("@/page-components/navigation/scripts/fixto");
// require("@/page-components/navigation/scripts/overlap");

// require("@/common/libraries/mesmerize-smoothscroll");
// require("@/page-components/menu/scripts/dropdown-menu");
// require("@/page-components/menu/scripts/accordion-menu");
// require("@/page-components/menu/scripts/offcanvas");
//
// //
// // // sticky
// //
//("@kubio/scripts/navigation/scripts/navigation");
// require("@/page-components/navigation/scripts/fixto");
// require("@/page-components/navigation/scripts/overlap");
// require("@/page-components/common/scripts/masonry.js");
// require("@/page-components/footer/scripts/footer-paralax.js");
// require("@/page-components/menu/scripts/offcanvas.js");








