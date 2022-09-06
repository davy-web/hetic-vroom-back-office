import Vue from "vue";

// import Page from '~/components/ContentType/Page.vue';
// Vue.component('page', Page);

// Base
import UseSvg from "~/components/Base/UseSvg.vue";
import InputText from "~/components/Base/InputText.vue";
import TextArea from "~/components/Base/TextArea.vue";
import MessageItem from "~/components/Base/MessageItem.vue";
import MessageItemDetails from "~/components/Base/MessageItemDetails.vue";

Vue.component("base-use-svg", UseSvg);
Vue.component("base-input-text", InputText);
Vue.component("base-text-area", TextArea);
Vue.component("base-message-item", MessageItem);
Vue.component("base-message-item-details", MessageItemDetails);

// CORE

// import Slider from "~/components/Core/Slider.vue";

// Vue.component("core-slider", Slider);

// COMMON (layout, Header, footer etc..)

import SvgIcons from "~/components/Common/SvgIcons.vue";
import Welcome from "~/components/Common/Welcome.vue";
import Connexion from "~/components//Common/Connexion";
import Inscription from "~/components//Common/Inscription";


Vue.component("c-svg-icons", SvgIcons);
Vue.component("bloc-welcome", Welcome);
Vue.component("connexion", Connexion);
Vue.component("inscription", Inscription);

// STRATES

import StrateText from "~/components/Strates/StrateText.vue";
import Card from "~/components/Strates/Card.vue";
import MessagesInbox from "~/components/Strates/MessagesInbox.vue";

Vue.component("strate-text", StrateText);
Vue.component("bloc-card", Card);
Vue.component("bloc-messages-inbox", MessagesInbox);

// COMPONENTS

// import Card from '~/components/Card';

// Vue.component('Card', Card);
